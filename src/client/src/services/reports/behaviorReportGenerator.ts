
import { ReportData } from './types';
import { mockDataGenerator } from './mockDataGenerator';

export class BehaviorReportGenerator {
  async generateReport(): Promise<ReportData> {
    const behaviorData = mockDataGenerator.generateBehaviorData();
    
    return {
      title: 'تقرير سلوك المستخدمين',
      period: 'آخر 30 يوم',
      metrics: [
        { name: 'المستخدمون النشطون', value: behaviorData.activeUsers, change: 25.8, trend: 'up' },
        { name: 'الصفحات المشاهدة', value: behaviorData.pageViews, change: 12.3, trend: 'up' },
        { name: 'معدل التفاعل', value: parseFloat(behaviorData.engagementRate), change: 18.9, trend: 'up' },
        { name: 'المستخدمون الجدد', value: behaviorData.newUsers, change: 32.1, trend: 'up' }
      ],
      charts: [
        {
          type: 'line',
          data: {
            labels: behaviorData.hourlyLabels,
            datasets: [{
              label: 'النشاط بالساعة',
              data: behaviorData.hourlyActivity,
              borderColor: 'rgb(16, 185, 129)',
              backgroundColor: 'rgba(16, 185, 129, 0.1)'
            }]
          }
        }
      ],
      insights: [
        'ذروة النشاط تكون في المساء بين 7-10 مساءً',
        'زيادة كبيرة في المستخدمين الجدد',
        'معدل تفاعل ممتاز يفوق المعدل الطبيعي'
      ],
      recommendations: [
        'جدولة المحتوى في أوقات الذروة',
        'تطوير برامج ترحيب للمستخدمين الجدد',
        'إنشاء محتوى تفاعلي إضافي'
      ]
    };
  }
}

export const behaviorReportGenerator = new BehaviorReportGenerator();
