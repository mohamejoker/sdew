
import { UITheme, UISettings } from '../types/ui-types';
import { defaultTheme, defaultSettings } from '../defaults/ui-defaults';

export const useUIControlActions = (
  setTheme: React.Dispatch<React.SetStateAction<UITheme>>,
  setSettings: React.Dispatch<React.SetStateAction<UISettings>>
) => {
  const updateTheme = (updates: Partial<UITheme>) => {
    setTheme(prev => ({ ...prev, ...updates }));
  };

  const updateSettings = (updates: Partial<UISettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const saveSettings = () => {
    setSettings(current => {
      localStorage.setItem('townmedia-ui-settings', JSON.stringify(current));
      console.log('Settings saved successfully');
      return current;
    });
  };

  return {
    updateTheme,
    updateSettings,
    resetTheme,
    resetSettings,
    saveSettings
  };
};
