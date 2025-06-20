
export interface ServiceConfig {
  id: string;
  name: string;
  description: string;
  platform: 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'facebook' | 'telegram' | 'snapchat';
  type: 'followers' | 'likes' | 'views' | 'comments' | 'shares' | 'members';
  providerPrice: number;
  profitMargin: number;
  finalPrice: number;
  minOrder: number;
  maxOrder: number;
  isActive: boolean;
  quality: 'high' | 'medium' | 'low';
  avgDeliveryTime: string;
  refillGuarantee: boolean;
  providerId: string;
  providerServiceId: string;
  category: string;
  features: string[];
  isExclusive: boolean;
  discountPercent?: number;
}

export interface ServiceOrder {
  id: string;
  serviceId: string;
  userId: string;
  link: string;
  quantity: number;
  originalPrice: number;
  finalPrice: number;
  profit: number;
  status: 'pending' | 'processing' | 'completed' | 'partial' | 'cancelled';
  startCount?: number;
  remains?: number;
  createdAt: Date;
  completedAt?: Date;
  providerOrderId?: string;
}

export interface ServiceFilters {
  platform?: string;
  type?: string;
  isActive?: boolean;
  category?: string;
}

export interface ServiceStats {
  totalOrders: number;
  completedOrders: number;
  totalRevenue: number;
  totalProfit: number;
  conversionRate: number;
  activeServices: number;
  totalServices: number;
}
