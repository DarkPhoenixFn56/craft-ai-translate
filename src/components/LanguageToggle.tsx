import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';

export type Language = 'en' | 'hi' | 'es';

interface LanguageToggleProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
  availableLanguages: Language[];
}

const languageLabels: Record<Language, { label: string; flag: string; native: string }> = {
  en: { label: 'English', flag: '🇺🇸', native: 'English' },
  hi: { label: 'Hindi', flag: '🇮🇳', native: 'हिंदी' },
  es: { label: 'Spanish', flag: '🇪🇸', native: 'Español' }
};

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  selectedLanguage,
  onLanguageChange,
  availableLanguages
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-sage-green" />
        <span className="text-sm font-medium text-warm-brown">Select Language</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {availableLanguages.map((lang) => (
          <Button
            key={lang}
            variant={selectedLanguage === lang ? "default" : "outline"}
            size="sm"
            onClick={() => onLanguageChange(lang)}
            className={`gap-2 transition-all duration-200 ${
              selectedLanguage === lang 
                ? 'bg-gradient-warm text-white shadow-warm' 
                : 'border-clay-orange/30 hover:bg-clay-orange/5'
            }`}
          >
            <span className="text-base">{languageLabels[lang].flag}</span>
            <span>{languageLabels[lang].native}</span>
          </Button>
        ))}
      </div>
      
      <Badge 
        variant="secondary" 
        className="text-xs bg-sage-green/10 text-sage-green"
      >
        Viewing in {languageLabels[selectedLanguage].label}
      </Badge>
    </div>
  );
};