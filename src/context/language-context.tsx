'use client';

import { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { translations } from '@/lib/translations';
import { WistiaAPI } from '@/types/wistia';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Record<string, any>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

declare global {
  interface Window {
    Wistia?: WistiaAPI;
    _wq?: any[];
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguageState(savedLanguage);
      document.documentElement.lang = savedLanguage;
    } else {
      document.documentElement.lang = 'en';
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferredLanguage', lang);
    document.documentElement.lang = lang;

    // Use Wistia's queue to pause the other commercial when switching
    window._wq = window._wq || [];
    if (lang === 'es') {
      window._wq.push({
        id: 'dpxrr6otfn',
        onReady: (video: any) => video.pause()
      });
    } else {
      window._wq.push({
        id: '7759m49oox',
        onReady: (video: any) => video.pause()
      });
    }
  }, []);

  const value = {
    language,
    setLanguage,
    translations: translations[language] || translations.en,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
