
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useRoleAuth } from '@/hooks/useRoleAuth';
import { Menu, X, User, LogOut, Settings, BarChart3, Sparkles } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { isAdmin } = useRoleAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AI Panel</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              الرئيسية
            </Link>
            <Link
              to="/services"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              خدماتنا
            </Link>
            <Link
              to="/ai-chat"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              المساعد الذكي
            </Link>
            <Link
              to="/support"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              الدعم
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 rtl:space-x-reverse">
                    <User className="h-4 w-4" />
                    <span>{user?.email?.split('@')[0] || 'المستخدم'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="ml-2 h-4 w-4" />
                      <span>الملف الشخصي</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center">
                      <BarChart3 className="ml-2 h-4 w-4" />
                      <span>لوحة التحكم</span>
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center">
                        <Settings className="ml-2 h-4 w-4" />
                        <span>إدارة النظام</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="ml-2 h-4 w-4" />
                    <span>تسجيل الخروج</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">تسجيل الدخول</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-indigo-500 to-purple-600">
                  <Link to="/register">إنشاء حساب</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <Link
                to="/services"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                خدماتنا
              </Link>
              <Link
                to="/ai-chat"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                المساعد الذكي
              </Link>
              <Link
                to="/support"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                الدعم
              </Link>
              
              {isAuthenticated ? (
                <div className="pt-4 border-t space-y-2">
                  <Link
                    to="/profile"
                    className="block text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    الملف الشخصي
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    لوحة التحكم
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="block text-gray-600 hover:text-gray-900 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      إدارة النظام
                    </Link>
                  )}
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="text-red-600 justify-start w-full"
                  >
                    تسجيل الخروج
                  </Button>
                </div>
              ) : (
                <div className="pt-4 border-t space-y-2">
                  <Button variant="ghost" asChild className="w-full justify-start">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      تسجيل الدخول
                    </Link>
                  </Button>
                  <Button asChild className="w-full bg-gradient-to-r from-indigo-500 to-purple-600">
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      إنشاء حساب
                    </Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
