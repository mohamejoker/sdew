import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoleAuth } from '@/hooks/useRoleAuth';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { UIControlProvider } from '@/contexts/UIControlContext';
import SimplifiedHeader from '@/components/Layout/SimplifiedHeader';
import MinimalFooter from '@/components/Layout/MinimalFooter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  MessageSquare, 
  User, 
  Settings, 
  BarChart3,
  Sparkles,
  ArrowRight,
  Calendar,
  Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import LoadingSpinner from '@/components/Common/LoadingSpinner';

const UserDashboard = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { userRole, isLoading: roleLoading } = useRoleAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !roleLoading && isAuthenticated) {
      // Redirect admin users to admin dashboard
      if (userRole === 'admin') {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [authLoading, roleLoading, isAuthenticated, userRole, navigate]);

  const quickActions = [
    {
      title: 'محادثة AI',
      description: 'تفاعل مع الذكاء الاصطناعي للحصول على استراتيجيات تسويقية',
      icon: Brain,
      href: '/ai-chat',
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: 'الملف الشخصي',
      description: 'تحديث بياناتك الشخصية وإعدادات الحساب',
      icon: User,
      href: '/profile',
      color: 'from-green-500 to-teal-600'
    },
    {
      title: 'الإشعارات',
      description: 'تصفح آخر الإشعارات والتحديثات',
      icon: Bell,
      href: '/notifications',
      color: 'from-orange-500 to-red-600'
    },
    {
      title: 'الدعم',
      description: 'احصل على المساعدة والدعم الفني',
      icon: MessageSquare,
      href: '/support',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoadingSpinner size="lg" text="جاري التحميل..." />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <LanguageProvider>
        <UIControlProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <SimplifiedHeader />
            
            <main className="container mx-auto px-4 py-8 mt-16">
              {/* Welcome Section */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-black text-gray-900 mb-4 flex items-center justify-center gap-3">
                  <Sparkles className="h-10 w-10 text-blue-600" />
                  مرحباً {user?.email?.split('@')[0] || 'بك'}!
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  لوحة التحكم الخاصة بك للوصول إلى جميع الخدمات والميزات
                </p>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {quickActions.map((action) => {
                  const IconComponent = action.icon;
                  return (
                    <Link key={action.title} to={action.href}>
                      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                        <CardHeader className="text-center">
                          <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <IconComponent className="h-8 w-8 text-white" />
                          </div>
                          <CardTitle className="text-lg">{action.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 text-sm text-center mb-4">
                            {action.description}
                          </p>
                          <Button variant="outline" className="w-full group-hover:bg-gray-50">
                            الوصول الآن
                            <ArrowRight className="h-4 w-4 mr-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">المحادثات</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">
                      محادثة مع الذكاء الاصطناعي هذا الشهر
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">الخطة الحالية</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">مجانية</div>
                    <p className="text-xs text-muted-foreground">
                      5 رسائل يومياً
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">آخر نشاط</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">اليوم</div>
                    <p className="text-xs text-muted-foreground">
                      آخر محادثة مع AI
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* CTA Section */}
              <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">اكتشف قوة الذكاء الاصطناعي</h3>
                  <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                    ابدأ محادثة مع الذكاء الاصطناعي الآن واحصل على استراتيجيات تسويقية مخصصة لحسابك
                  </p>
                  <Link to="/ai-chat">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                      ابدأ المحادثة الآن
                      <Brain className="h-5 w-5 mr-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </main>
            
            <MinimalFooter />
          </div>
        </UIControlProvider>
      </LanguageProvider>
    </ProtectedRoute>
  );
};

export default UserDashboard;
