'use client';

import { useLanguage } from '@/context/language-context';

type Replacements = { [key: string]: string | number };

export function useTranslation() {
  const { translations } = useLanguage();

  const t = (key: string, replacements?: Replacements) => {
    let translation = translations[key] || key;
    if (replacements) {
        Object.keys(replacements).forEach(rKey => {
            translation = translation.replace(new RegExp(`{{${rKey}}}`, 'g'), String(replacements[rKey]));
        });
    }
    return translation;
  };

  return { t };
}

    