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
    
    const wistiaEnContainer = document.getElementById('wistia-en-container');
    const wistiaEsContainer = document.getElementById('wistia-es-container');

    if (lang === 'es') {
        if(wistiaEnContainer) wistiaEnContainer.classList.add('hidden');
        if(wistiaEsContainer) wistiaEsContainer.classList.remove('hidden');
        if (window.Wistia && window.Wistia.api) { 
            const enVideo = window.Wistia.api('7759m49oox'); 
            if (enVideo) enVideo.pause(); 
        }
    } else {
        if(wistiaEnContainer) wistiaEnContainer.classList.remove('hidden');
        if(wistiaEsContainer) wistiaEsContainer.classList.add('hidden');
        if (window.Wistia && window.Wistia.api) { 
            const esVideo = window.Wistia.api('u9od4mapw5'); 
            if (esVideo) esVideo.pause(); 
        }
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
