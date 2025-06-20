
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Lightbulb, 
  TrendingUp, 
  Users, 
  BarChart3, 
  Target,
  CheckCircle,
  Clock,
  Zap,
  Filter
} from 'lucide-react';
import { suggestionsService, type Suggestion } from '@/services/suggestions/suggestionsService';

const SuggestionsPanel = () => {
  const [suggestions] = useState(suggestionsService.getAllSuggestions());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const stats = suggestionsService.getStats();

  const categories = [
    { id: 'all', label: 'الكل', icon: Filter },
    { id: 'marketing', label: 'التسويق', icon: TrendingUp },
    { id: 'content', label: 'المحتوى', icon: Lightbulb },
    { id: 'analytics', label: 'التحليلات', icon: BarChart3 },
    { id: 'growth', label: 'النمو', icon: Target },
    { id: 'engagement', label: 'التفاعل', icon: Users }
  ];

  const filteredSuggestions = selectedCategory === 'all' 
    ? suggestions 
    : suggestions.filter(s => s.category === selectedCategory);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleImplement = (id: string) => {
    suggestionsService.implementSuggestion(id);
    // هنا يمكن إضافة إعادة تحديث للحالة
  };

  return (
    <div className="space-y-6">
      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <p className="text-sm text-gray-600">إجمالي الاقتراحات</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.implemented}</div>
            <p className="text-sm text-gray-600">مُنفذة</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
            <p className="text-sm text-gray-600">في الانتظار</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.completionRate}%</div>
            <p className="text-sm text-gray-600">معدل الإنجاز</p>
          </CardContent>
        </Card>
      </div>

      {/* تبويبات الفئات */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            الاقتراحات والتوصيات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-6 mb-6">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                    <IconComponent className="h-4 w-4" />
                    <span className="hidden sm:inline">{category.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <div className="space-y-4">
              {filteredSuggestions.map((suggestion) => (
                <Card key={suggestion.id} className={`${suggestion.isImplemented ? 'bg-green-50' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {suggestion.title}
                          </h3>
                          {suggestion.isImplemented && (
                            <Badge className="bg-green-500 text-white">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              مُنفذ
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{suggestion.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge className={`${getPriorityColor(suggestion.priority)} text-white`}>
                          {suggestion.priority === 'high' ? 'عالية' : 
                           suggestion.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                        </Badge>
                        
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          {suggestion.timeToImplement}
                        </div>
                        
                        <div className={`text-sm font-medium ${getDifficultyColor(suggestion.difficulty)}`}>
                          {suggestion.difficulty === 'easy' ? 'سهل' :
                           suggestion.difficulty === 'medium' ? 'متوسط' : 'صعب'}
                        </div>
                        
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Zap className="h-4 w-4" />
                          تأثير {suggestion.estimatedImpact === 'high' ? 'عالي' :
                                 suggestion.estimatedImpact === 'medium' ? 'متوسط' : 'منخفض'}
                        </div>
                      </div>

                      {!suggestion.isImplemented && (
                        <Button 
                          onClick={() => handleImplement(suggestion.id)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          تنفيذ الآن
                        </Button>
                      )}
                    </div>

                    {suggestion.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {suggestion.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuggestionsPanel;
