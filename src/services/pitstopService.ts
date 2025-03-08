
/**
 * PitstopService - Handles API communication for the pitstop prediction functionality
 */
import { apiConfig } from '@/config/apiConfig';

export interface PitstopPredictionData {
  lapNumber: number;
  raceDistance: number;
  driverPosition:number;
  topSpeed: number;
  // tyreDegradation: number;
  // trackTemperature: number;
  // rainProbability: number; // Beta feature - not actually used in API yet
  gapToCarAhead: number;
  gapToCarBehind: number;
  lapsOnCurrentTires: number;
  tireCompound: string;
  lapTime: number;
  // Removed tyreImage as we won't send it in the request anymore
}

export interface PredictionResult {
  //recommendedLap: number;
  confidence: number;
  //estimatedTimeGain: string;
 // explanation: string;
}

export class PitstopService {
  // Use the test URL for sending actual requests
  private static TEST_URL = "http://127.0.0.1:3000/questions/test";
  private static API_URL = `${apiConfig.baseUrl}${apiConfig.endpoints.pitstopPredictor}`;
  
  /**
   * Sends race data to the prediction API (without tyre image)
   * @param data The pitstop prediction data
   * @returns Promise containing the prediction result
   */

  static async predictPitstop(data: PitstopPredictionData): Promise<PredictionResult> {
    try {
      let tireCompoundNumber;
      if (data.tireCompound==="Soft")tireCompoundNumber=0;
      else if (data.tireCompound==="Medium")tireCompoundNumber=1;
      else tireCompoundNumber=2;


      const requestBody = {
        fetures:[[
            data.lapNumber,
            tireCompoundNumber,
            data.driverPosition,
            data.lapsOnCurrentTires,
            data.gapToCarAhead,
            data.gapToCarBehind,
            data.lapTime,
            data.topSpeed,
        ]]
      }

      //console.log("Sending JSON data to backend:", requestBody);

      console.log(`am sending to the ur\`${this.API_URL}\``)
      console.log('the data am sending',requestBody)
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set header to JSON
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Received response:", result);

      return result as PredictionResult;
    } catch (error) {
      console.error('Error in PitstopService:', error);
      throw error;
    }
  }

}
