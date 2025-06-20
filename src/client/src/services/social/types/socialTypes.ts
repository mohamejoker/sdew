
/**
 * تعريفات أنواع وسائل التواصل الاجتماعي
 */
export interface SocialAccount {
  platform: 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'facebook';
  username: string;
  url: string;
  isValid: boolean;
  isPublic: boolean;
  isVerified: boolean;
  followers: number;
  following: number;
  posts: number;
  engagement: {
    rate: number;
    avgLikes: number;
    avgComments: number;
    avgViews?: number;
  };
  profile: {
    name: string;
    bio: string;
    avatar: string;
    category: string;
    location?: string;
    website?: string;
  };
  lastUpdate: Date;
  isActive: boolean;
  growthRate: {
    daily: number;
    weekly: number;
    monthly: number;
  };
}

export interface AnalysisResult {
  account: SocialAccount;
  recommendations: string[];
  suggestedServices: {
    type: string;
    platform: string;
    reason: string;
    priority: 'high' | 'medium' | 'low';
  }[];
  competitorAnalysis?: {
    similarAccounts: string[];
    averageFollowers: number;
    marketPosition: 'leader' | 'follower' | 'new';
  };
}

export interface AnalysisFilters {
  includeEngagement?: boolean;
  includeGrowthAnalysis?: boolean;
  includeCompetitorAnalysis?: boolean;
  includeTrends?: boolean;
}
