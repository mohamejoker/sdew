
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, TrendingUp, Users, Heart, Eye, MessageSquare, Star, AlertTriangle } from 'lucide-react';

interface Competitor {
  id: string;
  name: string;
  handle: string;
  platform: string;
  followers: number;
  engagement: number;
  posts: number;
  growth: number;
  topContent: string[];
  strengths: string[];
  weaknesses: string[];
}

const CompetitorAnalysis = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  
  const competitors: Competitor[] = [
    {
      id: '1',
      name: 'Digital Pro Agency',
      handle: '@digitalpro_agency',
      platform: 'instagram',
      followers: 125000,
      engagement: 4.2,
      posts: 1250,
      growth: 8.5,
      topContent: ['تصاميم إبداعية', 'نصائح تسويقية', 'قصص نجاح'],
      strengths: ['محتوى عالي الجودة', 'تفاعل مستمر', 'استراتيجية واضحة'],
      weaknesses: ['نشر غير منتظم', 'قلة الفيديوهات']
    },
    {
      id: '2',
      name: 'Social Media Masters',
      handle: '@social_masters',
      platform: 'facebook',
      followers: 89000,
      engagement: 3.8,
      posts: 890,
      growth: 6.2,
      topContent: ['مقاطع فيديو تعليمية', 'إنفوجرافيك', 'مسابقات'],
      strengths: ['تنوع المحتوى', 'تفاعل عالي', 'مجتمع نشط'],
      weaknesses: ['تصميم ضعيف', 'قلة المحتوى الأصلي']
    }
  ];

  const insights = [
    {
      title: 'اتجاهات المحتوى',
      description: 'المحتوى التعليمي يحقق أعلى معدلات تفاعل',
      type: 'trend',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'أوقات النشر المثلى',
      description: 'أفضل أوقات النشر من 7-9 مساءً',
      type: 'timing',
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      title: 'فجوات السوق',
      description: 'نقص في محتوى الفيديوهات القصيرة',
      type: 'opportunity',
      icon: AlertTriangle,
      color: 'text-blue-600'
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">تحليل المنافسين</h2>
          <p className="text-gray-600">راقب وحلل أداء منافسيك للحصول على رؤى قيمة</p>
        </div>
        
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="ابحث عن منافس..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            إضافة منافس
          </Button>
        </div>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${insight.color}`}>
                  <insight.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{insight.title}</h3>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Competitors Analysis */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="content">تحليل المحتوى</TabsTrigger>
          <TabsTrigger value="comparison">المقارنة</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {competitors.map((competitor) => (
              <Card key={competitor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{competitor.name}</CardTitle>
                      <p className="text-gray-600">{competitor.handle}</p>
                    </div>
                    <Badge variant={competitor.growth > 5 ? 'default' : 'secondary'}>
                      {competitor.platform}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Users className="h-4 w-4 text-blue-600 mr-1" />
                      </div>
                      <p className="text-xl font-bold text-blue-600">
                        {formatNumber(competitor.followers)}
                      </p>
                      <p className="text-xs text-gray-600">متابع</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Heart className="h-4 w-4 text-green-600 mr-1" />
                      </div>
                      <p className="text-xl font-bold text-green-600">
                        {competitor.engagement}%
                      </p>
                      <p className="text-xs text-gray-600">تفاعل</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">معدل النمو:</span>
                      <span className={`font-medium ${
                        competitor.growth > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {competitor.growth > 0 ? '+' : ''}{competitor.growth}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">عدد المنشورات:</span>
                      <span className="font-medium">{competitor.posts}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">نقاط القوة:</p>
                    <div className="flex flex-wrap gap-1">
                      {competitor.strengths.map((strength, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {competitors.map((competitor) => (
              <Card key={competitor.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{competitor.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">أنواع المحتوى الأكثر نجاحاً:</p>
                    <div className="space-y-2">
                      {competitor.topContent.map((content, index) => (
                        <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">{content}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">نقاط الضعف:</p>
                    <div className="space-y-2">
                      {competitor.weaknesses.map((weakness, index) => (
                        <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">{weakness}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>مقارنة الأداء</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">المنافس</p>
                    <p className="text-sm font-medium text-gray-600">المتابعون</p>
                    <p className="text-sm font-medium text-gray-600">التفاعل</p>
                    <p className="text-sm font-medium text-gray-600">النمو</p>
                  </div>
                  {competitors.map((competitor) => (
                    <div key={competitor.id} className="space-y-2">
                      <p className="font-medium text-gray-900">{competitor.name}</p>
                      <p className="text-lg font-bold text-blue-600">
                        {formatNumber(competitor.followers)}
                      </p>
                      <p className="text-lg font-bold text-green-600">
                        {competitor.engagement}%
                      </p>
                      <p className={`text-lg font-bold ${
                        competitor.growth > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {competitor.growth > 0 ? '+' : ''}{competitor.growth}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompetitorAnalysis;
