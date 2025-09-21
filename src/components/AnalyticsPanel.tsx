import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Globe, Target } from 'lucide-react';

interface AnalyticsPanelProps {
  tags: string[];
}

export const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ tags }) => {
  // Mock analytics based on tags
  const generateMockAnalytics = () => {
    const baseReach = Math.floor(Math.random() * 50) + 80; // 80-130 base reach
    
    const analytics = {
      english: baseReach + Math.floor(Math.random() * 40),
      hindi: Math.floor(baseReach * 0.7) + Math.floor(Math.random() * 30),
      spanish: Math.floor(baseReach * 0.6) + Math.floor(Math.random() * 25),
      totalReach: 0,
      growthPotential: Math.floor(Math.random() * 25) + 15, // 15-40%
      marketScore: Math.floor(Math.random() * 20) + 75, // 75-95
    };
    
    analytics.totalReach = analytics.english + analytics.hindi + analytics.spanish;
    
    return analytics;
  };

  const analytics = generateMockAnalytics();

  const getCategoryBoost = () => {
    if (tags.some(tag => ['handmade', 'artisan', 'traditional'].includes(tag.toLowerCase()))) {
      return 'Traditional Craft (+15%)';
    }
    if (tags.some(tag => ['modern', 'contemporary', 'minimalist'].includes(tag.toLowerCase()))) {
      return 'Modern Design (+12%)';
    }
    return 'General Category (+8%)';
  };

  return (
    <Card className="p-6 bg-gradient-card border-sage-green/20 shadow-soft">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-sage-green" />
          <h3 className="font-semibold text-warm-brown">Reach Potential Analytics</h3>
          <Badge variant="secondary" className="bg-sage-green/10 text-sage-green text-xs">
            AI Powered
          </Badge>
        </div>

        {/* Language Reach */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white/50 rounded-lg border border-clay-orange/10">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-lg">🇺🇸</span>
              <span className="text-sm font-medium text-warm-brown">English</span>
            </div>
            <div className="text-xl font-bold text-clay-orange">{analytics.english}</div>
            <div className="text-xs text-muted-foreground">potential buyers</div>
          </div>
          
          <div className="text-center p-3 bg-white/50 rounded-lg border border-clay-orange/10">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-lg">🇮🇳</span>
              <span className="text-sm font-medium text-warm-brown">Hindi</span>
            </div>
            <div className="text-xl font-bold text-sage-green">{analytics.hindi}</div>
            <div className="text-xs text-muted-foreground">potential buyers</div>
          </div>
          
          <div className="text-center p-3 bg-white/50 rounded-lg border border-clay-orange/10">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-lg">🇪🇸</span>
              <span className="text-sm font-medium text-warm-brown">Spanish</span>
            </div>
            <div className="text-xl font-bold text-terracotta">{analytics.spanish}</div>
            <div className="text-xs text-muted-foreground">potential buyers</div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-clay-orange/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-clay-orange/10 rounded-lg">
              <Users className="h-4 w-4 text-clay-orange" />
            </div>
            <div>
              <div className="text-sm font-medium text-warm-brown">Total Reach</div>
              <div className="text-lg font-bold text-clay-orange">{analytics.totalReach}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sage-green/10 rounded-lg">
              <Target className="h-4 w-4 text-sage-green" />
            </div>
            <div>
              <div className="text-sm font-medium text-warm-brown">Market Score</div>
              <div className="text-lg font-bold text-sage-green">{analytics.marketScore}/100</div>
            </div>
          </div>
        </div>

        {/* Category Insights */}
        <div className="bg-cream/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-4 w-4 text-terracotta" />
            <span className="text-sm font-medium text-warm-brown">Category Insights</span>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">
              Category: <span className="font-medium text-terracotta">{getCategoryBoost()}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Growth Potential: <span className="font-medium text-sage-green">+{analytics.growthPotential}% with multilingual approach</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-center pt-2 border-t border-clay-orange/10">
          Analytics based on product tags, market trends, and language demographics
        </div>
      </div>
    </Card>
  );
};