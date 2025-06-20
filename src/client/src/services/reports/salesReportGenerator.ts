
import { ReportData } from './types';
import { mockDataGenerator } from './mockDataGenerator';

export class SalesReportGenerator {
  async generateReport(startDate: Date, endDate: Date): Promise<ReportData> {
    const salesData = mockDataGenerator.generateSalesData({ startDate, endDate });
    
    return {
      title: 'تقرير المبيعات',
      period: `من ${startDate.toLocaleDateString('ar-SA')} إلى ${endDate.toLocaleDateString('ar-SA')}`,
      metrics: [
        { name: 'إجمالي المبيعات', value: salesData.totalSales, change: 15.2, trend: 'up' },
        { name: 'عدد الطلبات', value: salesData.orderCount, change: 8.7, trend: 'up' },
        { name: 'متوسط قيمة الطلب', value: salesData.avgOrderValue, change: -2.1, trend: 'down' },
        { name: 'معدل التحويل', value: parseFloat(salesData.conversionRate), change: 12.5, trend: 'up' }
      ],
      charts: [
        {
          type: 'line',
          data: {
            labels: salesData.dailyLabels,
            datasets: [{
              label: 'المبيعات اليومية',
              data: salesData.dailySales,
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)'
            }]
          }
        },
        {
          type: 'doughnut',
          data: {
            labels: ['فودافون كاش', 'انستاباي', 'تحويل بنكي', 'كوبونات'],
            datasets: [{
              data: [40, 30, 20, 10],
              backgroundColor: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b']
            }]
          }
        }
      ],
      insights: [
        'زيادة ملحوظة في المبيعات خلال عطلة نهاية الأسبوع',
        'فودافون كاش هو وسيلة الدفع الأكثر استخداماً',
        'تحسن في معدل التحويل بنسبة 12.5%'
      ],
      recommendations: [
        'التركيز على تحسين متوسط قيمة الطلب',
        'تطوير عروض خاصة لنهايات الأسبوع',
        'توسيع خيارات الدفع الإلكتروني'
      ]
    };
  }
}

export const salesReportGenerator = new SalesReportGenerator();
