
import { CustomTheme } from './types';
import { createDefaultTheme, createDarkTheme } from './defaults';
import { ThemeStorage } from './storage';
import { ThemeApplier } from './applier';
import { ThemeValidator } from './validator';

export class ThemeManager {
  private themes: CustomTheme[] = [];
  private activeThemeId: string | null = null;

  constructor() {
    this.initializeThemes();
    this.loadFromStorage();
    this.applyActiveTheme();
  }

  private initializeThemes(): void {
    this.themes = [createDefaultTheme(), createDarkTheme()];
  }

  createTheme(themeData: Omit<CustomTheme, 'id' | 'createdAt' | 'updatedAt' | 'isActive' | 'isDefault'>): CustomTheme {
    const validationError = ThemeValidator.validateThemeData(themeData);
    if (validationError) {
      throw new Error(validationError);
    }

    const newTheme: CustomTheme = {
      ...themeData,
      id: this.generateId(),
      isActive: false,
      isDefault: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.themes.push(newTheme);
    this.saveToStorage();
    return newTheme;
  }

  updateTheme(id: string, updates: Partial<Omit<CustomTheme, 'id' | 'createdAt'>>): CustomTheme | null {
    const themeIndex = this.themes.findIndex(t => t.id === id);
    if (themeIndex === -1) return null;

    this.themes[themeIndex] = {
      ...this.themes[themeIndex],
      ...updates,
      updatedAt: new Date()
    };

    this.saveToStorage();
    
    if (this.themes[themeIndex].isActive) {
      this.applyTheme(id);
    }

    return this.themes[themeIndex];
  }

  deleteTheme(id: string): boolean {
    const theme = this.themes.find(t => t.id === id);
    if (!theme || theme.isDefault) {
      return false;
    }

    if (theme.isActive) {
      this.activateTheme('default');
    }

    this.themes = this.themes.filter(t => t.id !== id);
    this.saveToStorage();
    return true;
  }

  activateTheme(id: string): boolean {
    const theme = this.themes.find(t => t.id === id);
    if (!theme) return false;

    this.themes.forEach(t => t.isActive = false);
    theme.isActive = true;
    this.activeThemeId = id;

    this.saveToStorage();
    this.applyTheme(id);
    return true;
  }

  private applyTheme(id: string): void {
    const theme = this.themes.find(t => t.id === id);
    if (theme) {
      ThemeApplier.applyTheme(theme);
    }
  }

  getThemes(): CustomTheme[] {
    return [...this.themes];
  }

  getTheme(id: string): CustomTheme | null {
    return this.themes.find(t => t.id === id) || null;
  }

  getActiveTheme(): CustomTheme | null {
    return this.themes.find(t => t.isActive) || null;
  }

  duplicateTheme(id: string): CustomTheme | null {
    const originalTheme = this.getTheme(id);
    if (!originalTheme) return null;

    const duplicatedTheme = {
      ...originalTheme,
      id: this.generateId(),
      name: `${originalTheme.name} (نسخة)`,
      isActive: false,
      isDefault: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.themes.push(duplicatedTheme);
    this.saveToStorage();
    return duplicatedTheme;
  }

  importTheme(themeJson: string): CustomTheme {
    try {
      const themeData = JSON.parse(themeJson);
      return this.createTheme({
        ...themeData,
        name: `${themeData.name} (مستورد)`,
        description: themeData.description || 'ثيم مستورد'
      });
    } catch (error) {
      throw new Error('صيغة الثيم غير صحيحة');
    }
  }

  exportTheme(id: string): string | null {
    const theme = this.getTheme(id);
    if (!theme) return null;

    const exportData = {
      name: theme.name,
      description: theme.description,
      colors: theme.colors,
      typography: theme.typography,
      spacing: theme.spacing,
      borderRadius: theme.borderRadius,
      shadows: theme.shadows,
      animations: theme.animations,
      layout: theme.layout
    };

    return JSON.stringify(exportData, null, 2);
  }

  private applyActiveTheme(): void {
    const activeTheme = this.getActiveTheme();
    if (activeTheme) {
      this.applyTheme(activeTheme.id);
    }
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private saveToStorage(): void {
    ThemeStorage.saveThemes(this.themes);
    if (this.activeThemeId) {
      ThemeStorage.saveActiveThemeId(this.activeThemeId);
    }
  }

  private loadFromStorage(): void {
    const loadedThemes = ThemeStorage.loadThemes();
    if (loadedThemes) {
      loadedThemes.forEach((theme: CustomTheme) => {
        const existingIndex = this.themes.findIndex(t => t.id === theme.id);
        if (existingIndex >= 0) {
          this.themes[existingIndex] = theme;
        } else {
          this.themes.push(theme);
        }
      });
    }

    const activeThemeId = ThemeStorage.loadActiveThemeId();
    if (activeThemeId && this.themes.find(t => t.id === activeThemeId)) {
      this.activeThemeId = activeThemeId;
      this.themes.forEach(t => t.isActive = t.id === activeThemeId);
    }
  }
}

export const themeManager = new ThemeManager();
