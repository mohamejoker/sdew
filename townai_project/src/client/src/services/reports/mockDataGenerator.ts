
import { MockDataConfig } from './types';

export class MockDataGenerator {
  generateSalesData(config: MockDataConfig) {
    const { startDate, endDate } = config;
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const dailyLabels = [];
    const dailySales = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      dailyLabels.push(date.toLocaleDateString('ar-SA'));
      dailySales.push(Math.floor(Math.random() * 5000) + 1000);
    }
    
    return {
      totalSales: dailySales.reduce((sum, val) => sum + val, 0),
      orderCount: Math.floor(Math.random() * 500) + 100,
      avgOrderValue: Math.floor(Math.random() * 200) + 50,
      conversionRate: (Math.random() * 10 + 2).toFixed(1),
      dailyLabels,
      dailySales
    };
  }

  generatePerformanceData() {
    return {
      loadTime: (Math.random() * 2 + 1).toFixed(2),
      bounceRate: (Math.random() * 40 + 20).toFixed(1),
      sessionDuration: Math.floor(Math.random() * 300 + 120),
      uniqueVisitors: Math.floor(Math.random() * 1000) + 500
    };
  }

  generateBehaviorData() {
    const hourlyLabels = Array.from({length: 24}, (_, i) => `${i}:00`);
    const hourlyActivity = hourlyLabels.map(() => Math.floor(Math.random() * 100) + 10);
    
    return {
      activeUsers: Math.floor(Math.random() * 1000) + 200,
      pageViews: Math.floor(Math.random() * 5000) + 1000,
      engagementRate: (Math.random() * 30 + 40).toFixed(1),
      newUsers: Math.floor(Math.random() * 300) + 50,
      hourlyLabels,
      hourlyActivity
    };
  }
}

export const mockDataGenerator = new MockDataGenerator();
