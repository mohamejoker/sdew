
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, TrendingUp, TrendingDown, AlertTriangle, 
  Target, Lightbulb, BarChart3, Activity,
  Download, RefreshCw, Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { intelligentAnalyticsService, Prediction, Insight } from '@/services/analytics/intelligentAnalytics';

const IntelligentAnalytics = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    generateAnalytics();
  }, []);

  const generateAnalytics = () => {
    setIsLoading(true);
    
    // محاكاة بيانات التحليلات
    const mockData = {
      revenue: [45000, 52000, 48000, 61000, 58000, 67000],
      users: [1200, 1350, 1280, 1480, 1420, 1580],
      orders: [340, 390, 365, 425, 410, 470],
      timestamps: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو']
    };

    setTimeout(() => {
      const newPredictions = intelligentAnalyticsService.generatePredictions(mockData);
      const newInsights = intelligentAnalyticsService.generateInsights(mockData);
      const newRecommendations = intelligentAnalyticsService.generateRecommendations(mockData);

      setPredictions(newPredictions);
      setInsights(newInsights);
      setRecommendations(newRecommendations);
      setIsLoading(false);
    }, 1500);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <Target className="h-5 w-5 text-blue-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'achievement': return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'recommendation': return <Lightbulb className="h-5 w-5 text-purple-500" />;
      default: return <Brain className="h-5 w-5 text-gray-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            التحليلات الذكية
          </h2>
          <p className="text-gray-600 mt-1">رؤى مدعومة بالذكاء الاصطناعي لتحسين الأداء</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={generateAnalytics} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            تحديث التحليلات
          </Button>
          <Button className="bg-gradient-to-r from-purple-500 to-blue-600">
            <Download className="h-4 w-4 mr-2" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      <Tabs defaultValue="predictions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="predictions" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            التوقعات
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            الرؤى
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            التوصيات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predictions.map((prediction, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getTrendIcon(prediction.trend)}
                    {prediction.metric}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">القيمة الحالية</span>
                      <span className="font-bold text-lg">
                        {prediction.currentValue.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">التوقع</span>
                      <span className="font-bold text-lg text-blue-600">
                        {prediction.predictedValue.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">دقة التوقع</span>
                      <Badge variant="secondary">
                        {(prediction.confidence * 100).toFixed(0)}%
                      </Badge>
                    </div>
                    
                    <div className="pt-2 border-t">
                      <span className="text-xs text-gray-500">
                        الإطار الزمني: {prediction.timeframe}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-4">
            {insights.map((insight) => (
              <Card key={insight.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{insight.title}</h3>
                        <div className="flex gap-2">
                          <Badge className={getImpactColor(insight.impact)}>
                            تأثير {insight.impact === 'high' ? 'عالي' : insight.impact === 'medium' ? 'متوسط' : 'منخفض'}
                          </Badge>
                          <Badge variant="outline">
                            {insight.type === 'opportunity' ? 'فرصة' :
                             insight.type === 'warning' ? 'تحذير' :
                             insight.type === 'achievement' ? 'إنجاز' : 'توصية'}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{insight.description}</p>
                      
                      {insight.actionable && insight.suggestedAction && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-blue-900 mb-1">إجراء مقترح:</p>
                          <p className="text-sm text-blue-700">{insight.suggestedAction}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                توصيات مخصصة لتحسين الأداء
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800">{recommendation}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      تطبيق
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntelligentAnalytics;
