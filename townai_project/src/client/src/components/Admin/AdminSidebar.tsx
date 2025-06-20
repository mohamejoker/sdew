
import React from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Common/Logo';
import { 
  LayoutDashboard, Users, ShoppingBag, Settings, 
  DollarSign, BarChart3, Shield, Bell, 
  Wrench, Activity, FileText, Zap,
  Globe, CreditCard, Palette, PieChart,
  MonitorSpeaker, Gauge
} from 'lucide-react';

interface AdminSidebarProps {
  isCollapsed: boolean;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isCollapsed }) => {
  const [location] = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'لوحة التحكم', path: '/admin/dashboard' },
    { icon: Users, label: 'إدارة المستخدمين', path: '/admin/users' },
    { icon: ShoppingBag, label: 'إدارة الخدمات', path: '/admin/services' },
    { icon: FileText, label: 'إدارة الطلبات', path: '/admin/orders' },
    { icon: Globe, label: 'إدارة الموردين', path: '/admin/providers' },
    { icon: CreditCard, label: 'طرق الدفع', path: '/admin/payment-methods' },
    { icon: DollarSign, label: 'المدفوعات', path: '/admin/payments' },
    { icon: PieChart, label: 'التقارير', path: '/admin/reports' },
    { icon: BarChart3, label: 'التحليلات', path: '/admin/analytics' },
    { icon: Bell, label: 'الإشعارات', path: '/admin/notifications' },
    { icon: Palette, label: 'إدارة الثيم', path: '/admin/theme' },
    { icon: MonitorSpeaker, label: 'واجهة المستخدم', path: '/admin/ui' },
    { icon: Activity, label: 'مراقبة النظام', path: '/admin/monitoring' },
    { icon: Gauge, label: 'الأداء', path: '/admin/performance' },
    { icon: Shield, label: 'التشخيص', path: '/admin/diagnostics' },
    { icon: Wrench, label: 'الصيانة', path: '/admin/maintenance' },
    { icon: Zap, label: 'أدوات متقدمة', path: '/admin/advanced-controls' },
    { icon: Settings, label: 'الإعدادات', path: '/admin/settings' },
  ];

  return (
    <aside className={`fixed right-0 top-16 h-[calc(100vh-4rem)] bg-white border-l border-gray-200 transition-all duration-300 z-40 ${
      isCollapsed ? 'w-16' : 'w-60'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          {!isCollapsed && <Logo size="sm" />}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              
              return (
                <li key={item.path}>
                  <Link to={item.path}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-4'} ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isCollapsed ? '' : 'ml-3'}`} />
                      {!isCollapsed && (
                        <span className="text-sm font-medium">{item.label}</span>
                      )}
                    </Button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
