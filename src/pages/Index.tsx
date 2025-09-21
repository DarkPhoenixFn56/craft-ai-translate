import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { ImageUpload } from '@/components/ImageUpload';
import { ProductCard } from '@/components/ProductCard';
import { simulateAIAnalysis, type AIAnalysisResult } from '@/utils/mockAI';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, RefreshCw, Github, ExternalLink } from 'lucide-react';
import heroImage from '@/assets/hero-banner.jpg';

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AIAnalysisResult | null>(null);

  const handleAnalyze = async (image: File, note: string, audioNote?: Blob) => {
    setIsAnalyzing(true);
    setResult(null);
    
    try {
      const analysisResult = await simulateAIAnalysis(image, note, audioNote);
      setResult(analysisResult);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src={heroImage} 
            alt="Artisan workspace" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-warm rounded-full text-white shadow-warm">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">Powered by Google Cloud AI</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-warm-brown">
              Transform Your
              <span className="bg-gradient-warm bg-clip-text text-transparent"> Artisan Products</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Upload a product image or record a voice note. AI creates compelling descriptions in multiple languages 
              with cultural heritage insights. Perfect for artisans selling globally.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-warm-brown">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-clay-orange rounded-full"></div>
                Vision AI + Voice Input
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-sage-green rounded-full"></div>
                AI Descriptions + Cultural Context
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-terracotta rounded-full"></div>
                Multi-Language + Analytics
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid gap-8">
            {!result ? (
              <ImageUpload onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-warm-brown">Generated Product Information</h2>
                  <Button 
                    variant="craft" 
                    onClick={handleReset}
                    className="gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Analyze Another
                  </Button>
                </div>
                <ProductCard result={result} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* API Info Section */}
      <section className="py-16 bg-cream/50">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8 bg-white/80 backdrop-blur-sm border-clay-orange/20">
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold text-warm-brown">How It Works</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-clay-orange/10 rounded-lg flex items-center justify-center mx-auto">
                    <span className="text-lg font-bold text-clay-orange">1</span>
                  </div>
                  <h4 className="font-semibold text-warm-brown">Vision AI + Voice</h4>
                  <p className="text-sm text-muted-foreground">Upload images or record voice notes for AI analysis</p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-sage-green/10 rounded-lg flex items-center justify-center mx-auto">
                    <span className="text-lg font-bold text-sage-green">2</span>
                  </div>
                  <h4 className="font-semibold text-warm-brown">AI + Culture</h4>
                  <p className="text-sm text-muted-foreground">Generate descriptions with cultural heritage insights</p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-terracotta/10 rounded-lg flex items-center justify-center mx-auto">
                    <span className="text-lg font-bold text-terracotta">3</span>
                  </div>
                  <h4 className="font-semibold text-warm-brown">Multi-Language</h4>
                  <p className="text-sm text-muted-foreground">Translate to Hindi and Spanish with reach analytics</p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto">
                    <span className="text-lg font-bold text-warm-brown">4</span>
                  </div>
                  <h4 className="font-semibold text-warm-brown">Artisan Pages</h4>
                  <p className="text-sm text-muted-foreground">Auto-generate marketplace-ready profile pages</p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-clay-orange/20">
                <p className="text-sm text-muted-foreground mb-4">
                  Upgraded hackathon demo with voice input, cultural context, and artisan marketplace features. 
                  In production, connects to Google Cloud APIs via FastAPI backend.
                </p>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Github className="h-4 w-4" />
                    View Code
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Deploy Guide
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
