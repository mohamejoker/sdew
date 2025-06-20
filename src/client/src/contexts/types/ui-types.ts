
export interface UITheme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
  fontSize: number;
  fontFamily: string;
  spacing: 'compact' | 'normal' | 'comfortable';
  animations: boolean;
  darkMode: boolean;
}

export interface UISettings {
  // Theme settings
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  
  // Additional color settings
  accentColor: string;
  headerBackground: string;
  footerBackground: string;
  footerTextColor: string;
  
  // Layout settings
  containerWidth: string;
  shadowLevel: string;
  headerHeight: string;
  logoSize: string;
  spacing: string;
  
  // Background settings
  heroBackground: string;
  servicesBackground: string;
  pricingBackground: string;
  
  // Content settings
  siteTitle: string;
  siteDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  
  // Animation settings
  enableAnimations: boolean;
  animationSpeed: string;
}

export interface UIControlContextType {
  theme: UITheme;
  settings: UISettings;
  updateTheme: (updates: Partial<UITheme>) => void;
  updateSettings: (updates: Partial<UISettings>) => void;
  resetTheme: () => void;
  resetSettings: () => void;
  saveSettings: () => void;
  previewMode: boolean;
  setPreviewMode: (preview: boolean) => void;
  isLoading?: boolean;
  lastSaved?: Date | null;
  exportConfiguration?: () => void;
  importConfiguration?: (file: File) => void;
}

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
  };
  layout: {
    borderRadius: string;
    spacing: string;
    containerWidth: string;
  };
  isDefault?: boolean;
  isCustom?: boolean;
  createdAt?: string;
  author?: string;
}

export interface ComponentStyle {
  name: string;
  key: string;
  styles: {
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    borderRadius?: string;
    padding?: string;
    margin?: string;
    shadow?: string;
  };
}

export interface ResponsiveSettings {
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  enabled: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
}
