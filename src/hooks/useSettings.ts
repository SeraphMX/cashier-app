import { useState, useCallback, useEffect } from 'react';
import { Settings } from '../types/settings';

const STORAGE_KEY = 'app_settings';

const DEFAULT_SETTINGS: Settings = {
  testMode: false,
  profile: 'cashier',
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const updateSettings = useCallback((newSettings: Settings) => {
    setSettings(newSettings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
  }, []);

  const clearAllData = useCallback(() => {
    // Clear all localStorage data
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      localStorage.removeItem(key);
    });

    // Reset settings to default
    setSettings(DEFAULT_SETTINGS);
    
    // Reload the page to reset all states
    window.location.reload();
  }, []);

  return {
    settings,
    updateSettings,
    clearAllData,
  };
};