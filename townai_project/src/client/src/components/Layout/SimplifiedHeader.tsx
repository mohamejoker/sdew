import React, { useState } from 'react';
import { Menu, X, User, Brain, LogOut, Settings, Shield, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoleAuth } from '@/hooks/useRoleAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const SimplifiedHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { isAdmin, isLoading: roleLoading } = useRoleAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = [
    { name: 'الرئيسية', href: '/' },
    { name: 'الخدمات', href: '/services', icon: ShoppingBag },
    { name: 'محادثة AI', href: '/ai-chat', icon: Brain, requireAuth: true },
    { name: 'الدعم', href: '/support', requireAuth: true }
  ];

  const getFilteredNavItems = () => {
    return navItems.filter(item => {
      if (item.href === '/services') return true;
      return !item.requireAuth || isAuthenticated
    });
  };

  const getDashboardLink = () => {
    if (roleLoading) return '/user-dashboard';
    return isAdmin ? '/dashboard' : '/user-dashboard';
  };

  const getDashboardText = () => {
    if (roleLoading) return 'لوحة التحكم';
    return isAdmin ? 'لوحة الإدارة' : 'لوحة التحكم';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">SM</span>
            </div>
            <span className="text-xl font-bold text-gray-900">سوشيال ميديا</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {getFilteredNavItems().map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center gap-2"
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {user?.email?.split('@')[0] || 'المستخدم'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to={getDashboardLink()} className="flex items-center gap-2">
                      {isAdmin ? <Shield className="h-4 w-4" /> : <Settings className="h-4 w-4" />}
                      {getDashboardText()}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      الملف الشخصي
                    </Link>
                  </DropdownMenuItem>
                  {isAuthenticated && (
                    <DropdownMenuItem asChild>
                      <Link to="/ai-chat" className="flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        محادثة AI
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-600">
                    <LogOut className="h-4 w-4" />
                    تسجيل الخروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-gray-700">
                    <User className="h-4 w-4 ml-2" />
                    تسجيل الدخول
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    ابدأ الآن
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {getFilteredNavItems().map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-gray-700 hover:text-blue-600 font-medium py-2 flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link to={getDashboardLink()} className="block">
                      <Button variant="outline" className="w-full justify-start">
                        {isAdmin ? <Shield className="h-4 w-4 ml-2" /> : <Settings className="h-4 w-4 ml-2" />}
                        {getDashboardText()}
                      </Button>
                    </Link>
                    <Link to="/profile" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <User className="h-4 w-4 ml-2" />
                        الملف الشخصي
                      </Button>
                    </Link>
                    <Link to="/ai-chat" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <Brain className="h-4 w-4 ml-2" />
                        محادثة AI
                      </Button>
                    </Link>
                    <Button 
                      onClick={handleLogout}
                      variant="outline" 
                      className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 ml-2" />
                      تسجيل الخروج
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block">
                      <Button variant="outline" className="w-full">
                        تسجيل الدخول
                      </Button>
                    </Link>
                    <Link to="/register" className="block">
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
                        ابدأ الآن
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default SimplifiedHeader;
