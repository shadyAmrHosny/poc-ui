
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';

const Homepage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll animation - fixing this function
  const scrollToContent = () => {
    const contentSection = document.getElementById('content-section');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback if element doesn't exist
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center">
        {/* Background elements */}
        <div className="fixed inset-0 z-[-1] overflow-hidden">
          <div className={cn(
            "absolute top-[-20%] right-[-10%] w-[40%] h-[50%] rounded-full",
            "bg-racing-red/5 blur-[100px] animate-spin-slow"
          )} />
          <div className={cn(
            "absolute bottom-[-30%] left-[-10%] w-[50%] h-[60%] rounded-full",
            "bg-racing-red/3 blur-[150px] animate-spin-slow"
          )} />
        </div>
        
        {/* Header with logo and theme toggle */}
        <header className="absolute top-0 left-0 right-0 py-4 px-6 bg-background/80 backdrop-blur-sm z-10">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3">
                <img src="/favicon.ico" alt="F1 Logo" className="w-full h-full object-contain"/>
              </div>
              <span className="font-semibold text-lg">Pitstop Predictor</span>
            </div>
            <div className="flex items-center space-x-4">
              {/* Light Mode Icon */}
              <img src="/dv1.svg" alt="Light Mode Icon" className="w-16 h-16 object-contain dark:hidden" />
              {/* Dark Mode Icon */}
              <img src="/dwv1.svg" alt="Dark Mode Icon" className="w-16 h-16 object-contain hidden dark:block" />
              <ThemeToggle />
            </div>
          </div>
        </header>
        
        {/* Main hero content */}
        <div className="text-center px-4 md:px-6 max-w-3xl mx-auto animate-fade-in">
          <div className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4">
            RACE STRATEGY ASSISTANT
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Pitstop <span className="text-racing-red">Predictor</span> 360°
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
            Advanced AI analysis for optimal pitstop timing based on race conditions
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/form">
              <Button 
                size="lg" 
                className="bg-racing-red hover:bg-racing-red/90 text-white font-semibold animate-pulse hover:animate-none"
              >
                Start Prediction
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Improved centered scroll indicator */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center">
          <div 
            onClick={scrollToContent}
            className="flex flex-col items-center bg-background/50 dark:bg-racing-carbon/50 backdrop-blur-sm px-8 py-4 rounded-full cursor-pointer shadow-lg border border-white/10 dark:border-white/5 animate-bounce hover:animate-none transition-all duration-300 hover:bg-racing-red/10 group"
          >
            <span className="text-sm font-medium mb-1 group-hover:text-racing-red transition-colors">Discover More</span>
            <ChevronDown size={24} className="text-racing-red" />
          </div>
        </div>
      </section>

      {/* Improved Content Section */}
      <section id="content-section" className="py-20 px-6 bg-gradient-to-b from-background to-secondary/20 dark:from-background dark:to-racing-carbon/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our <span className="text-racing-red">Features</span></h2>
            <div className="w-20 h-1 bg-racing-red mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge technology to optimize your racing strategy and gain competitive advantage
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card shadow-md rounded-xl p-8 border border-border hover:border-racing-red/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-racing-red/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-xl"></div>
              <h3 className="text-xl font-semibold mb-4 relative z-10">AI Analysis</h3>
              <p className="text-muted-foreground mb-4 relative z-10">Advanced machine learning algorithms analyze race conditions in real-time with precision.</p>
              <div className="w-10 h-10 rounded-full bg-racing-red/10 flex items-center justify-center relative z-10">
                <div className="w-6 h-6 rounded-full bg-racing-red/20"></div>
              </div>
            </div>
            
            <div className="bg-card shadow-md rounded-xl p-8 border border-border hover:border-racing-red/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-racing-red/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-xl"></div>
              <h3 className="text-xl font-semibold mb-4 relative z-10">Strategy Optimization</h3>
              <p className="text-muted-foreground mb-4 relative z-10">Get optimal pitstop timing recommendations based on multiple factors for maximum performance.</p>
              <div className="w-10 h-10 rounded-full bg-racing-red/10 flex items-center justify-center relative z-10">
                <div className="w-6 h-6 rounded-full bg-racing-red/20"></div>
              </div>
            </div>
            
            <div className="bg-card shadow-md rounded-xl p-8 border border-border hover:border-racing-red/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-racing-red/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-xl"></div>
              <h3 className="text-xl font-semibold mb-4 relative z-10">Performance Tracking</h3>
              <p className="text-muted-foreground mb-4 relative z-10">Track your predictions against actual race outcomes to continuously improve your strategy.</p>
              <div className="w-10 h-10 rounded-full bg-racing-red/10 flex items-center justify-center relative z-10">
                <div className="w-6 h-6 rounded-full bg-racing-red/20"></div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/form">
              <Button 
                size="lg" 
                className="bg-racing-red hover:bg-racing-red/90 text-white font-semibold px-10 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Try Predictor Now
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
