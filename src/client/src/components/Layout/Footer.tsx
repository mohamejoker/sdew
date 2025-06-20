
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  const quickLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'الخدمات', href: '#services' },
    { name: 'الأسعار', href: '#pricing' },
    { name: 'من نحن', href: '#about' },
    { name: 'اتصل بنا', href: '#contact' }
  ];

  const serviceLinks = [
    { name: 'متابعين Instagram', href: '#' },
    { name: 'متابعين TikTok', href: '#' },
    { name: 'متابعين YouTube', href: '#' },
    { name: 'متابعين Twitter', href: '#' },
    { name: 'متابعين Snapchat', href: '#' }
  ];

  const legalLinks = [
    { name: 'سياسة الخصوصية', href: '/privacy' },
    { name: 'الشروط والأحكام', href: '/terms' },
    { name: 'سياسة الاسترداد', href: '#refund' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">اشترك في النشرة الإخبارية</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            احصل على أحدث العروض والنصائح المجانية لتنمية حساباتك على وسائل التواصل الاجتماعي
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              اشتراك
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">TM</span>
                </div>
                <span className="text-xl font-bold">Town Media</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                منصة رائدة في تقديم خدمات تنمية وسائل التواصل الاجتماعي بجودة عالية وأسعار منافسة
              </p>
              <div className="flex space-x-4 rtl:space-x-reverse">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                      aria-label={social.label}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">روابط سريعة</h4>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">خدماتنا</h4>
              <ul className="space-y-4">
                {serviceLinks.map((service) => (
                  <li key={service.name}>
                    <a
                      href={service.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">تواصل معنا</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-400">info@townmediagroup.com</span>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Phone className="h-5 w-5 text-green-500" />
                  <span className="text-gray-400">+966 50 123 4567</span>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <MapPin className="h-5 w-5 text-red-500" />
                  <span className="text-gray-400">الرياض، المملكة العربية السعودية</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © {currentYear} Town Media Group. جميع الحقوق محفوظة.
            </p>
            <div className="flex space-x-6 rtl:space-x-reverse mt-4 md:mt-0">
              {legalLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.href} 
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
