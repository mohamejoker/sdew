
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: number;
  platform: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  pricing: {
    original: number;
    current: number;
    currency: string;
  };
  badge: string;
  color: string;
  isPopular?: boolean;
  isNew?: boolean;
}

export interface PricingPlan {
  id: number;
  name: string;
  description: string;
  price: {
    original: number;
    current: number;
    currency: string;
    period: string;
  };
  features: string[];
  badge: string;
  color: string;
  recommended: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
  results: string;
  verified: boolean;
  platform?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  icon: any;
  category?: string;
}

export interface Notification {
  id: number;
  name: string;
  action: string;
  platform: string;
  time: string;
  type: 'purchase' | 'milestone' | 'signup';
}

export interface Analytics {
  totalUsers: number;
  activeUsers: number;
  totalFollowers: number;
  conversionRate: number;
  revenue: number;
  growth: {
    users: number;
    followers: number;
    revenue: number;
  };
}
