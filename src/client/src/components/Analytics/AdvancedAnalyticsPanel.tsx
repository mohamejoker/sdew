
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { advancedAnalytics, type AnalyticsData, type CompetitorData } from '@/services/analytics/advancedAnalytics';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share, 
  Instagram,
  Music,
  Youtube,
  Twitter,
  Facebook,
  Clock,
  Target,
  Zap,
  BarChart3
} from 'lucide-react';

const AdvancedAnalyticsPanel = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [competitors, setCompetitors] = useState<CompetitorData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'facebook'>('instagram');
  const { toast } = useToast();

  const platformIcons = {
    instagram: Instagram,
    tiktok: Music,
    youtube: Youtube,
    twitter: Twitter,
    facebook: Facebook
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setAnalyticsData(advancedAnalytics.getAccountAnalytics(''));
    setCompetitors(advancedAnalytics.getCompetitors());
  };

  const handleAnalyzeAccount = async () => {
    if (!username.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال اسم المستخدم",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      let result = null;
      
      if (selectedPlatform === 'instagram') {
        result = await advancedAnalytics.analyzeInstagramAccount(username);
      } else if (selectedPlatform === 'tiktok') {
        result = await advancedAnalytics.analyzeTikTokAccount(username);
      }

      if (result) {
        toast({
          title: "تم التحليل بنجاح",
          description: `تم تحليل حساب ${username} على ${selectedPlatform}`,
        });
        loadData();
      }
    } catch (error) {
      toast({
        title: "خطأ في التحليل",
        description: "حدث خطأ أثناء تحليل الحساب",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeCompetitor = async () => {
    if (!username.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال اسم المنافس",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await advancedAnalytics.analyzeCompetitor(selectedPlatform, username);
      if (result) {
        toast({
          title: "تم تحليل المنافس",
          description: `تم تحليل حساب ${username} كمنافس`,
        });
        loadData();
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحليل المنافس",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getLatestAnalytics = (platform: string) => {
    return analyticsData
      .filter(data => data.platform === platform)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  };

  const bestTimes = advancedAnalytics.getBestPostingTimes(selectedPlatform);
  const growthPrediction = advancedAnalytics.predictGrowth(selectedPlatform, 30);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          التحليلات المتقدمة
        </h2>
        <p className="text-gray-600 mt-2">تحليل شامل للحسابات والمنافسين مع توقعات ذكية</p>
      </div>

      <Tabs defaultValue="analysis" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analysis">تحليل الحسابات</TabsTrigger>
          <TabsTrigger value="competitors">تحليل المنافسين</TabsTrigger>
          <TabsTrigger value="insights">رؤى ذكية</TabsTrigger>
          <TabsTrigger value="predictions">التوقعات</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <BarChart3 className="h-6 w-6 text-purple-600" />
                <span>تحليل حساب جديد</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="platform">المنصة</Label>
                  <select
                    className="w-full mt-1 p-2 border rounded-md"
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value as any)}
                  >
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="youtube">YouTube</option>
                    <option value="twitter">Twitter</option>
                    <option value="facebook">Facebook</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="username">اسم المستخدم</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="@username"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={handleAnalyzeAccount}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? 'جاري التحليل...' : 'تحليل الحساب'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['instagram', 'tiktok', 'youtube'].map((platform) => {
              const data = getLatestAnalytics(platform);
              const PlatformIcon = platformIcons[platform as keyof typeof platformIcons];
              
              return (
                <Card key={platform} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                      <PlatformIcon className="h-6 w-6 text-blue-600" />
                      <span className="capitalize">{platform}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {data ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{data.followers.toLocaleString()}</div>
                            <div className="text-xs text-blue-700">متابع</div>
                          </div>
                          <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{data.engagement.toFixed(1)}%</div>
                            <div className="text-xs text-green-700">معدل التفاعل</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>الوصول</span>
                            <span>{data.reach.toLocaleString()}</span>
                          </div>
                          <Progress value={(data.reach / data.impressions) * 100} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center justify-between">
                            <Heart className="h-4 w-4 text-red-500" />
                            <span>{data.likes.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <MessageCircle className="h-4 w-4 text-blue-500" />
                            <span>{data.comments.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <Share className="h-4 w-4 text-purple-500" />
                            <span>{data.shares.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <Eye className="h-4 w-4 text-gray-500" />
                            <span>{data.impressions.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>لا توجد بيانات محلّلة بعد</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="competitors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <Users className="h-6 w-6 text-orange-600" />
                <span>إضافة منافس جديد</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>المنصة</Label>
                  <select
                    className="w-full mt-1 p-2 border rounded-md"
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value as any)}
                  >
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="youtube">YouTube</option>
                  </select>
                </div>
                <div>
                  <Label>اسم المنافس</Label>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="@competitor"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={handleAnalyzeCompetitor}
                    disabled={isLoading}
                    className="w-full"
                    variant="outline"
                  >
                    {isLoading ? 'جاري التحليل...' : 'تحليل المنافس'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitors.map((competitor, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <span>@{competitor.username}</span>
                    <Badge variant="outline">{competitor.platform}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                      <div className="text-xl font-bold text-purple-600">{competitor.followers.toLocaleString()}</div>
                      <div className="text-xs text-purple-700">متابع</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                      <div className="text-xl font-bold text-orange-600">{competitor.engagementRate.toFixed(1)}%</div>
                      <div className="text-xs text-orange-700">تفاعل</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>متوسط الإعجابات</span>
                      <span>{competitor.avgLikes.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>متوسط التعليقات</span>
                      <span>{competitor.avgComments.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 text-center">
                    آخر تحليل: {new Date(competitor.lastAnalyzed).toLocaleDateString('ar')}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Clock className="h-6 w-6 text-green-600" />
                  <span>أفضل أوقات النشر</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bestTimes.map((time, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium">{time.day}</span>
                        <span className="text-gray-600">{time.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-bold text-green-600">{time.engagementScore}</span>
                        <Target className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Zap className="h-6 w-6 text-yellow-600" />
                  <span>توصيات ذكية</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-r-4 border-blue-500">
                    <h4 className="font-semibold text-blue-900 mb-2">تحسين التوقيت</h4>
                    <p className="text-blue-800 text-sm">انشر المحتوى في الساعة 8-9 مساءً لأفضل تفاعل</p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border-r-4 border-green-500">
                    <h4 className="font-semibold text-green-900 mb-2">زيادة التفاعل</h4>
                    <p className="text-green-800 text-sm">استخدم الهاشتاقات الرائجة وتفاعل مع التعليقات</p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border-r-4 border-purple-500">
                    <h4 className="font-semibold text-purple-900 mb-2">تحليل المنافسين</h4>
                    <p className="text-purple-800 text-sm">ادرس استراتيجيات المنافسين الناجحة</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
                <span>توقعات النمو - 30 يوم</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {growthPrediction.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg">
                      <div className="text-2xl font-bold text-indigo-600">
                        {growthPrediction[growthPrediction.length - 1]?.predictedFollowers.toLocaleString()}
                      </div>
                      <div className="text-sm text-indigo-700">متابع متوقع</div>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        +{((growthPrediction[growthPrediction.length - 1]?.predictedFollowers || 0) - (analyticsData[0]?.followers || 0)).toLocaleString()}
                      </div>
                      <div className="text-sm text-green-700">نمو متوقع</div>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">
                        {Math.round((growthPrediction[growthPrediction.length - 1]?.confidence || 0) * 100)}%
                      </div>
                      <div className="text-sm text-yellow-700">مستوى الثقة</div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">مخطط النمو المتوقع</h4>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <div className="text-gray-500 text-center">
                        <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>مخطط النمو المتوقع</p>
                        <p className="text-sm">سيتم إضافة الرسم البياني التفاعلي قريباً</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">لا توجد بيانات للتوقع</h3>
                  <p>قم بتحليل حساباتك أولاً للحصول على توقعات النمو</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalyticsPanel;
