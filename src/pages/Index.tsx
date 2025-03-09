import React from 'react';
import { Link } from 'react-router-dom';
import PitstopForm from '@/components/PitstopForm';
import { Github, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
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

                  {/* Existing elements */}
                  <div className="flex items-center space-x-2">
                      <Link 
                          to="/"
                          className="p-2 rounded-full hover:bg-secondary/80 transition-colors"
                          aria-label="Home"
                      >
                          <Home size={20}/>
                      </Link>
                      <ThemeToggle/>
                      <a
                          href="https://github.com"
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-full hover:bg-secondary/80 transition-colors"
                          aria-label="GitHub"
                      >
                          <Github size={20}/>
                      </a>
                  </div>
              </div>
          </div>
      </header>

        {/* Main content */}
        <main className="flex-grow py-10 px-6">
            <PitstopForm/>
        </main>

        {/* Footer */}
        <footer className="py-6 px-6 border-t">
            <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} F1 Pitstop Predictor. Advanced AI-powered race strategy assistant.</p>
            </div>
        </footer>

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
    </div>
  );
};

export default Index;
