
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Target, 
  Lightbulb, 
  TrendingUp, 
  Users, 
  Calendar,
  Star,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import type { AIAgentResponse } from '@/services/aiAgent';

interface AdvancedAIFeaturesProps {
  response: AIAgentResponse;
  onActionClick: (action: string, data?: any) => void;
}

const AdvancedAIFeatures: React.FC<AdvancedAIFeaturesProps> = ({ response, onActionClick }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (response.type === 'analysis' && response.analysis) {
    return (
      <Card className="mt-4 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span>تحليل متقدم</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              نقاط: {response.analysis.score}/100
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="insights">الرؤى</TabsTrigger>
              <TabsTrigger value="recommendations">التوصيات</TabsTrigger>
            </TabsList>
            
            <TabsContent value="insights" className="mt-4">
              <div className="space-y-3">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">التقييم العام</span>
                    <span className="text-sm text-gray-600">{response.analysis.score}%</span>
                  </div>
                  <Progress value={response.analysis.score} className="h-2" />
                </div>
                
                {response.analysis.insights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-2 rtl:space-x-reverse p-3 bg-white rounded-lg">
                    <TrendingUp className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{insight}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recommendations" className="mt-4">
              <div className="space-y-3">
                {response.analysis.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-2 rtl:space-x-reverse p-3 bg-white rounded-lg">
                    <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{rec}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  }

  if (response.type === 'plan' && response.plan) {
    return (
      <Card className="mt-4 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <Target className="h-5 w-5 text-purple-600" />
            <span>{response.plan.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {response.plan.steps.map((step, index) => (
              <div key={index} className="border rounded-lg p-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{step.step}</h4>
                  <Badge 
                    variant={step.priority === 'high' ? 'destructive' : step.priority === 'medium' ? 'default' : 'secondary'}
                  >
                    {step.priority === 'high' ? 'عالية' : step.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{step.description}</p>
                <div className="mt-2 flex items-center space-x-2 rtl:space-x-reverse">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-xs text-green-600">جاهز للتنفيذ</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default AdvancedAIFeatures;
