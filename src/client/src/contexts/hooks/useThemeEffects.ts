
import React from 'react';
import { UITheme } from '../types/ui-types';

export const useThemeEffects = (theme: UITheme) => {
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--background-color', theme.backgroundColor);
    root.style.setProperty('--text-color', theme.textColor);
    root.style.setProperty('--border-radius', `${theme.borderRadius}px`);
    root.style.setProperty('--font-size', `${theme.fontSize}px`);
    root.style.setProperty('--font-family', theme.fontFamily);
    
    // Apply dark mode
    if (theme.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);
};
