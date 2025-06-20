
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UITheme, UISettings, UIControlContextType } from './types/ui-types';
import { defaultTheme, defaultSettings } from './defaults/ui-defaults';
import { useUIControlActions } from './hooks/useUIControlActions';
import { useThemeEffects } from './hooks/useThemeEffects';
import { stateManager } from '../services/state/stateManager';

const UIControlContext = createContext<UIControlContextType | undefined>(undefined);

export const UIControlProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<UITheme>(defaultTheme);
  const [settings, setSettings] = useState<UISettings>(defaultSettings);
  const [previewMode, setPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const {
    updateTheme,
    updateSettings,
    resetTheme,
    resetSettings,
    saveSettings
  } = useUIControlActions(setTheme, setSettings);

  useThemeEffects(theme);

  // تحميل الإعدادات المحفوظة عند بدء التطبيق
  useEffect(() => {
    const loadSavedSettings = () => {
      try {
        const saved = localStorage.getItem('townmedia-ui-settings');
        if (saved) {
          const parsed = JSON.parse(saved);
          setSettings(parsed);
          setLastSaved(new Date(parsed.lastSaved || Date.now()));
        }
      } catch (error) {
        console.error('خطأ في تحميل الإعدادات:', error);
      }
    };

    loadSavedSettings();
  }, []);

  // حفظ تلقائي للإعدادات
  useEffect(() => {
    const autoSave = () => {
      if (lastSaved && Date.now() - lastSaved.getTime() > 30000) { // كل 30 ثانية
        saveSettings();
        setLastSaved(new Date());
      }
    };

    const interval = setInterval(autoSave, 30000);
    return () => clearInterval(interval);
  }, [lastSaved, saveSettings]);

  // مزامنة الحالة مع الـ state manager
  useEffect(() => {
    stateManager.setState('currentTheme', theme);
    stateManager.setState('currentSettings', settings);
    stateManager.setState('previewMode', previewMode);
  }, [theme, settings, previewMode]);

  // Enhanced save function
  const enhancedSaveSettings = async () => {
    setIsLoading(true);
    try {
      const settingsWithMetadata = {
        ...settings,
        lastSaved: new Date().toISOString(),
        version: '2.0',
        deviceInfo: {
          userAgent: navigator.userAgent,
          screenResolution: `${screen.width}x${screen.height}`,
          timestamp: Date.now()
        }
      };
      
      localStorage.setItem('townmedia-ui-settings', JSON.stringify(settingsWithMetadata));
      setLastSaved(new Date());
      
      // إشعار نجاح الحفظ
      stateManager.setState('lastSaveStatus', 'success');
      
      console.log('تم حفظ الإعدادات بنجاح');
    } catch (error) {
      console.error('خطأ في حفظ الإعدادات:', error);
      stateManager.setState('lastSaveStatus', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced update functions
  const enhancedUpdateTheme = (updates: Partial<UITheme>) => {
    updateTheme(updates);
    if (previewMode) {
      // في وضع المعاينة، احفظ مؤقتاً
      sessionStorage.setItem('preview-theme', JSON.stringify({ ...theme, ...updates }));
    }
  };

  const enhancedUpdateSettings = (updates: Partial<UISettings>) => {
    updateSettings(updates);
    if (previewMode) {
      // في وضع المعاينة، احفظ مؤقتاً
      sessionStorage.setItem('preview-settings', JSON.stringify({ ...settings, ...updates }));
    }
  };

  // Export/Import functions
  const exportConfiguration = () => {
    const config = {
      theme,
      settings,
      metadata: {
        exportedAt: new Date().toISOString(),
        version: '2.0',
        appVersion: '1.0.0'
      }
    };
    
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `townmedia-config-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importConfiguration = (configFile: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target?.result as string);
        if (config.theme) setTheme(config.theme);
        if (config.settings) setSettings(config.settings);
        console.log('تم استيراد التكوين بنجاح');
      } catch (error) {
        console.error('خطأ في استيراد التكوين:', error);
      }
    };
    reader.readAsText(configFile);
  };

  const value = {
    theme,
    settings,
    updateTheme: enhancedUpdateTheme,
    updateSettings: enhancedUpdateSettings,
    resetTheme,
    resetSettings,
    saveSettings: enhancedSaveSettings,
    previewMode,
    setPreviewMode,
    isLoading,
    lastSaved,
    exportConfiguration,
    importConfiguration
  };

  return (
    <UIControlContext.Provider value={value}>
      <div 
        className={`transition-all duration-300 ${theme.animations ? 'animate-fade-in' : ''}`}
        style={{
          fontFamily: theme.fontFamily,
          fontSize: theme.fontSize,
          '--spacing-multiplier': theme.spacing === 'compact' ? '0.75' : theme.spacing === 'comfortable' ? '1.25' : '1',
          '--primary-color': theme.primaryColor,
          '--secondary-color': theme.secondaryColor,
          '--background-color': theme.backgroundColor,
          '--text-color': theme.textColor
        } as React.CSSProperties}
      >
        {children}
      </div>
    </UIControlContext.Provider>
  );
};

export const useUIControl = () => {
  const context = useContext(UIControlContext);
  if (context === undefined) {
    throw new Error('useUIControl must be used within a UIControlProvider');
  }
  return context;
};
