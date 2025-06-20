
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, DollarSign, ShoppingCart, TrendingUp, 
  Globe, Database, Shield, Zap,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
  color: string;
  subtitle?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, value, change, changeType, icon: Icon, color, subtitle 
}) => (
  <Card className="hover:shadow-lg transition-all duration-300">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          <div className={`flex items-center gap-1 ${
            changeType === 'up' ? 'text-green-600' : 
            changeType === 'down' ? 'text-red-600' : 'text-gray-600'
          }`}>
            {changeType === 'up' && <ArrowUpRight className="h-4 w-4" />}
            {changeType === 'down' && <ArrowDownRight className="h-4 w-4" />}
            <span className="text-sm font-semibold">{change}</span>
          </div>
        </div>
        <div className={`p-4 rounded-xl ${color} text-white shadow-lg`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const AdminMetricsGrid = () => {
  const metrics = [
    {
      title: 'إجمالي المستخدمين',
      value: '12,847',
      change: '+12.5%',
      changeType: 'up' as const,
      icon: Users,
      color: 'bg-blue-500',
      subtitle: '+234 هذا الأسبوع'
    },
    {
      title: 'الإيرادات الشهرية',
      value: '٤٨٥,٢٣٠ ريال',
      change: '+18.2%',
      changeType: 'up' as const,
      icon: DollarSign,
      color: 'bg-green-500',
      subtitle: 'مقارنة بالشهر الماضي'
    },
    {
      title: 'الطلبات المكتملة',
      value: '1,247',
      change: '+8.4%',
      changeType: 'up' as const,
      icon: ShoppingCart,
      color: 'bg-purple-500',
      subtitle: 'هذا الشهر'
    },
    {
      title: 'معدل النمو',
      value: '23.8%',
      change: '+2.1%',
      changeType: 'up' as const,
      icon: TrendingUp,
      color: 'bg-orange-500',
      subtitle: 'نمو ربع سنوي'
    },
    {
      title: 'زوار الموقع',
      value: '45,678',
      change: '+15.3%',
      changeType: 'up' as const,
      icon: Globe,
      color: 'bg-cyan-500',
      subtitle: 'هذا الأسبوع'
    },
    {
      title: 'حجم قاعدة البيانات',
      value: '2.4 GB',
      change: '+5.2%',
      changeType: 'up' as const,
      icon: Database,
      color: 'bg-indigo-500',
      subtitle: 'استخدام التخزين'
    },
    {
      title: 'مستوى الأمان',
      value: '98.5%',
      change: '+0.3%',
      changeType: 'up' as const,
      icon: Shield,
      color: 'bg-red-500',
      subtitle: 'لا توجد تهديدات'
    },
    {
      title: 'أداء النظام',
      value: '94.2%',
      change: '-1.2%',
      changeType: 'down' as const,
      icon: Zap,
      color: 'bg-yellow-500',
      subtitle: 'متوسط الاستجابة: 120ms'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">مقاييس الأداء الرئيسية</h2>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          تحديث فوري
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default AdminMetricsGrid;
