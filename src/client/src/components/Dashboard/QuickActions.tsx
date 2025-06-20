
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Users, 
  Settings, 
  BarChart3, 
  Bell,
  Zap,
  FileText,
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const QuickActions = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const quickActions = [
    {
      title: 'إضافة مستخدم',
      description: 'إنشاء حساب مستخدم جديد',
      icon: Plus,
      color: 'from-blue-500 to-blue-600',
      onClick: () => navigate('/admin/users')
    },
    {
      title: 'عرض المستخدمين',
      description: 'إدارة حسابات المستخدمين',
      icon: Users,
      color: 'from-green-500 to-green-600',
      onClick: () => navigate('/admin/users')
    },
    {
      title: 'الإعدادات',
      description: 'تكوين إعدادات النظام',
      icon: Settings,
      color: 'from-purple-500 to-purple-600',
      onClick: () => navigate('/admin/settings')
    },
    {
      title: 'التقارير',
      description: 'عرض إحصائيات مفصلة',
      icon: BarChart3,
      color: 'from-orange-500 to-orange-600',
      onClick: () => navigate('/admin/analytics')
    },
    {
      title: 'الإشعارات',
      description: 'إدارة الإشعارات',
      icon: Bell,
      color: 'from-red-500 to-red-600',
      onClick: () => navigate('/admin/notifications')
    },
    {
      title: 'الأداء',
      description: 'مراقبة أداء النظام',
      icon: Zap,
      color: 'from-yellow-500 to-yellow-600',
      onClick: () => navigate('/admin/performance')
    },
    {
      title: 'المحتوى',
      description: 'إدارة محتوى الموقع',
      icon: FileText,
      color: 'from-indigo-500 to-indigo-600',
      onClick: () => navigate('/admin/content')
    },
    {
      title: 'الأمان',
      description: 'إعدادات الأمان والحماية',
      icon: Shield,
      color: 'from-gray-500 to-gray-600',
      onClick: () => navigate('/admin/security')
    }
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-600" />
          الإجراءات السريعة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'}`}>
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 text-right flex flex-col items-center gap-3 hover:bg-gray-50 transition-colors group"
                onClick={action.onClick}
              >
                <div className={`p-3 rounded-full bg-gradient-to-r ${action.color} text-white group-hover:scale-110 transition-transform`}>
                  <IconComponent className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-900">{action.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{action.description}</p>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
