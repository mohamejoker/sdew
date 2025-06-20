
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { configManager } from '@/services/config/configManager';

interface AppState {
  isLoading: boolean;
  hasError: boolean;
  error?: string;
  apiStatus: {
    hasValidAPI: boolean;
    activeProviders: number;
    totalProviders: number;
  };
  userPreferences: {
    theme: 'light' | 'dark' | 'auto';
    language: 'ar' | 'en';
    notifications: boolean;
  };
}

type AppAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'UPDATE_API_STATUS'; payload: AppState['apiStatus'] }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<AppState['userPreferences']> };

const initialState: AppState = {
  isLoading: false,
  hasError: false,
  apiStatus: {
    hasValidAPI: false,
    activeProviders: 0,
    totalProviders: 3
  },
  userPreferences: {
    theme: 'auto',
    language: 'ar',
    notifications: true
  }
};

const StateContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

function stateReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, hasError: true, error: action.payload, isLoading: false };
    case 'CLEAR_ERROR':
      return { ...state, hasError: false, error: undefined };
    case 'UPDATE_API_STATUS':
      return { ...state, apiStatus: action.payload };
    case 'UPDATE_PREFERENCES':
      return { 
        ...state, 
        userPreferences: { ...state.userPreferences, ...action.payload }
      };
    default:
      return state;
  }
}

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
    // تهيئة المدير
    configManager.initialize();
    
    // تحديث حالة API
    const updateAPIStatus = () => {
      const status = configManager.getAppStatus();
      dispatch({
        type: 'UPDATE_API_STATUS',
        payload: {
          hasValidAPI: status.hasValidAPI,
          activeProviders: status.activeProviders,
          totalProviders: status.totalProviders
        }
      });
    };

    updateAPIStatus();
    
    // تحديث التفضيلات من التخزين المحلي
    const preferences = {
      theme: configManager.get('theme', 'auto') as 'light' | 'dark' | 'auto',
      language: configManager.get('language', 'ar') as 'ar' | 'en',
      notifications: configManager.get('notifications', true)
    };
    
    dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });

    // الاستماع للتغييرات
    configManager.onChange('api_status', updateAPIStatus);
  }, []);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useAppState must be used within StateProvider');
  }
  return context;
};
