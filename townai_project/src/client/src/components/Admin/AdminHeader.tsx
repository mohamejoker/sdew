
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { LogOut, Settings, User, Search, Menu } from 'lucide-react';
import RealTimeNotifications from '@/components/Notifications/RealTimeNotifications';

interface AdminHeaderProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleSignOut = async () => {
    await logout();
    setLocation('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-6 py-4 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="البحث في لوحة التحكم..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <RealTimeNotifications />
          
          <Button variant="ghost" size="sm" className="hover:bg-gray-100">
            <Settings className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {user?.email || 'المشرف'}
              </p>
              <p className="text-xs text-gray-500">مشرف النظام</p>
            </div>
            <Button variant="ghost" size="sm" className="hover:bg-gray-100">
              <User className="h-5 w-5" />
            </Button>
          </div>

          <Button variant="ghost" size="sm" onClick={handleSignOut} className="hover:bg-gray-100">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
