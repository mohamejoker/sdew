
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  TrendingUp, 
  Target, 
  BarChart3,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye
} from 'lucide-react';
import { seoService, SEOData, SEOAnalysis } from '@/services/seo/seoService';

const SEODashboard = () => {
  const [seoData, setSeoData] = useState<SEOData>({
    title: '',
    description: '',
    keywords: [],
    ogImage: '',
    canonicalUrl: ''
  });
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);
  const [keywordInput, setKeywordInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const result = seoService.analyzePage(seoData);
      setAnalysis(result);
    } catch (error) {
      console.error('خطأ في تحليل SEO:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !seoData.keywords.includes(keywordInput.trim())) {
      setSeoData(prev => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()]
      }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setSeoData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCheckIcon = (passed: boolean) => {
    return passed ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">تحسين محركات البحث (SEO)</h2>
        <Button onClick={handleAnalyze} disabled={isAnalyzing}>
          <Search className="h-4 w-4 mr-2" />
          {isAnalyzing ? 'جاري التحليل...' : 'تحليل SEO'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* نموذج البيانات */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>بيانات الصفحة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان الصفحة</Label>
                <Input
                  id="title"
                  value={seoData.title}
                  onChange={(e) => setSeoData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="عنوان الصفحة (30-60 حرف)"
                />
                <p className="text-xs text-gray-500">
                  {seoData.title.length}/60 حرف
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">وصف الصفحة</Label>
                <Textarea
                  id="description"
                  value={seoData.description}
                  onChange={(e) => setSeoData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="وصف الصفحة (120-160 حرف)"
                  rows={3}
                />
                <p className="text-xs text-gray-500">
                  {seoData.description.length}/160 حرف
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">الكلمات المفتاحية</Label>
                <div className="flex gap-2">
                  <Input
                    id="keywords"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    placeholder="أدخل كلمة مفتاحية"
                    onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                  />
                  <Button onClick={addKeyword} type="button">
                    إضافة
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {seoData.keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="cursor-pointer" onClick={() => removeKeyword(keyword)}>
                      {keyword} ×
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ogImage">صورة Open Graph</Label>
                <Input
                  id="ogImage"
                  value={seoData.ogImage}
                  onChange={(e) => setSeoData(prev => ({ ...prev, ogImage: e.target.value }))}
                  placeholder="رابط الصورة"
                />
              </div>
            </CardContent>
          </Card>

          {/* نتائج التحليل */}
          {analysis && (
            <Card>
              <CardHeader>
                <CardTitle>تقرير SEO</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                    <TabsTrigger value="issues">المشاكل</TabsTrigger>
                    <TabsTrigger value="recommendations">التوصيات</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <div className="space-y-4">
                      <div className="text-center p-6 bg-gray-50 rounded-lg">
                        <div className={`text-4xl font-bold ${getScoreColor(analysis.score)}`}>
                          {analysis.score}/100
                        </div>
                        <p className="text-gray-600 mt-2">نقاط SEO</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <span>طول العنوان مناسب</span>
                          {getCheckIcon(analysis.checks.titleLength)}
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <span>طول الوصف مناسب</span>
                          {getCheckIcon(analysis.checks.descriptionLength)}
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <span>يحتوي على كلمات مفتاحية</span>
                          {getCheckIcon(analysis.checks.hasKeywords)}
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <span>يحتوي على صورة OG</span>
                          {getCheckIcon(analysis.checks.hasOGTags)}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="issues">
                    <div className="space-y-3">
                      {analysis.issues.length === 0 ? (
                        <p className="text-center text-green-600 py-4">
                          <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                          لا توجد مشاكل في SEO!
                        </p>
                      ) : (
                        analysis.issues.map((issue, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded border-l-4 border-red-500">
                            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                            <span className="text-red-700">{issue}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="recommendations">
                    <div className="space-y-3">
                      {analysis.recommendations.map((recommendation, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                          <Target className="h-5 w-5 text-blue-500 mt-0.5" />
                          <span className="text-blue-700">{recommendation}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>

        {/* الشريط الجانبي */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                إحصائيات سريعة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded">
                <div className="text-2xl font-bold text-blue-600">1,234</div>
                <div className="text-sm text-blue-600">زيارات شهرية</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded">
                <div className="text-2xl font-bold text-green-600">67</div>
                <div className="text-sm text-green-600">ترتيب متوسط</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded">
                <div className="text-2xl font-bold text-orange-600">23</div>
                <div className="text-sm text-orange-600">كلمات في الصفحة الأولى</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                اقتراحات الكلمات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {seoService.suggestKeywords('تسويق').slice(0, 5).map((keyword) => (
                  <div key={keyword} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <span className="text-sm">{keyword}</span>
                    <Button size="sm" variant="ghost" onClick={() => {
                      setSeoData(prev => ({
                        ...prev,
                        keywords: [...prev.keywords, keyword]
                      }));
                    }}>
                      +
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SEODashboard;
