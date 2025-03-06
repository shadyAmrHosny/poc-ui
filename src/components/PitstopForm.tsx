import React, { useState } from 'react';
import { 
  Car, 
  Timer, 
  Thermometer, 
  Droplets, 
  Gauge, 
  Upload, 
  Timer as Stopwatch,
  AlertCircle,
  CheckCircle,
  Loader2,
  Navigation,
  Circle,
  Sparkles,
  Construction
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { PitstopService, PredictionResult } from '@/services/pitstopService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PitstopFormProps {
  className?: string;
}

type TireCompound = 'Soft' | 'Medium' | 'Hard';

// Beta feature badge component
const BetaBadge = () => (
  <div className="inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900/30 px-2 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400 ml-2">
    <Sparkles className="h-3 w-3 mr-1" />
    Beta
  </div>
);

// Coming soon badge component
const ComingSoonBadge = () => (
  <div className="inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400 ml-2">
    <Construction className="h-3 w-3 mr-1" />
    Coming Soon
  </div>
);

const PitstopForm: React.FC<PitstopFormProps> = ({ className }) => {
  // Form state
  const [lapNumber, setLapNumber] = useState<number>(15);
  const [raceDistance, setRaceDistance] = useState<number>(50);
  const [tyreDegradation, setTyreDegradation] = useState<number>(30);
  const [trackTemperature, setTrackTemperature] = useState<number>(45);
  const [rainProbability, setRainProbability] = useState<number>(10);
  const [gapToCarAhead, setGapToCarAhead] = useState<number>(2.5);
  const [gapToCarBehind, setGapToCarBehind] = useState<number>(4.0);
  const [tyreImage, setTyreImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  
  // New state variables for the additional factors
  const [driverPosition, setDriverPosition] = useState<number>(5);
  const [topSpeed, setTopSpeed] = useState<number>(310);
  const [lapsOnCurrentTires, setLapsOnCurrentTires] = useState<number>(8);
 // const [tireCompound, setTireCompound] = useState<TireCompound>('Soft');
  const [tireCompound, setTireCompound] = useState<number>(1);

  const  [lapTime, setLapTime]= useState<number>(60)

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTyreImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag and drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setTyreImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setResult(null);
    
    try {
      // Prepare the data to send to the API - note we're not sending the image or beta features
      const predictionData = {
        lapNumber,
        raceDistance,
        driverPosition,
        // tyreDegradation,
        // trackTemperature,
        // rainProbability, // Beta feature, but still sent to API
        gapToCarAhead,
        gapToCarBehind,
        lapsOnCurrentTires,
        tireCompound,
        lapTime
      };
      
      console.log("Submitting form with data:", predictionData);
      
      // Call the service to predict pitstop
      const predictionResult = await PitstopService.predictPitstop(predictionData);

      setResult(predictionResult);
      
      toast({
        title: "Analysis Complete",
        description: "Request sent successfully to endpoint",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to analyze data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearImage = () => {
    setTyreImage(null);
    setImagePreview(null);
  };

  // Helper function to get tire compound color
  const getTireCompoundColor = (compound: TireCompound) => {
    switch (compound) {
      case 'soft':
        return 'bg-gray-100 dark:bg-gray-300'; //'bg-red-500'
      case 'medium':
        return 'bg-yellow-500';
      case 'hard':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className={cn("w-full max-w-6xl mx-auto", className)}>
      <div className="mb-8 text-center animate-fade-in">
        <div className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-2">
          F1 STRATEGY ASSISTANT
        </div>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-3">Pitstop Predictor 360°</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Advanced AI analysis for optimal pitstop timing based on tyre condition and race factors
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8 animate-slide-up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Race Factors Section */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="mr-2 text-primary h-5 w-5" />
                Race Factors
              </CardTitle>
              <CardDescription>
                Input current race conditions and vehicle status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Current Lap</label>
                  <span className="text-sm bg-secondary px-2 py-0.5 rounded-md">{lapNumber}</span>
                </div>
                <Slider
                  value={[lapNumber]}
                  min={1}
                  max={70}
                  step={1}
                  onValueChange={(value) => setLapNumber(value[0])}
                  className="input-focus-ring"
                />
              </div>
              
              {/*<div className="space-y-3">*/}
              {/*  <div className="flex justify-between items-center">*/}
              {/*    <label className="text-sm font-medium">Race Distance (Laps)</label>*/}
              {/*    <span className="text-sm bg-secondary px-2 py-0.5 rounded-md">{raceDistance}</span>*/}
              {/*  </div>*/}
              {/*  <Slider*/}
              {/*    value={[raceDistance]}*/}
              {/*    min={20}*/}
              {/*    max={90}*/}
              {/*    step={1}*/}
              {/*    onValueChange={(value) => setRaceDistance(value[0])}*/}
              {/*    className="input-focus-ring"*/}
              {/*  />*/}
              {/*</div>*/}
              
              <div className="space-y-3 relative">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium flex items-center">
                    <Navigation className="inline mr-1 h-4 w-4" />
                    Driver Position
                  </label>
                  <span className="text-sm bg-secondary px-2 py-0.5 rounded-md">{driverPosition}</span>
                </div>
                <Slider
                  value={[driverPosition]}
                  min={1}
                  max={20}
                  step={1}
                  onValueChange={(value) => setDriverPosition(value[0])}
                  className="input-focus-ring"
                />
              </div>
              
              <div className="space-y-3 relative">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium flex items-center">
                    <Gauge className="inline mr-1 h-4 w-4" />
                    Top Speed (km/h)
                    {/*<ComingSoonBadge />*/}
                  </label>
                  <span className="text-sm bg-secondary px-2 py-0.5 rounded-md">{topSpeed}</span>
                </div>
                <Slider
                  value={[topSpeed]}
                  min={250}
                  max={350}
                  step={1}
                  onValueChange={(value) => setTopSpeed(value[0])}
                  className="input-focus-ring"
                />
                {/*<div className="text-xs text-amber-500 dark:text-amber-400 mt-1">*/}
                {/*  This feature is under development*/}
                {/*</div>*/}
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">
                    <Thermometer className="inline mr-1 h-4 w-4" />
                    Track Temperature (°C)
                    <BetaBadge />
                  </label>
                  <span className="text-sm bg-secondary px-2 py-0.5 rounded-md">{trackTemperature}</span>
                </div>
                <Slider
                  value={[trackTemperature]}
                  min={15}
                  max={60}
                  step={1} 
                  onValueChange={(value) => setTrackTemperature(value[0])}
                  className="input-focus-ring"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium flex items-center">
                    <Droplets className="inline mr-1 h-4 w-4" />
                    Rain Probability (%)
                    <BetaBadge />
                  </label>
                  <span className="text-sm bg-secondary px-2 py-0.5 rounded-md">{rainProbability}</span>
                </div>
                <Slider
                  value={[rainProbability]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={(value) => setRainProbability(value[0])}
                  className="input-focus-ring"
                />
                <div className="text-xs text-purple-500 dark:text-purple-400 mt-1">
                  These features are included in predictions but still being refined
                </div>
              </div>
              
              <Separator />

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium block">Gap Ahead (sec)</label>
                  <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="120"
                      value={gapToCarAhead}
                      onChange={(e) => setGapToCarAhead(parseFloat(e.target.value))}
                      className="input-focus-ring"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium block">Gap Behind (sec)</label>
                  <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="120"
                      value={gapToCarBehind}
                      onChange={(e) => setGapToCarBehind(parseFloat(e.target.value))}
                      className="input-focus-ring"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium block">Lap Time (sec)</label>
                  <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="120"
                      value={lapTime}
                      onChange={(e) =>setLapTime(parseFloat(e.target.value))}
                      className="input-focus-ring"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tyre Condition Section */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gauge className="mr-2 text-primary h-5 w-5"/>
                Tyre Condition Analysis
              </CardTitle>
              <CardDescription>
                Upload an image of the current tyre condition for AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Estimated Degradation (%)
                    <BetaBadge />
                  </label>
                  <span className="text-sm bg-secondary px-2 py-0.5 rounded-md">{tyreDegradation}</span>
                </div>
                <Slider
                  value={[tyreDegradation]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setTyreDegradation(value[0])}
                  className="input-focus-ring"
                />
                <div className="w-full bg-secondary/50 rounded-full h-2.5">
                  <div 
                    className={cn(
                      "h-2.5 rounded-full transition-all", 
                      tyreDegradation < 30 ? "bg-green-500" : 
                      tyreDegradation < 60 ? "bg-yellow-500" : 
                      "bg-red-500"
                    )}
                    style={{ width: `${tyreDegradation}%` }}
                  ></div>
                </div>
              </div>
              
              {/* New Factor: Number of laps on current tires - With Beta Badge */}
              <div className="space-y-3 relative">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium flex items-center">
                    <Timer className="inline mr-1 h-4 w-4" />
                    Laps on Current Tires
                    {/*<BetaBadge />*/}
                  </label>
                  <span className="text-sm bg-secondary px-2 py-0.5 rounded-md">{lapsOnCurrentTires}</span>
                </div>
                <Slider
                  value={[lapsOnCurrentTires]}
                  min={0}
                  max={40}
                  step={1}
                  onValueChange={(value) => setLapsOnCurrentTires(value[0])}
                  className="input-focus-ring"
                />
                {/*<div className="text-xs text-purple-500 dark:text-purple-400 mt-1">*/}
                {/*  This feature will be used in upcoming versions*/}
                {/*</div>*/}
              </div>
              
              {/* New Factor: Current tire compound - With Coming Soon Badge */}
              <div className="space-y-3 relative">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium flex items-center">
                    <Circle className="inline mr-1 h-4 w-4" />
                    Tire Compound
                    {/*<ComingSoonBadge />*/}
                  </label>
                  <div className="flex items-center">
                    <div className={cn("w-3 h-3 rounded-full mr-2", getTireCompoundColor(tireCompound))}></div>
                    <span className="text-sm bg-secondary px-2 py-0.5 rounded-md capitalize">{tireCompound}</span>
                  </div>
                </div>
                <Select 
                  value={tireCompound} 
                  onValueChange={(value: TireCompound) => setTireCompound(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select tire compound" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soft">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-gray-100 dark:bg-gray-300 mr-2"></div>
                        Soft
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        Medium
                      </div>
                    </SelectItem>
                    <SelectItem value="hard">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        Hard
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {/*<div className="text-xs text-amber-500 dark:text-amber-400 mt-1">*/}
                {/*  This feature is under development*/}
                {/*</div>*/}
              </div>

              <div 
                className={cn(
                  "border-2 border-dashed rounded-lg p-6 transition-all text-center relative",
                  dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
                  imagePreview ? "border-primary/50" : ""
                )}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
              >
                <div className="absolute -top-2 -right-2">
                  <ComingSoonBadge />
                </div>
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Tyre preview" 
                      className="mx-auto max-h-[200px] rounded-md object-contain"
                    />
                    <button 
                      type="button"
                      onClick={clearImage} 
                      className="absolute -top-2 -right-2 bg-destructive text-white p-1 rounded-full hover:bg-destructive/80 transition-colors"
                    >
                      <AlertCircle className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Upload tyre image</p>
                      <p className="text-xs text-muted-foreground">
                        Drag and drop or click to browse
                      </p>
                    </div>
                  </div>
                )}
                <input
                  id="tyre-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-xs text-amber-500 dark:text-amber-400 mt-4">
                  Image analysis coming in future versions
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  <CheckCircle className="inline h-3 w-3 mr-1" /> 
                  Image will be analyzed by AI to assess tread wear pattern and surface condition
                </p>
                <p className="text-xs text-muted-foreground">
                  <CheckCircle className="inline h-3 w-3 mr-1" /> 
                  Combine with race factors for comprehensive pitstop recommendation
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-center">
          <Button 
            type="submit" 
            size="lg" 
            disabled={isLoading}
            className="w-full max-w-md font-semibold text-lg h-12 bg-racing-red hover:bg-racing-red/90 shadow-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing Race Data...
              </>
            ) : (
              <>
                <Stopwatch className="mr-2 h-5 w-5" />
                Calculate Optimal Pitstop
              </>
            )}
          </Button>
        </div>
        
        {/* Results Section (conditionally rendered) */}
        {result && (
          <Card className="card-shadow border-t-4 border-t-primary animate-zoom-in">
            <CardHeader>
              <CardTitle className="text-center">Pitstop Recommendation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Recommended On</p>
                  <p className="text-2xl font-bold">Lap {result.recommendedLap}</p>
                </div>
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Confidence</p>
                  <p className="text-2xl font-bold">{result.confidence}%</p>
                </div>
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Time Gain</p>
                  <p className="text-2xl font-bold">{result.estimatedTimeGain}</p>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-secondary/30">
                <p className="text-sm font-medium mb-2">AI Analysis:</p>
                <p className="text-sm">{result.explanation}</p>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button 
                variant="outline" 
                onClick={() => setResult(null)}
                className="text-sm"
              >
                Adjust Parameters
              </Button>
            </CardFooter>
          </Card>
        )}
      </form>
    </div>
  );
};

export default PitstopForm;
