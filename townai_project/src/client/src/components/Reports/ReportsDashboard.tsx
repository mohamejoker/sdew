
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Download,
  Calendar,
  FileText,
  PieChart
} from 'lucide-react';
import { reportGenerator, ReportData } from '@/services/reports/reportGenerator';

const ReportsDashboard = () => {
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    {
      id: 'sales',
      title: 'تقرير المبيعات',
      description: 'تحليل شامل للمبيعات والإيرادات',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'performance',
      title: 'تقرير الأداء',
      description: 'أداء الموقع وسرعة التحميل',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'behavior',
      title: 'سلوك المستخدمين',
      description: 'تحليل تفاعل وسلوك الزوار',
      icon: Users,
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const generateReport = async (type: string) => {
    setIsGenerating(true);
    try {
      let report: ReportData;
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);

      switch (type) {
        case 'sales':
          report = await reportGenerator.generateSalesReport(startDate, endDate);
          break;
        case 'performance':
          report = await reportGenerator.generatePerformanceReport();
          break;
        case 'behavior':
          report = await reportGenerator.generateUserBehaviorReport();
          break;
        default:
          throw new Error('نوع تقرير غير مدعوم');
      }
      
      setSelectedReport(report);
    } catch (error) {
      console.error('خطأ في توليد التقرير:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const exportReport = (format: 'pdf' | 'excel') => {
    if (!selectedReport) return;
    
    if (format === 'pdf') {
      reportGenerator.exportToPDF(selectedReport);
    } else {
      reportGenerator.exportToExcel(selectedReport);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">التقارير والتحليلات</h2>
        <div className="flex gap-2">
          <Button onClick={() => setSelectedReport(null)} variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            تقرير جديد
          </Button>
        </div>
      </div>

      {!selectedReport ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reportTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <Card key={type.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className={`w-12 h-12 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{type.title}</CardTitle>
                  <p className="text-gray-600">{type.description}</p>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => generateReport(type.id)}
                    disabled={isGenerating}
                    className="w-full"
                  >
                    {isGenerating ? 'جاري التوليد...' : 'إنشاء التقرير'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{selectedReport.title}</CardTitle>
                  <p className="text-gray-600">{selectedReport.period}</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => exportReport('pdf')} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                  <Button onClick={() => exportReport('excel')} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Excel
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedReport.metrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                    </div>
                    <Badge 
                      variant={metric.trend === 'up' ? 'default' : 'destructive'}
                      className={metric.trend === 'up' ? 'bg-green-100 text-green-800' : ''}
                    >
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="insights" className="w-full">
            <TabsList>
              <TabsTrigger value="insights">الرؤى</TabsTrigger>
              <TabsTrigger value="charts">الرسوم البيانية</TabsTrigger>
              <TabsTrigger value="recommendations">التوصيات</TabsTrigger>
            </TabsList>
            
            <TabsContent value="insights">
              <Card>
                <CardHeader>
                  <CardTitle>الرؤى الرئيسية</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {selectedReport.insights.map((insight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="charts">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {selectedReport.charts.map((chart, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="h-5 w-5" />
                        رسم بياني {index + 1}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                        <p className="text-gray-600">الرسم البياني - {chart.type}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recommendations">
              <Card>
                <CardHeader>
                  <CardTitle>التوصيات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedReport.recommendations.map((recommendation, index) => (
                      <div key={index} className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <p className="font-medium text-blue-900">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default ReportsDashboard;
