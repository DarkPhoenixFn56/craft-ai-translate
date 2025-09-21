import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Globe, Tag, ExternalLink, BookOpen } from 'lucide-react';
import { LanguageToggle, type Language } from '@/components/LanguageToggle';
import { AnalyticsPanel } from '@/components/AnalyticsPanel';

interface ProductResult {
  tags: string[];
  description_en: string;
  description_hi: string;
  description_es: string;
  cultural_fact: string;
  image: string;
  artisan_id: string;
}

interface ProductCardProps {
  result: ProductResult;
}

export const ProductCard: React.FC<ProductCardProps> = ({ result }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  
  const languageContent = {
    en: { description: result.description_en, label: 'English' },
    hi: { description: result.description_hi, label: 'Hindi' },
    es: { description: result.description_es, label: 'Spanish' },
  };

  const availableLanguages: Language[] = ['en', 'hi', 'es'];
  const currentContent = languageContent[selectedLanguage];

  const handleViewArtisanPage = () => {
    const artisanUrl = `/artisan/${result.artisan_id}`;
    window.open(artisanUrl, '_blank');
  };

  return (
    <Card className="overflow-hidden bg-gradient-card border-sage-green/20 shadow-card">
      <div className="relative">
        <img
          src={result.image}
          alt="Product"
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white/90 text-warm-brown">
            AI Generated
          </Badge>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Header with Artisan Page Link */}
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-sage-green/10 text-sage-green">
            AI Generated Product
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewArtisanPage}
            className="gap-2 border-clay-orange/30 hover:bg-clay-orange/5"
          >
            <ExternalLink className="h-3 w-3" />
            View Artisan Page
          </Button>
        </div>

        {/* Tags Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-clay-orange" />
            <h3 className="font-semibold text-warm-brown">Auto-detected Tags</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="border-clay-orange/30 text-clay-orange hover:bg-clay-orange/10"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="bg-clay-orange/20" />

        {/* Language Toggle */}
        <LanguageToggle
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          availableLanguages={availableLanguages}
        />

        {/* Current Language Description */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-sage-green" />
            <h3 className="font-semibold text-warm-brown">Product Description</h3>
          </div>
          <div className="p-4 bg-cream rounded-lg border border-clay-orange/10">
            <p className="text-sm text-foreground leading-relaxed">
              {currentContent.description}
            </p>
          </div>
        </div>

        <Separator className="bg-clay-orange/20" />

        {/* Cultural Context */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-terracotta" />
            <h3 className="font-semibold text-warm-brown">Cultural Heritage</h3>
          </div>
          <div className="p-4 bg-gradient-to-r from-terracotta/5 to-sage-green/5 rounded-lg border border-terracotta/10">
            <p className="text-sm text-foreground leading-relaxed italic">
              {result.cultural_fact}
            </p>
          </div>
        </div>

        <Separator className="bg-clay-orange/20" />

        {/* Analytics Panel */}
        <AnalyticsPanel tags={result.tags} />
      </div>
    </Card>
  );
};