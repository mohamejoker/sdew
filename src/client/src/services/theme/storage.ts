
import { CustomTheme } from './types';

export class ThemeStorage {
  private static readonly THEMES_KEY = 'smm_themes';
  private static readonly ACTIVE_THEME_KEY = 'smm_active_theme';

  static saveThemes(themes: CustomTheme[]): void {
    try {
      localStorage.setItem(this.THEMES_KEY, JSON.stringify(themes));
    } catch (error) {
      console.error('خطأ في حفظ الثيمات:', error);
    }
  }

  static loadThemes(): CustomTheme[] | null {
    try {
      const stored = localStorage.getItem(this.THEMES_KEY);
      if (stored) {
        const themes = JSON.parse(stored);
        return themes.map((theme: any) => ({
          ...theme,
          createdAt: new Date(theme.createdAt),
          updatedAt: new Date(theme.updatedAt)
        }));
      }
      return null;
    } catch (error) {
      console.error('خطأ في تحميل الثيمات:', error);
      return null;
    }
  }

  static saveActiveThemeId(themeId: string): void {
    try {
      localStorage.setItem(this.ACTIVE_THEME_KEY, themeId);
    } catch (error) {
      console.error('خطأ في حفظ ID الثيم النشط:', error);
    }
  }

  static loadActiveThemeId(): string | null {
    try {
      return localStorage.getItem(this.ACTIVE_THEME_KEY);
    } catch (error) {
      console.error('خطأ في تحميل ID الثيم النشط:', error);
      return null;
    }
  }

  static clearStorage(): void {
    try {
      localStorage.removeItem(this.THEMES_KEY);
      localStorage.removeItem(this.ACTIVE_THEME_KEY);
    } catch (error) {
      console.error('خطأ في مسح بيانات الثيمات:', error);
    }
  }
}
