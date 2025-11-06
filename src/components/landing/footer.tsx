'use client';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-20 py-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm text-slate-400">
        <p>
          &copy; {new Date().getFullYear()} Queens Auto Service. All Rights Reserved. |{' '}
          <Link
            href="https://queensautoserviceselgin.com/privacy-policy/"
            target="_blank"
            className="text-slate-300 hover:text-cyan-400 transition-colors"
          >
            {t('privacyPolicy')}
          </Link>{' '}
          |{' '}
          <Link
            href="https://queensautoserviceselgin.com/terms-of-use/"
            target="_blank"
            className="text-slate-300 hover:text-cyan-400 transition-colors"
          >
            {t('termsOfUse')}
          </Link>
        </p>
        <p className="mt-2">1303 Dundee Ave, Elgin, IL 60120</p>
      </div>
    </footer>
  );
}
