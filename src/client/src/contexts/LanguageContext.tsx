
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations = {
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.pricing': 'الأسعار',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.dashboard': 'لوحة التحكم',
    'nav.admin': 'الإدارة',
    
    // Hero Section
    'hero.title': 'نمو ذكي لوسائل التواصل الاجتماعي',
    'hero.subtitle': 'خدمات احترافية لزيادة متابعيك وتفاعلك على جميع منصات التواصل الاجتماعي',
    'hero.cta': 'ابدأ الآن',
    'hero.learn_more': 'اعرف المزيد',
    
    // Services
    'services.title': 'خدماتنا المتميزة',
    'services.followers': 'زيادة المتابعين',
    'services.engagement': 'زيادة التفاعل',
    'services.views': 'زيادة المشاهدات',
    'services.management': 'إدارة الحسابات',
    
    // AI Features
    'ai.title': 'الذكاء الاصطناعي',
    'ai.subtitle': 'مساعد ذكي لتطوير استراتيجياتك التسويقية',
    'ai.chat': 'محادثة مع الذكاء الاصطناعي',
    'ai.analysis': 'تحليل المحتوى',
    'ai.strategy': 'إنشاء استراتيجيات',
    'ai.content': 'توليد المحتوى',
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.overview': 'نظرة عامة',
    'dashboard.stats': 'الإحصائيات',
    'dashboard.reports': 'التقارير',
    'dashboard.settings': 'الإعدادات',
    'dashboard.users': 'المستخدمون',
    'dashboard.analytics': 'التحليلات',
    'dashboard.security': 'الأمان',
    'dashboard.performance': 'الأداء',
    
    // Forms
    'form.name': 'الاسم',
    'form.email': 'البريد الإلكتروني',
    'form.password': 'كلمة المرور',
    'form.confirm_password': 'تأكيد كلمة المرور',
    'form.phone': 'رقم الهاتف',
    'form.message': 'الرسالة',
    'form.submit': 'إرسال',
    'form.login': 'تسجيل الدخول',
    'form.register': 'إنشاء حساب',
    'form.logout': 'تسجيل الخروج',
    
    // Payment
    'payment.title': 'الدفع',
    'payment.method': 'طريقة الدفع',
    'payment.amount': 'المبلغ',
    'payment.vodafone': 'فودافون كاش',
    'payment.instapay': 'انستاباي',
    'payment.bank': 'تحويل بنكي',
    'payment.success': 'تم الدفع بنجاح',
    'payment.failed': 'فشل في الدفع',
    
    // Mobile
    'mobile.title': 'تطبيق الهاتف المحمول',
    'mobile.download': 'تحميل التطبيق',
    'mobile.install': 'تثبيت التطبيق',
    'mobile.features': 'مميزات التطبيق',
    'mobile.performance': 'أداء سريع',
    'mobile.offline': 'يعمل بدون إنترنت',
    
    // Security
    'security.title': 'الأمان',
    'security.alerts': 'التنبيهات الأمنية',
    'security.login_attempts': 'محاولات الدخول',
    'security.blocked_ips': 'العناوين المحظورة',
    'security.audit_log': 'سجل المراجعة',
    
    // Reports
    'reports.title': 'التقارير',
    'reports.generate': 'إنشاء تقرير',
    'reports.export': 'تصدير',
    'reports.sales': 'تقرير المبيعات',
    'reports.performance': 'تقرير الأداء',
    'reports.users': 'تقرير المستخدمين',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.add': 'إضافة',
    'common.search': 'بحث...',
    'common.filter': 'فلترة',
    'common.export': 'تصدير',
    'common.import': 'استيراد',
    'common.yes': 'نعم',
    'common.no': 'لا',
    'common.confirm': 'تأكيد',
    'common.success': 'تم بنجاح',
    'common.error': 'حدث خطأ',
    'common.warning': 'تحذير',
    'common.info': 'معلومات',
    'common.view': 'عرض',
    'common.download': 'تحميل',
    'common.upload': 'رفع',
    'common.back': 'رجوع',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.close': 'إغلاق',
    'common.open': 'فتح'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.pricing': 'Pricing',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.dashboard': 'Dashboard',
    'nav.admin': 'Admin',
    
    // Hero Section
    'hero.title': 'Smart Social Media Growth',
    'hero.subtitle': 'Professional services to boost your followers and engagement across all social media platforms',
    'hero.cta': 'Get Started',
    'hero.learn_more': 'Learn More',
    
    // Services
    'services.title': 'Our Premium Services',
    'services.followers': 'Increase Followers',
    'services.engagement': 'Boost Engagement',
    'services.views': 'Increase Views',
    'services.management': 'Account Management',
    
    // AI Features
    'ai.title': 'Artificial Intelligence',
    'ai.subtitle': 'Smart assistant for developing your marketing strategies',
    'ai.chat': 'Chat with AI',
    'ai.analysis': 'Content Analysis',
    'ai.strategy': 'Create Strategies',
    'ai.content': 'Generate Content',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.overview': 'Overview',
    'dashboard.stats': 'Statistics',
    'dashboard.reports': 'Reports',
    'dashboard.settings': 'Settings',
    'dashboard.users': 'Users',
    'dashboard.analytics': 'Analytics',
    'dashboard.security': 'Security',
    'dashboard.performance': 'Performance',
    
    // Forms
    'form.name': 'Name',
    'form.email': 'Email',
    'form.password': 'Password',
    'form.confirm_password': 'Confirm Password',
    'form.phone': 'Phone Number',
    'form.message': 'Message',
    'form.submit': 'Submit',
    'form.login': 'Login',
    'form.register': 'Register',
    'form.logout': 'Logout',
    
    // Payment
    'payment.title': 'Payment',
    'payment.method': 'Payment Method',
    'payment.amount': 'Amount',
    'payment.vodafone': 'Vodafone Cash',
    'payment.instapay': 'InstaPay',
    'payment.bank': 'Bank Transfer',
    'payment.success': 'Payment Successful',
    'payment.failed': 'Payment Failed',
    
    // Mobile
    'mobile.title': 'Mobile App',
    'mobile.download': 'Download App',
    'mobile.install': 'Install App',
    'mobile.features': 'App Features',
    'mobile.performance': 'Fast Performance',
    'mobile.offline': 'Works Offline',
    
    // Security
    'security.title': 'Security',
    'security.alerts': 'Security Alerts',
    'security.login_attempts': 'Login Attempts',
    'security.blocked_ips': 'Blocked IPs',
    'security.audit_log': 'Audit Log',
    
    // Reports
    'reports.title': 'Reports',
    'reports.generate': 'Generate Report',
    'reports.export': 'Export',
    'reports.sales': 'Sales Report',
    'reports.performance': 'Performance Report',
    'reports.users': 'Users Report',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.search': 'Search...',
    'common.filter': 'Filter',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.confirm': 'Confirm',
    'common.success': 'Success',
    'common.error': 'Error',
    'common.warning': 'Warning',
    'common.info': 'Information',
    'common.view': 'View',
    'common.download': 'Download',
    'common.upload': 'Upload',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.close': 'Close',
    'common.open': 'Open'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage for saved language preference
    const saved = localStorage.getItem('language') as Language;
    return saved || 'ar';
  });

  // Save language preference to localStorage
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    
    // Update document direction and class
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.body.className = lang === 'ar' ? 'font-arabic' : 'font-english';
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  // Set initial direction and language
  React.useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.body.className = language === 'ar' ? 'font-arabic' : 'font-english';
  }, [language]);

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className={language === 'ar' ? 'font-arabic' : 'font-english'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
