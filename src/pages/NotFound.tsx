
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Flag, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-racing-red/10 flex items-center justify-center mb-6">
        <Flag className="h-8 w-8 text-racing-red" />
      </div>
      
      <h1 className="text-6xl font-bold mb-2">404</h1>
      <p className="text-xl text-muted-foreground mb-8">Oops! Pit lane not found</p>
      
      <p className="max-w-md text-muted-foreground mb-8">
        The track section you're looking for doesn't exist. Please navigate back to the main grid.
      </p>
      
      <Button asChild className="bg-racing-red hover:bg-racing-red/90">
        <a href="/">
          <Home className="mr-2 h-4 w-4" />
          Return to Home
        </a>
      </Button>
      
      {/* Background elements */}
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[50%] rounded-full bg-racing-red/5 blur-[100px]" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[50%] h-[60%] rounded-full bg-racing-red/3 blur-[150px]" />
      </div>
    </div>
  );
};

export default NotFound;
