
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { UIControlProvider } from '@/contexts/UIControlContext';
import SimplifiedHeader from '@/components/Layout/SimplifiedHeader';
import MinimalFooter from '@/components/Layout/MinimalFooter';
import ChatInterface from '@/components/AI/Chat/ChatInterface';
import UsageLimitsCard from '@/components/AI/Chat/UsageLimitsCard';
import { chatPlansService } from '@/services/ai/chatPlansService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Star, Crown, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AIChatPage = () => {
  const { isAuthenticated, user } = useAuth();
  const [currentPlan, setCurrentPlan] = useState('free');
  const [usageStats, setUsageStats] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      const stats = chatPlansService.getUsageStats(user.id, currentPlan);
      setUsageStats(stats);
    }
  }, [user, currentPlan]);

  const handleUpgrade = async (planId: string) => {
    const result = await chatPlansService.upgradePlan(user?.id || 'guest', planId);
    
    if (result.success) {
      toast({
        title: "نجح التحديث",
        description: result.message,
      });
      
      if (result.redirectToPayment) {
        // هنا يمكن إضافة التوجيه لصفحة الدفع
        window.location.href = '/payment-settings';
      } else {
        setCurrentPlan(planId);
      }
    } else {
      toast({
        title: "خطأ في التحديث",
        description: result.message,
        variant: "destructive"
      });
    }
  };

  const plans = chatPlansService.getPlans();

  return (
    <LanguageProvider>
      <UIControlProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          <SimplifiedHeader />
          
          <main className="container mx-auto px-4 py-8 mt-16">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-black text-gray-900 mb-4 flex items-center justify-center gap-3">
                <Brain className="h-10 w-10 text-blue-600" />
                محادثة الذكاء الاصطناعي
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                تفاعل مع أحدث نماذج الذكاء الاصطناعي للحصول على استراتيجيات تسويقية مخصصة ونصائح احترافية
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {/* Chat Interface - Main Area */}
              <div className="lg:col-span-3">
                <ChatInterface 
                  currentPlan={currentPlan}
                  onUpgradeNeeded={() => {
                    toast({
                      title: "حد الاستخدام",
                      description: "تحتاج لترقية خطتك للمتابعة",
                      action: (
                        <Button onClick={() => handleUpgrade('starter')} size="sm">
                          ترقية الآن
                        </Button>
                      )
                    });
                  }}
                />
              </div>

              {/* Sidebar with Usage and Plans */}
              <div className="lg:col-span-1 space-y-6">
                {/* Usage Limits Card */}
                {usageStats && (
                  <UsageLimitsCard usageStats={usageStats} currentPlan={currentPlan} />
                )}

                {/* Quick Upgrade Options */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Star className="h-5 w-5 text-orange-500" />
                      ترقية سريعة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {plans.slice(1, 3).map((plan) => {
                      const IconComponent = plan.id === 'starter' ? Zap : plan.id === 'professional' ? Star : Crown;
                      return (
                        <div key={plan.id} className="border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <IconComponent className="h-4 w-4 text-blue-600" />
                              <span className="font-medium">{plan.name}</span>
                            </div>
                            <Badge variant="outline">{plan.price} ج.م</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {plan.messagesLimit === 'unlimited' ? 'رسائل غير محدودة' : `${plan.messagesLimit} رسالة`}
                          </p>
                          <Button 
                            onClick={() => handleUpgrade(plan.id)}
                            size="sm" 
                            className="w-full"
                            variant={currentPlan === plan.id ? "secondary" : "default"}
                            disabled={currentPlan === plan.id}
                          >
                            {currentPlan === plan.id ? 'الخطة الحالية' : 'ترقية'}
                            <ArrowRight className="h-4 w-4 mr-2" />
                          </Button>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Features Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">ميزات الذكاء الاصطناعي</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        تحليل شامل للحسابات
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        استراتيجيات تسويقية مخصصة
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        إنشاء محتوى إبداعي
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        تحليل المنافسين
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        نصائح تحسين الأداء
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
          
          <MinimalFooter />
        </div>
      </UIControlProvider>
    </LanguageProvider>
  );
};

export default AIChatPage;
