
export interface AnalyticsData {
  revenue: number[];
  users: number[];
  orders: number[];
  timestamps: string[];
}

export interface Prediction {
  metric: string;
  currentValue: number;
  predictedValue: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  timeframe: string;
}

export interface Insight {
  id: string;
  type: 'opportunity' | 'warning' | 'achievement' | 'recommendation';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  actionable: boolean;
  suggestedAction?: string;
}

export class IntelligentAnalyticsService {
  generatePredictions(data: AnalyticsData): Prediction[] {
    return [
      {
        metric: 'الإيرادات الشهرية',
        currentValue: data.revenue[data.revenue.length - 1] || 0,
        predictedValue: this.predictNextValue(data.revenue),
        confidence: 0.85,
        trend: this.calculateTrend(data.revenue),
        timeframe: 'الشهر القادم'
      },
      {
        metric: 'عدد المستخدمين',
        currentValue: data.users[data.users.length - 1] || 0,
        predictedValue: this.predictNextValue(data.users),
        confidence: 0.78,
        trend: this.calculateTrend(data.users),
        timeframe: 'الشهر القادم'
      },
      {
        metric: 'عدد الطلبات',
        currentValue: data.orders[data.orders.length - 1] || 0,
        predictedValue: this.predictNextValue(data.orders),
        confidence: 0.82,
        trend: this.calculateTrend(data.orders),
        timeframe: 'الشهر القادم'
      }
    ];
  }

  generateInsights(data: AnalyticsData): Insight[] {
    const insights: Insight[] = [];

    // تحليل نمو الإيرادات
    const revenueGrowth = this.calculateGrowthRate(data.revenue);
    if (revenueGrowth > 0.2) {
      insights.push({
        id: '1',
        type: 'achievement',
        title: 'نمو قوي في الإيرادات',
        description: `نمو الإيرادات بنسبة ${(revenueGrowth * 100).toFixed(1)}% هذا الشهر`,
        impact: 'high',
        actionable: false
      });
    } else if (revenueGrowth < -0.1) {
      insights.push({
        id: '2',
        type: 'warning',
        title: 'انخفاض في الإيرادات',
        description: `انخفضت الإيرادات بنسبة ${Math.abs(revenueGrowth * 100).toFixed(1)}%`,
        impact: 'high',
        actionable: true,
        suggestedAction: 'مراجعة استراتيجية التسويق وتحسين العروض'
      });
    }

    // تحليل معدل تحويل المستخدمين
    const userToOrderRatio = data.orders[data.orders.length - 1] / data.users[data.users.length - 1];
    if (userToOrderRatio < 0.3) {
      insights.push({
        id: '3',
        type: 'opportunity',
        title: 'فرصة لتحسين معدل التحويل',
        description: `معدل التحويل الحالي ${(userToOrderRatio * 100).toFixed(1)}% يمكن تحسينه`,
        impact: 'medium',
        actionable: true,
        suggestedAction: 'تحسين تجربة المستخدم وتبسيط عملية الطلب'
      });
    }

    // تحليل اتجاهات النمو
    const userGrowth = this.calculateTrend(data.users);
    if (userGrowth === 'up') {
      insights.push({
        id: '4',
        type: 'achievement',
        title: 'نمو مستمر في عدد المستخدمين',
        description: 'اتجاه إيجابي في نمو قاعدة المستخدمين',
        impact: 'medium',
        actionable: false
      });
    }

    return insights;
  }

  private predictNextValue(data: number[]): number {
    if (data.length < 2) return data[0] || 0;

    // خوارزمية توقع بسيطة باستخدام المتوسط المتحرك والاتجاه
    const recentData = data.slice(-3);
    const average = recentData.reduce((sum, val) => sum + val, 0) / recentData.length;
    const trend = (data[data.length - 1] - data[data.length - 2]) / data[data.length - 2];
    
    return Math.round(average * (1 + trend * 0.5));
  }

  private calculateTrend(data: number[]): 'up' | 'down' | 'stable' {
    if (data.length < 2) return 'stable';

    const recent = data.slice(-3);
    const trend = recent.reduce((acc, val, index) => {
      if (index === 0) return acc;
      return acc + (val - recent[index - 1]);
    }, 0) / (recent.length - 1);

    if (trend > 0) return 'up';
    if (trend < 0) return 'down';
    return 'stable';
  }

  private calculateGrowthRate(data: number[]): number {
    if (data.length < 2) return 0;
    const current = data[data.length - 1];
    const previous = data[data.length - 2];
    return previous === 0 ? 0 : (current - previous) / previous;
  }

  performAnomalyDetection(data: number[]): { anomalies: number[], threshold: number } {
    const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
    const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length;
    const stdDev = Math.sqrt(variance);
    const threshold = mean + 2 * stdDev;

    const anomalies = data.filter(val => Math.abs(val - mean) > 2 * stdDev);
    
    return { anomalies, threshold };
  }

  generateRecommendations(data: AnalyticsData): string[] {
    const recommendations: string[] = [];

    const revenueGrowth = this.calculateGrowthRate(data.revenue);
    const userGrowth = this.calculateGrowthRate(data.users);

    if (revenueGrowth > userGrowth) {
      recommendations.push('زيادة متوسط قيمة الطلب - ركز على العملاء الحاليين');
    }

    if (userGrowth > revenueGrowth) {
      recommendations.push('تحسين معدل التحويل - حول المستخدمين الجدد إلى عملاء');
    }

    const orderTrend = this.calculateTrend(data.orders);
    if (orderTrend === 'down') {
      recommendations.push('مراجعة استراتيجية التسويق وتحسين العروض');
    }

    return recommendations;
  }
}

export const intelligentAnalyticsService = new IntelligentAnalyticsService();
