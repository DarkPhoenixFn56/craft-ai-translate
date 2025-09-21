import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, MapPin, Calendar, Star, Heart, Share } from 'lucide-react';
import { LanguageToggle, type Language } from '@/components/LanguageToggle';
import type { AIAnalysisResult } from '@/utils/mockAI';

const ArtisanPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [isLiked, setIsLiked] = useState(false);
  
  // Mock artisan data (in production, this would come from an API)
  const mockArtisanData: AIAnalysisResult & {
    artisan_name: string;
    location: string;
    joined_date: string;
    rating: number;
    total_products: number;
  } = {
    artisan_id: id || '',
    artisan_name: 'Maria Elena Rodriguez',
    location: 'Oaxaca, Mexico',
    joined_date: '2023',
    rating: 4.8,
    total_products: 23,
    tags: ['handmade', 'ceramic', 'pottery', 'artisan', 'traditional'],
    description_en: "This exquisite handcrafted ceramic piece represents generations of traditional Zapotec pottery techniques. Each curve and glaze pattern tells a story of ancestral knowledge, combining natural clay from the Oaxaca valley with time-honored firing methods that create the distinctive earthy tones and unique character.",
    description_hi: "यह उत्कृष्ट हस्तनिर्मित सिरेमिक टुकड़ा पारंपरिक ज़ैपोटेक मिट्टी के बर्तनों की तकनीकों की पीढ़ियों का प्रतिनिधित्व करता है। प्रत्येक वक्र और चमक पैटर्न पैतृक ज्ञान की कहानी कहता है।",
    description_es: "Esta exquisita pieza de cerámica hecha a mano representa generaciones de técnicas tradicionales de alfarería zapoteca. Cada curva y patrón de esmalte cuenta una historia de conocimiento ancestral, combinando arcilla natural del valle de Oaxaca.",
    cultural_fact: "Zapotec pottery traditions date back over 3,000 years, with distinctive techniques passed down through matriarchal lineages. The clay from Monte Albán contains unique minerals that give these ceramics their characteristic strength and beautiful natural coloration.",
    image: '/placeholder.svg' // In production, would be actual product image
  };

  const languageContent = {
    en: { description: mockArtisanData.description_en, label: 'English' },
    hi: { description: mockArtisanData.description_hi, label: 'Hindi' },
    es: { description: mockArtisanData.description_es, label: 'Spanish' },
  };

  const availableLanguages: Language[] = ['en', 'hi', 'es'];
  const currentContent = languageContent[selectedLanguage];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${mockArtisanData.artisan_name} - Artisan Profile`,
        text: 'Check out this amazing artisan and their beautiful handcrafted work!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="gap-2 text-warm-brown hover:bg-clay-orange/5">
              <ArrowLeft className="h-4 w-4" />
              Back to Main
            </Button>
          </Link>
        </div>

        {/* Artisan Profile Card */}
        <Card className="overflow-hidden bg-gradient-card border-sage-green/20 shadow-card mb-8">
          <div className="relative">
            {/* Hero Image */}
            <div className="h-48 bg-gradient-to-r from-clay-orange/20 to-sage-green/20 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/80 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏺</span>
                </div>
                <h1 className="text-2xl font-bold text-warm-brown">{mockArtisanData.artisan_name}</h1>
                <p className="text-muted-foreground">Traditional Ceramic Artist</p>
              </div>
            </div>
            
            {/* Actions */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setIsLiked(!isLiked)}
                className={`bg-white/90 ${isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={handleShare}
                className="bg-white/90 text-muted-foreground"
              >
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Artisan Info */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-terracotta" />
                <span className="text-sm text-warm-brown">{mockArtisanData.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-sage-green" />
                <span className="text-sm text-warm-brown">Since {mockArtisanData.joined_date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm text-warm-brown">{mockArtisanData.rating} ({mockArtisanData.total_products} products)</span>
              </div>
            </div>

            <Separator className="bg-clay-orange/20" />

            {/* Product Tags */}
            <div className="space-y-3">
              <h3 className="font-semibold text-warm-brown">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {mockArtisanData.tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="border-clay-orange/30 text-clay-orange"
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

            {/* Product Story */}
            <div className="space-y-3">
              <h3 className="font-semibold text-warm-brown">Featured Product Story</h3>
              <div className="p-4 bg-cream rounded-lg border border-clay-orange/10">
                <p className="text-sm text-foreground leading-relaxed">
                  {currentContent.description}
                </p>
              </div>
            </div>

            {/* Cultural Heritage */}
            <div className="space-y-3">
              <h3 className="font-semibold text-warm-brown">Cultural Heritage</h3>
              <div className="p-4 bg-gradient-to-r from-terracotta/5 to-sage-green/5 rounded-lg border border-terracotta/10">
                <p className="text-sm text-foreground leading-relaxed italic">
                  {mockArtisanData.cultural_fact}
                </p>
              </div>
            </div>

            {/* Contact Actions */}
            <div className="pt-4 border-t border-clay-orange/20">
              <div className="flex flex-wrap gap-3 justify-center">
                <Button variant="default" className="bg-gradient-warm text-white">
                  Contact Artisan
                </Button>
                <Button variant="outline" className="border-sage-green/30 text-sage-green hover:bg-sage-green/5">
                  View All Products
                </Button>
                <Button variant="outline" className="border-clay-orange/30 text-clay-orange hover:bg-clay-orange/5">
                  Commission Custom Work
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Footer Note */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            This is a demo artisan page generated by ArtisansGoAI. In production, this would connect to a real artisan marketplace.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArtisanPage;