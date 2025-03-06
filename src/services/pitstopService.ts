
/**
 * PitstopService - Handles API communication for the pitstop prediction functionality
 */
import { apiConfig } from '@/config/apiConfig';

export interface PitstopPredictionData {
  lapNumber: number;
  raceDistance: number;
  driverPosition:number;
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
  recommendedLap: number;
  confidence: number;
  estimatedTimeGain: string;
  explanation: string;
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
  // static async predictPitstop(data: PitstopPredictionData): Promise<PredictionResult> {
  //   try {
  //     // If configured to use mock data, use the mock service
  //     if (apiConfig.useMockData) {
  //       console.log("Using mock data instead of sending to API");
  //       return await this.mockPrediction(data);
  //     }
  //
  //     // Create a FormData object to send the data (without the image)
  //     const formData = new FormData();
  //     formData.append('lapNumber', data.lapNumber.toString());
  //     formData.append('raceDistance', data.raceDistance.toString());
  //     formData.append('tyreDegradation', data.tyreDegradation.toString());
  //     formData.append('trackTemperature', data.trackTemperature.toString());
  //     formData.append('rainProbability', data.rainProbability.toString());
  //     formData.append('gapToCarAhead', data.gapToCarAhead.toString());
  //     formData.append('gapToCarBehind', data.gapToCarBehind.toString());
  //     // No longer sending tyreImage
  //
  //     // Log the data being sent for debugging
  //     console.log("Sending data to endpoint:", {
  //       url: this.TEST_URL,
  //       formData: Object.fromEntries(formData.entries())
  //     });
  //
  //     // Create an AbortController for timeout handling
  //     const controller = new AbortController();
  //     const timeoutId = setTimeout(() => controller.abort(), apiConfig.timeout);
  //
  //     // Make the API call to the test endpoint
  //     const response = await fetch(this.TEST_URL, {
  //       method: 'POST',
  //       body: formData,
  //       signal: controller.signal,
  //       // No Content-Type header as it's automatically set for FormData
  //     });
  //
  //     // Clear the timeout
  //     clearTimeout(timeoutId);
  //
  //     console.log("Response status:", response.status);
  //
  //     if (!response.ok) {
  //       console.error("API error:", response.status, response.statusText);
  //       throw new Error(`API error: ${response.status} ${response.statusText}`);
  //     }
  //
  //     const result = await response.json();
  //     console.log("Received response:", result);
  //
  //     // If the response doesn't match our expected format, convert it
  //     if (!result.recommendedLap) {
  //       // In case the test endpoint returns a different format, convert it
  //       return {
  //         recommendedLap: data.lapNumber + 2, // Example conversion
  //         confidence: 85,
  //         estimatedTimeGain: "2.5 seconds",
  //         explanation: "Response received successfully: " + JSON.stringify(result)
  //       };
  //     }
  //
  //     return result as PredictionResult;
  //   } catch (error) {
  //     if (error instanceof DOMException && error.name === 'AbortError') {
  //       console.error("Request timed out");
  //       throw new Error('API request timed out. Please try again later.');
  //     }
  //     console.error('Error in PitstopService:', error);
  //     throw error;
  //   }
  // }

  static async predictPitstop(data: PitstopPredictionData): Promise<PredictionResult> {
    try {

      // const requestBody = {
      //   lapNumber: data.lapNumber,
      //   raceDistance: data.raceDistance,
      //   tyreDegradation: data.tyreDegradation,
      //   trackTemperature: data.trackTemperature,
      //   rainProbability: data.rainProbability,
      //   gapToCarAhead: data.gapToCarAhead,
      //   gapToCarBehind: data.gapToCarBehind,
      //   driverPosition:data.driverPosition,
      //   lapsOnCurrentTires:data.lapsOnCurrentTires,
      //   tireCompound:data.tireCompound,
      // };

      //console.log("Sending JSON data to backend:", requestBody);

      console.log(`am sending to the ur\`${this.API_URL}\``)
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set header to JSON
        },
        body: JSON.stringify(data),
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


  /**
   * For development and testing only
   * @param data The prediction data
   * @returns A mock prediction result
   */
  static mockPrediction(data: PitstopPredictionData): Promise<PredictionResult> {
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        // Use tire degradation to influence the recommendation
        const urgencyFactor = data.tyreDegradation > 50 ? 
          Math.floor(Math.random() * 2) + 1 : // More urgent if degradation is high
          Math.floor(Math.random() * 5) + 1;  // Less urgent if degradation is low
        
        // More confident prediction if rain probability is low
        const confidenceBase = data.rainProbability < 30 ? 85 : 75;
        
        const mockResult: PredictionResult = {
          recommendedLap: data.lapNumber + urgencyFactor,
          confidence: Math.round(confidenceBase + Math.random() * 15),
          estimatedTimeGain: (Math.random() * 3 + 0.5).toFixed(1) + ' seconds',
          explanation: `Based on current tyre wear pattern (${data.tyreDegradation}% degradation) and race conditions, ${
            data.tyreDegradation > 50 ? 'an urgent pitstop' : 'a pitstop in the next few laps'
          } is recommended to maximize performance and prevent significant time loss.${
            data.rainProbability > 30 ? ' Weather conditions add uncertainty to this prediction.' : ''
          }`
        };
        
        resolve(mockResult);
      }, 2000);
    });
  }
}
