
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  Activity,
  Brain,
  Users,
  Shield,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EnhancedDashboard from './EnhancedDashboard';
import AdvancedSystemMonitor from './AdvancedSystemMonitor';
import InteractiveCharts from './InteractiveCharts';

const EnhancedOverviewPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const quickNavigation = [
    { 
      title: 'إدارة المستخدمين', 
      icon: Users, 
      color: 'from-blue-500 to-blue-600',
      action: () => navigate('/admin/users')
    },
    { 
      title: 'الأمان والحماية', 
      icon: Shield, 
      color: 'from-red-500 to-red-600',
      action: () => navigate('/admin/security')
    },
    { 
      title: 'التقارير المتقدمة', 
      icon: FileText, 
      color: 'from-green-500 to-green-600',
      action: () => navigate('/admin/analytics')
    },
    { 
      title: 'التحليلات الذكية', 
      icon: Brain, 
      color: 'from-purple-500 to-purple-600',
      action: () => navigate('/admin/intelligent-analytics')
    },
    { 
      title: 'إعدادات النظام', 
      icon: Settings, 
      color: 'from-gray-500 to-gray-600',
      action: () => navigate('/admin/settings')
    },
    { 
      title: 'مراقبة الأداء', 
      icon: Activity, 
      color: 'from-orange-500 to-orange-600',
      action: () => navigate('/admin/performance')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            لوحة التحكم الإدارية الشاملة
          </h1>
          <p className="text-gray-600 mt-2">إدارة متقدمة ومراقبة شاملة لجميع جوانب النظام</p>
        </div>
        
        {/* الإجراءات السريعة */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {quickNavigation.map((nav, index) => {
            const IconComponent = nav.icon;
            return (
              <Button
                key={index}
                onClick={nav.action}
                className={`h-16 flex flex-col gap-1 bg-gradient-to-r ${nav.color} hover:opacity-90 transition-all duration-200 text-white`}
                size="sm"
              >
                <IconComponent className="h-4 w-4" />
                <span className="text-xs text-center leading-tight">
                  {nav.title === 'الذكاء الاصطناعي' ? 'التحليلات الذكية' : nav.title}
                </span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* التبويبات الرئيسية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 rounded-xl p-1">
          <TabsTrigger value="dashboard" className="flex items-center gap-2 rounded-lg">
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">لوحة التحكم</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2 rounded-lg">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">التحليلات</span>
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center gap-2 rounded-lg">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">المراقبة</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2 rounded-lg">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">الإعدادات</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          <EnhancedDashboard />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <InteractiveCharts />
        </TabsContent>

        <TabsContent value="monitoring" className="mt-6">
          <AdvancedSystemMonitor />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="text-center py-12">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">إعدادات النظام</h3>
            <p className="text-gray-600 mb-6">إدارة الإعدادات العامة والمتقدمة للنظام</p>
            <Button 
              onClick={() => navigate('/admin/settings')}
              className="bg-gradient-to-r from-blue-500 to-purple-600"
            >
              انتقال إلى الإعدادات
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedOverviewPage;
