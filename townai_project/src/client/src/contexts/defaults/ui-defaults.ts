
import { UITheme, UISettings } from '../types/ui-types';

export const defaultTheme: UITheme = {
  primaryColor: '#3B82F6',
  secondaryColor: '#1E40AF',
  backgroundColor: '#FFFFFF',
  textColor: '#1F2937',
  borderRadius: 8,
  fontSize: 16,
  fontFamily: 'Cairo, sans-serif',
  spacing: 'normal',
  animations: true,
  darkMode: false
};

export const defaultSettings: UISettings = {
  // Theme settings
  primaryColor: '#3B82F6',
  secondaryColor: '#1E40AF',
  backgroundColor: '#FFFFFF',
  textColor: '#1F2937',
  borderRadius: '8px',
  fontSize: '16px',
  fontFamily: 'Cairo',
  fontWeight: '400',
  lineHeight: '1.5',
  
  // Additional color settings
  accentColor: '#10B981',
  headerBackground: '#FFFFFF',
  footerBackground: '#1F2937',
  footerTextColor: '#F9FAFB',
  
  // Layout settings
  containerWidth: '1200px',
  shadowLevel: 'medium',
  headerHeight: '80px',
  logoSize: '180px',
  spacing: '1rem',
  
  // Background settings
  heroBackground: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  servicesBackground: '#F8FAFC',
  pricingBackground: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  
  // Content settings
  siteTitle: 'Town Media',
  siteDescription: 'منصة التسويق الرقمي الذكية',
  heroTitle: 'نمو ذكي لوسائل التواصل الاجتماعي',
  heroSubtitle: 'خدمات احترافية لزيادة متابعيك وتفاعلك على جميع منصات التواصل الاجتماعي',
  
  // Animation settings
  enableAnimations: true,
  animationSpeed: '300ms'
};
