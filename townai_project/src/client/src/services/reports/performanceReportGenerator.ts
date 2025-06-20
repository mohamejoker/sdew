
import { ReportData } from './types';
import { mockDataGenerator } from './mockDataGenerator';

export class PerformanceReportGenerator {
  async generateReport(): Promise<ReportData> {
    const performanceData = mockDataGenerator.generatePerformanceData();
    
    return {
      title: 'تقرير الأداء',
      period: 'آخر 30 يوم',
      metrics: [
        { name: 'سرعة التحميل', value: parseFloat(performanceData.loadTime), change: -15.3, trend: 'up' },
        { name: 'معدل الارتداد', value: parseFloat(performanceData.bounceRate), change: -8.2, trend: 'up' },
        { name: 'وقت الجلسة', value: performanceData.sessionDuration, change: 22.1, trend: 'up' },
        { name: 'الزوار الفريدون', value: performanceData.uniqueVisitors, change: 18.7, trend: 'up' }
      ],
      charts: [
        {
          type: 'bar',
          data: {
            labels: ['الصفحة الرئيسية', 'الخدمات', 'المدونة', 'الاتصال'],
            datasets: [{
              label: 'عدد الزيارات',
              data: [1200, 850, 650, 400],
              backgroundColor: 'rgba(59, 130, 246, 0.8)'
            }]
          }
        }
      ],
      insights: [
        'تحسن كبير في سرعة تحميل الموقع',
        'زيادة في وقت الجلسة مما يشير إلى تفاعل أفضل',
        'الصفحة الرئيسية تحصل على أعلى عدد زيارات'
      ],
      recommendations: [
        'تحسين محتوى صفحة الاتصال لزيادة الزيارات',
        'إضافة المزيد من المحتوى التفاعلي',
        'تحسين SEO للصفحات الفرعية'
      ]
    };
  }
}

export const performanceReportGenerator = new PerformanceReportGenerator();
