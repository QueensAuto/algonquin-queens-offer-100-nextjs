'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());
  const { t } = useTranslation();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="mt-20 py-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm text-slate-400">
        <p>
          &copy; {year} Queens Auto Service. All Rights Reserved. |{' '}
          <Link
            href="#"
            target="_blank"
            className="text-slate-300 hover:text-cyan-400 transition-colors"
          >
            {t('privacyPolicy')}
          </Link>{' '}
          |{' '}
          <Link
            href="#"
            target="_blank"
            className="text-slate-300 hover:text-cyan-400 transition-colors"
          >
            {t('termsOfUse')}
          </Link>
        </p>
        <p className="mt-2">{t('address')}</p>
      </div>
    </footer>
  );
}
