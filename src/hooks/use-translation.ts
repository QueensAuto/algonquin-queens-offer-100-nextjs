'use client';

import { useLanguage } from '@/context/language-context';

export function useTranslation() {
  const { translations } = useLanguage();

  const t = (key: string) => {
    return translations[key] || key;
  };

  return { t };
}
