
import React, { useState } from 'react';
import { Menu, X, User, Settings, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const MobileOptimizedHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const navItems = [
    { name: 'الرئيسية', href: '/' },
    { name: 'الخدمات', href: '#services' },
    { name: 'الأسعار', href: '#pricing' },
    { name: 'الشهادات', href: '#testimonials' },
    { name: 'الأسئلة', href: '#faq' },
    { name: 'الدعم', href: '/support' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              {isMobile ? (
                <Smartphone className="text-white h-4 w-4" />
              ) : (
                <span className="text-white font-bold text-lg">SM</span>
              )}
            </div>
            <span className={`font-bold text-gray-900 ${isMobile ? 'text-lg' : 'text-xl'}`}>
              {isMobile ? 'سوشيال' : 'سوشيال ميديا'}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 text-sm lg:text-base"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3 rtl:space-x-reverse">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-gray-700">
                <User className="h-4 w-4 ml-2" />
                تسجيل الدخول
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                ابدأ الآن
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 p-2"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-14 left-0 right-0 bg-white border-b shadow-lg animate-fade-in">
            <div className="px-3 py-4 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 hover:text-blue-600 font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-3 border-t space-y-2">
                <Link to="/login" className="block">
                  <Button variant="outline" size="sm" className="w-full">
                    تسجيل الدخول
                  </Button>
                </Link>
                <Link to="/register" className="block">
                  <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
                    ابدأ الآن
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default MobileOptimizedHeader;
