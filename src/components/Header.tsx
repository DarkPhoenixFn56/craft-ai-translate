import React from 'react';
import { Palette, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-hero border-b border-clay-orange/20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-warm rounded-lg">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-warm-brown">
                ArtisansGoAI
              </h1>
              <p className="text-sm text-muted-foreground">
                AI-powered product descriptions for artisans
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1 bg-sage-green/10 rounded-full">
            <Sparkles className="h-4 w-4 text-sage-green" />
            <span className="text-sm font-medium text-sage-green">
              Hackathon Demo
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};