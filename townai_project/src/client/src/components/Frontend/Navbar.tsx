
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X, ChevronDown, Globe, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useUIControl } from '@/contexts/UIControlContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [location] = useLocation();
  const { theme } = useUIControl();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'الخدمات', path: '/services' },
    { name: 'التسعير', path: '/pricing' },
    { name: 'من نحن', path: '/about' },
    { name: 'تواصل معنا', path: '/contact' },
  ];

  const userNavLinks = [
    { name: 'لوحة التحكم', path: '/dashboard' },
    { name: 'الملف الشخصي', path: '/profile' },
    { name: 'الإعدادات', path: '/settings' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md py-2'
          : 'bg-transparent py-4'
      )}
      style={{
        backgroundColor: scrolled ? theme.backgroundColor : 'transparent',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/logo.svg"
                alt="Town Media Logo"
                className="h-10 w-auto"
              />
              <span
                className="text-xl font-bold ml-2"
                style={{ color: theme.primaryColor }}
              >
                Town Media
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary bg-primary/10'
                    : 'hover:bg-gray-100'
                }`}
                style={{
                  color:
                    location.pathname === link.path
                      ? theme.primaryColor
                      : theme.textColor,
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-2 rtl:space-x-reverse">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Globe className="h-4 w-4" />
                  <span>{language === 'ar' ? 'العربية' : 'English'}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('ar')}>
                  العربية
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={(user as any)?.avatar || ''}
                        alt={(user as any)?.name || 'User'}
                      />
                      <AvatarFallback>
                        {(user as any)?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">
                      {(user as any)?.name || ''}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {(user as any)?.email || ''}
                    </p>
                  </div>
                  <div className="border-t my-1"></div>
                  {userNavLinks.map((link) => (
                    <DropdownMenuItem key={link.path} asChild>
                      <Link to={link.path}>{link.name}</Link>
                    </DropdownMenuItem>
                  ))}
                  <div className="border-t my-1"></div>
                  <DropdownMenuItem
                    className="text-red-500 focus:text-red-500"
                    onClick={logout}
                  >
                    <LogOut className="ml-2 h-4 w-4" />
                    تسجيل الخروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-gray-700"
                >
                  <Link to="/login">تسجيل الدخول</Link>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                >
                  <Link to="/register">إنشاء حساب</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? 'block' : 'hidden'
        } bg-white shadow-lg absolute w-full`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === link.path
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div className="border-t border-gray-200 my-2"></div>

          <div className="flex justify-between items-center px-3 py-2">
            <span className="text-sm text-gray-500">اللغة</span>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <button
                onClick={() => setLanguage('ar')}
                className={`px-2 py-1 text-xs rounded ${
                  language === 'ar'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                العربية
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs rounded ${
                  language === 'en'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {!user && (
            <div className="flex flex-col space-y-2 px-3 py-2">
              <Button variant="outline" asChild className="w-full">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  تسجيل الدخول
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  إنشاء حساب
                </Link>
              </Button>
            </div>
          )}

          {user && (
            <div className="px-3 py-2">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={(user as any)?.avatar || ''}
                    alt={(user as any)?.name || 'User'}
                  />
                  <AvatarFallback>{(user as any)?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{(user as any)?.name || ''}</p>
                  <p className="text-xs text-gray-500">{(user as any)?.email || ''}</p>
                </div>
              </div>

              <div className="space-y-1">
                {userNavLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 flex items-center"
                >
                  <LogOut className="ml-2 h-4 w-4" />
                  تسجيل الخروج
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

