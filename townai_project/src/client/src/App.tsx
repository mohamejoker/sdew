
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import { AuthProvider } from "@/components/Auth/AuthProvider";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import LandingPage from "@/pages/LandingPage";
import DashboardPage from "@/pages/admin/DashboardPage";
import UsersPage from "@/pages/admin/UsersPage";
import ServicesPage from "@/pages/admin/ServicesPage";
import OrdersPage from "@/pages/admin/OrdersPage";
import SettingsPage from "@/pages/admin/SettingsPage";
import PaymentsDashboard from "@/components/Admin/PaymentsDashboard";
import SystemDiagnosticsPage from "@/pages/admin/SystemDiagnosticsPage";
import SystemHealthPage from "@/pages/admin/SystemHealthPage";
import PerformancePage from "@/pages/admin/PerformancePage";
import MonitoringPage from "@/pages/admin/MonitoringPage";
import MaintenancePage from "@/pages/admin/MaintenancePage";
import ServicesOverview from "@/components/Services/ServicesOverview";
import OrdersManagement from "@/components/Orders/OrdersManagement";
import NotificationsHub from "@/components/Notifications/NotificationsHub";
import AdvancedAnalytics from "@/components/Analytics/AdvancedAnalytics";
import AdvancedAdminControls from "@/components/Admin/AdvancedAdminControls";
import ProvidersPage from "@/pages/admin/ProvidersPage";
import PaymentMethodsPage from "@/pages/admin/PaymentMethodsPage";
import ThemeControlPage from "@/pages/admin/ThemeControlPage";
import ReportsPage from "@/pages/admin/ReportsPage";
import UIPage from "@/pages/admin/UIPage";
import ErrorBoundaryWrapper from "@/components/Common/ErrorBoundaryWrapper";
import { PageLoading } from "@/components/Common/LoadingStates";
import AdminLayout from "@/layouts/AdminLayout";
import FloatingAIButton from "@/components/AI/FloatingAIButton";
import { Suspense } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <div className="min-h-screen w-full">
            <Suspense fallback={<PageLoading message="جاري تحميل الصفحة..." />}>
              <Switch>
                <Route path="/" component={LandingPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/services" component={ServicesOverview} />
                
                <Route path="/admin/:rest*">
                  <ErrorBoundaryWrapper context="Admin Layout">
                    <ProtectedRoute requiredRole="admin">
                      <AdminLayout />
                    </ProtectedRoute>
                  </ErrorBoundaryWrapper>
                </Route>
              </Switch>
            </Suspense>
            
            <FloatingAIButton />
          </div>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
