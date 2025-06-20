
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Calendar, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface UsageStats {
  currentPlan: string;
  messagesUsed: number;
  messagesLimit: number | 'unlimited';
  usagePercentage: number;
  daysUntilReset: number;
}

interface UsageLimitsCardProps {
  usageStats: UsageStats;
  currentPlan: string;
}

const UsageLimitsCard: React.FC<UsageLimitsCardProps> = ({ usageStats, currentPlan }) => {
  const isUnlimited = usageStats.messagesLimit === 'unlimited';
  const isNearLimit = usageStats.usagePercentage > 80;
  const isAtLimit = usageStats.usagePercentage >= 100;

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'free': return 'text-gray-600';
      case 'starter': return 'text-blue-600';
      case 'professional': return 'text-orange-600';
      case 'enterprise': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'free': return 'bg-gray-100 text-gray-800';
      case 'starter': return 'bg-blue-100 text-blue-800';
      case 'professional': return 'bg-orange-100 text-orange-800';
      case 'enterprise': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-500" />
          حالة الاستخدام
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Plan */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">الخطة الحالية:</span>
          <Badge className={getPlanBadgeColor(currentPlan)}>
            {usageStats.currentPlan}
          </Badge>
        </div>

        {/* Usage Progress */}
        {!isUnlimited && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>الرسائل المستخدمة:</span>
              <span className={`font-medium ${getPlanColor(currentPlan)}`}>
                {usageStats.messagesUsed} / {usageStats.messagesLimit}
              </span>
            </div>
            
            <Progress 
              value={usageStats.usagePercentage} 
              className="h-2"
              // @ts-ignore
              indicatorClassName={
                isAtLimit ? 'bg-red-500' : 
                isNearLimit ? 'bg-yellow-500' : 
                'bg-green-500'
              }
            />
            
            <div className="flex items-center gap-1 text-xs">
              {isAtLimit ? (
                <>
                  <AlertCircle className="h-3 w-3 text-red-500" />
                  <span className="text-red-600">تم استنفاد الحد المسموح</span>
                </>
              ) : isNearLimit ? (
                <>
                  <AlertCircle className="h-3 w-3 text-yellow-500" />
                  <span className="text-yellow-600">اقتراب من الحد الأقصى</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span className="text-green-600">في المعدل الطبيعي</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Unlimited Plan */}
        {isUnlimited && (
          <div className="text-center py-4">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-green-600">رسائل غير محدودة</p>
            <p className="text-xs text-gray-500">استمتع بمحادثات لا نهائية</p>
          </div>
        )}

        {/* Reset Info */}
        {!isUnlimited && (
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-blue-700">إعادة تعيين الحد:</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              خلال {usageStats.daysUntilReset} {usageStats.daysUntilReset === 1 ? 'يوم' : 'أيام'}
            </p>
          </div>
        )}

        {/* Usage Tips */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            نصائح للاستخدام الأمثل:
          </h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• اجعل أسئلتك محددة وواضحة</li>
            <li>• استخدم رسالة واحدة لعدة استفسارات</li>
            {currentPlan === 'free' && <li>• فكر في الترقية للحصول على المزيد</li>}
            {!isUnlimited && <li>• حفظ المحادثات المهمة قبل انتهاء المدة</li>}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          {isAtLimit && (
            <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
              ترقية الآن
            </Button>
          )}
          {!isAtLimit && currentPlan === 'free' && (
            <Button size="sm" variant="outline" className="w-full">
              اكتشف الخطط المدفوعة
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UsageLimitsCard;
