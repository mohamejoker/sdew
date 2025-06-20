
import { CustomTheme } from './types';

export const createDefaultTheme = (): CustomTheme => ({
  id: 'default',
  name: 'الثيم الافتراضي',
  description: 'الثيم الأساسي للموقع',
  colors: {
    primary: '#3B82F6',
    secondary: '#8B5CF6', 
    accent: '#10B981',
    background: '#FFFFFF',
    surface: '#F8FAFC',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6'
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75
    }
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
    '3xl': '6rem'
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
  },
  animations: {
    enabled: true,
    speed: 'normal',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },
  layout: {
    containerMaxWidth: '1200px',
    sidebarWidth: '250px',
    headerHeight: '70px',
    footerHeight: '80px'
  },
  isActive: true,
  isDefault: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

export const createDarkTheme = (): CustomTheme => {
  const defaultTheme = createDefaultTheme();
  return {
    ...defaultTheme,
    id: 'dark',
    name: 'الثيم المظلم',
    description: 'ثيم مظلم مريح للعينين',
    colors: {
      primary: '#60A5FA',
      secondary: '#A78BFA',
      accent: '#34D399',
      background: '#111827',
      surface: '#1F2937',
      text: '#F9FAFB',
      textSecondary: '#D1D5DB',
      border: '#374151',
      success: '#34D399',
      warning: '#FBBF24',
      error: '#F87171',
      info: '#60A5FA'
    },
    isActive: false,
    isDefault: false
  };
};
