
export interface RealTimeMetrics {
  activeUsers: number;
  revenue: number;
  orders: number;
  systemHealth: number;
  responseTime: number;
  errorRate: number;
}

class RealTimeDataService {
  private listeners: ((data: RealTimeMetrics) => void)[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  private isRunning = false;

  generateMockMetrics(): RealTimeMetrics {
    return {
      activeUsers: Math.floor(Math.random() * 1000) + 500,
      revenue: Math.floor(Math.random() * 50000) + 10000,
      orders: Math.floor(Math.random() * 200) + 50,
      systemHealth: Math.floor(Math.random() * 20) + 80,
      responseTime: Math.floor(Math.random() * 100) + 50,
      errorRate: Math.random() * 2
    };
  }

  subscribeToMetrics(callback: (data: RealTimeMetrics) => void) {
    this.listeners.push(callback);
    
    // إرسال بيانات فورية
    callback(this.generateMockMetrics());
    
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  startRealTimeUpdates() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.intervalId = setInterval(() => {
      const metrics = this.generateMockMetrics();
      this.listeners.forEach(callback => callback(metrics));
    }, 5000); // تحديث كل 5 ثواني
  }

  stopRealTimeUpdates() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
  }
}

export const realTimeDataService = new RealTimeDataService();
