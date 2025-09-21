import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Globe, Tag } from 'lucide-react';

interface ProductResult {
  tags: string[];
  description_en: string;
  description_hi?: string;
  description_es?: string;
  image: string;
}

interface ProductCardProps {
  result: ProductResult;
}

export const ProductCard: React.FC<ProductCardProps> = ({ result }) => {
  const languages = [
    { code: 'en', label: 'English', description: result.description_en },
    { code: 'hi', label: 'Hindi', description: result.description_hi },
    { code: 'es', label: 'Spanish', description: result.description_es },
  ];

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

        {/* Descriptions Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-sage-green" />
            <h3 className="font-semibold text-warm-brown">Product Descriptions</h3>
          </div>
          
          <div className="space-y-4">
            {languages.map((lang) => (
              lang.description && (
                <div key={lang.code} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs bg-sage-green/10 text-sage-green">
                      {lang.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed p-3 bg-cream rounded-lg border border-clay-orange/10">
                    {lang.description}
                  </p>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};