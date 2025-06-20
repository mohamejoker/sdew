
import React, { useState, useEffect } from 'react';
import { useLocation, Switch, Route } from 'wouter';
import AdminHeader from '@/components/Admin/AdminHeader';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from "@/contexts/AuthContext";
import LoadingSpinner from '@/components/Common/LoadingSpinner';

// Import admin pages
import DashboardPage from '@/pages/admin/DashboardPage';
import UsersPage from '@/pages/admin/UsersPage';
import ServicesPage from '@/pages/admin/ServicesPage';
import OrdersPage from '@/pages/admin/OrdersPage';
import SettingsPage from '@/pages/admin/SettingsPage';
import PaymentsDashboard from '@/components/Admin/PaymentsDashboard';
import SystemDiagnosticsPage from '@/pages/admin/SystemDiagnosticsPage';
import SystemHealthPage from '@/pages/admin/SystemHealthPage';
import PerformancePage from '@/pages/admin/PerformancePage';
import MonitoringPage from '@/pages/admin/MonitoringPage';
import MaintenancePage from '@/pages/admin/MaintenancePage';
import OrdersManagement from '@/components/Orders/OrdersManagement';
import NotificationsHub from '@/components/Notifications/NotificationsHub';
import AdvancedAnalytics from '@/components/Analytics/AdvancedAnalytics';
import AdvancedAdminControls from '@/components/Admin/AdvancedAdminControls';
import ProvidersPage from '@/pages/admin/ProvidersPage';
import PaymentMethodsPage from '@/pages/admin/PaymentMethodsPage';
import ThemeControlPage from '@/pages/admin/ThemeControlPage';
import ReportsPage from '@/pages/admin/ReportsPage';
import UIPage from '@/pages/admin/UIPage';
import FileManagerPage from '@/pages/admin/FileManagerPage';

const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const isMobile = useIsMobile();
  const { user, isLoading } = useAuth();
  const [location] = useLocation();

  useEffect(() => {
    setSidebarCollapsed(isMobile);
  }, [isMobile]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoadingSpinner size="lg" text="جاري التحميل..." />
      </div>
    );
  }

  if (!user) return null;

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen w-full relative bg-gradient-to-b from-slate-100 to-slate-200">
        <div className="relative z-10 flex flex-col min-h-screen w-full">
          <AdminHeader
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
          <div className="flex flex-1 w-full">
            <AdminSidebar isCollapsed={sidebarCollapsed} />
            <main className={`flex-1 transition-all duration-300 ${isMobile ? 'p-2 mt-16' : `mt-16 mr-60 p-8`}`}>
              <div className="max-w-7xl mx-auto">
                <div className="rounded-3xl bg-white shadow-xl p-4 md:p-8 min-h-[65vh] border">
                  <Switch>
                    <Route path="/admin" component={DashboardPage} />
                    <Route path="/admin/dashboard" component={DashboardPage} />
                    <Route path="/admin/users" component={UsersPage} />
                    <Route path="/admin/services" component={ServicesPage} />
                    <Route path="/admin/orders" component={OrdersPage} />
                    <Route path="/admin/orders-management" component={OrdersManagement} />
                    <Route path="/admin/providers" component={ProvidersPage} />
                    <Route path="/admin/payment-methods" component={PaymentMethodsPage} />
                    <Route path="/admin/payments" component={PaymentsDashboard} />
                    <Route path="/admin/reports" component={ReportsPage} />
                    <Route path="/admin/analytics" component={AdvancedAnalytics} />
                    <Route path="/admin/notifications" component={NotificationsHub} />
                    <Route path="/admin/theme" component={ThemeControlPage} />
                    <Route path="/admin/ui" component={UIPage} />
                    <Route path="/admin/files" component={FileManagerPage} />
                    <Route path="/admin/advanced-controls" component={AdvancedAdminControls} />
                    <Route path="/admin/diagnostics" component={SystemDiagnosticsPage} />
                    <Route path="/admin/monitoring" component={MonitoringPage} />
                    <Route path="/admin/maintenance" component={MaintenancePage} />
                    <Route path="/admin/health" component={SystemHealthPage} />
                    <Route path="/admin/performance" component={PerformancePage} />
                    <Route path="/admin/settings" component={SettingsPage} />
                  </Switch>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;
