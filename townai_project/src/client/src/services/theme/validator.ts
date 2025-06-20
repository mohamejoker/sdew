
import { CustomTheme } from './types';

export class ThemeValidator {
  static validateThemeData(themeData: any): string | null {
    if (!themeData.name || typeof themeData.name !== 'string') {
      return 'اسم الثيم مطلوب ويجب أن يكون نصاً';
    }

    if (!themeData.colors || typeof themeData.colors !== 'object') {
      return 'ألوان الثيم مطلوبة';
    }

    const requiredColors = ['primary', 'secondary', 'accent', 'background', 'text'];
    for (const color of requiredColors) {
      if (!themeData.colors[color] || !this.isValidColor(themeData.colors[color])) {
        return `لون ${color} غير صحيح`;
      }
    }

    if (!themeData.typography || typeof themeData.typography !== 'object') {
      return 'إعدادات الطباعة مطلوبة';
    }

    return null;
  }

  static validateTheme(theme: CustomTheme): string[] {
    const errors: string[] = [];

    if (!theme.id) errors.push('معرف الثيم مطلوب');
    if (!theme.name) errors.push('اسم الثيم مطلوب');
    
    // التحقق من الألوان
    const requiredColors = ['primary', 'secondary', 'accent', 'background', 'text'];
    for (const color of requiredColors) {
      if (!theme.colors[color] || !this.isValidColor(theme.colors[color])) {
        errors.push(`لون ${color} غير صحيح`);
      }
    }

    // التحقق من الخطوط
    if (!theme.typography.fontFamily) {
      errors.push('عائلة الخط مطلوبة');
    }

    return errors;
  }

  private static isValidColor(color: string): boolean {
    const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return colorRegex.test(color);
  }

  static sanitizeThemeData(themeData: any): any {
    return {
      name: this.sanitizeString(themeData.name),
      description: this.sanitizeString(themeData.description || ''),
      colors: this.sanitizeColors(themeData.colors),
      typography: this.sanitizeTypography(themeData.typography),
      spacing: themeData.spacing || {},
      borderRadius: themeData.borderRadius || {},
      shadows: themeData.shadows || {},
      animations: themeData.animations || { enabled: true, speed: 'normal', easing: 'ease' },
      layout: themeData.layout || {}
    };
  }

  private static sanitizeString(str: string): string {
    return str.trim().replace(/[<>]/g, '');
  }

  private static sanitizeColors(colors: any): any {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(colors)) {
      if (typeof value === 'string' && this.isValidColor(value)) {
        sanitized[key] = value;
      }
    }
    return sanitized;
  }

  private static sanitizeTypography(typography: any): any {
    return {
      fontFamily: this.sanitizeString(typography.fontFamily || 'Inter, sans-serif'),
      fontSize: typography.fontSize || {},
      fontWeight: typography.fontWeight || {},
      lineHeight: typography.lineHeight || {}
    };
  }
}
