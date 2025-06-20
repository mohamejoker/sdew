
export interface ReportData {
  title: string;
  period: string;
  metrics: {
    name: string;
    value: number;
    change: number;
    trend: 'up' | 'down' | 'stable';
  }[];
  charts: {
    type: 'line' | 'bar' | 'pie' | 'doughnut';
    data: any;
    options?: any;
  }[];
  insights: string[];
  recommendations: string[];
}

export interface MockDataConfig {
  startDate: Date;
  endDate: Date;
  days?: number;
}
