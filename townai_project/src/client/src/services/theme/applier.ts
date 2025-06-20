
import { CustomTheme } from './types';

export class ThemeApplier {
  static applyTheme(theme: CustomTheme): void {
    const root = document.documentElement;

    // تطبيق الألوان
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // تطبيق الطباعة
    root.style.setProperty('--font-family', theme.typography.fontFamily);
    Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
      root.style.setProperty(`--font-size-${key}`, value);
    });

    // تطبيق المسافات
    Object.entries(theme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });

    // تطبيق border radius
    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--border-radius-${key}`, value);
    });

    // تطبيق الظلال
    Object.entries(theme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });

    // تطبيق التخطيط
    Object.entries(theme.layout).forEach(([key, value]) => {
      root.style.setProperty(`--layout-${key}`, value);
    });

    // تطبيق الرسوم المتحركة
    root.style.setProperty('--animation-speed', this.getAnimationSpeed(theme.animations.speed));
    root.style.setProperty('--animation-easing', theme.animations.easing);
    
    if (theme.animations.enabled) {
      root.classList.add('animations-enabled');
    } else {
      root.classList.remove('animations-enabled');
    }
  }

  private static getAnimationSpeed(speed: 'slow' | 'normal' | 'fast'): string {
    switch (speed) {
      case 'slow': return '0.5s';
      case 'fast': return '0.15s';
      default: return '0.3s';
    }
  }

  static generatePreviewStyle(theme: CustomTheme): string {
    return `
      background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
      font-family: ${theme.typography.fontFamily};
      border-radius: ${theme.borderRadius.md};
    `;
  }
}
