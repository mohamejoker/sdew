
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, any[]> = new Map();
  private observers: PerformanceObserver[] = [];

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  initialize() {
    this.setupPerformanceObservers();
    this.trackResourceTiming();
    this.trackUserTimings();
  }

  private setupPerformanceObservers() {
    // مراقبة أداء التصفح
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.recordMetric('navigation', {
            type: entry.entryType,
            name: entry.name,
            duration: entry.duration,
            timestamp: Date.now()
          });
        });
      });
      
      observer.observe({ entryTypes: ['navigation', 'measure', 'mark'] });
      this.observers.push(observer);
    }

    // مراقبة تحميل الموارد
    if ('PerformanceObserver' in window) {
      const resourceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.recordMetric('resources', {
            name: entry.name,
            type: (entry as any).initiatorType,
            duration: entry.duration,
            size: (entry as any).transferSize || 0,
            timestamp: Date.now()
          });
        });
      });
      
      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.push(resourceObserver);
    }
  }

  private trackResourceTiming() {
    // تتبع أوقات تحميل الموارد الحرجة
    const criticalResources = ['script', 'stylesheet', 'image'];
    
    setInterval(() => {
      const entries = performance.getEntriesByType('resource');
      entries.forEach((entry: any) => {
        if (criticalResources.includes(entry.initiatorType)) {
          this.recordMetric('critical-resources', {
            name: entry.name,
            type: entry.initiatorType,
            loadTime: entry.responseEnd - entry.requestStart,
            timestamp: Date.now()
          });
        }
      });
    }, 5000);
  }

  private trackUserTimings() {
    // تتبع توقيتات مخصصة للمستخدم
    const userEvents = ['page-load', 'api-call', 'component-render'];
    
    userEvents.forEach(eventType => {
      this.recordMetric(`user-${eventType}`, {
        type: eventType,
        timestamp: Date.now()
      });
    });
  }

  recordMetric(category: string, data: any) {
    if (!this.metrics.has(category)) {
      this.metrics.set(category, []);
    }
    
    const categoryMetrics = this.metrics.get(category)!;
    categoryMetrics.push(data);
    
    // الاحتفاظ بآخر 100 قياس فقط
    if (categoryMetrics.length > 100) {
      categoryMetrics.shift();
    }
  }

  getMetrics(category?: string) {
    if (category) {
      return this.metrics.get(category) || [];
    }
    return Object.fromEntries(this.metrics);
  }

  getPerformanceReport() {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const resources = performance.getEntriesByType('resource');
    
    return {
      pageLoad: {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: this.getFirstPaint(),
        firstContentfulPaint: this.getFirstContentfulPaint()
      },
      resources: {
        total: resources.length,
        totalSize: resources.reduce((sum: number, resource: any) => sum + (resource.transferSize || 0), 0),
        slowestResource: this.getSlowestResource(resources)
      },
      memory: this.getMemoryInfo(),
      connection: this.getConnectionInfo()
    };
  }

  private getFirstPaint(): number {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
    return firstPaint ? firstPaint.startTime : 0;
  }

  private getFirstContentfulPaint(): number {
    const paintEntries = performance.getEntriesByType('paint');
    const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    return fcp ? fcp.startTime : 0;
  }

  private getSlowestResource(resources: PerformanceEntry[]) {
    return resources.reduce((slowest, current) => 
      current.duration > slowest.duration ? current : slowest
    );
  }

  private getMemoryInfo() {
    const memory = (performance as any).memory;
    if (memory) {
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit
      };
    }
    return null;
  }

  private getConnectionInfo() {
    const connection = (navigator as any).connection;
    if (connection) {
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt
      };
    }
    return null;
  }

  startTiming(label: string) {
    performance.mark(`${label}-start`);
  }

  endTiming(label: string) {
    performance.mark(`${label}-end`);
    performance.measure(label, `${label}-start`, `${label}-end`);
    
    const measure = performance.getEntriesByName(label, 'measure')[0];
    this.recordMetric('custom-timings', {
      label,
      duration: measure.duration,
      timestamp: Date.now()
    });
  }

  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics.clear();
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();
