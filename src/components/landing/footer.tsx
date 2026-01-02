
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/hooks/use-translation';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-20 py-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-8 opacity-50 hover:opacity-100 transition-opacity">
          <Image
            src="/images/Logo-White.webp"
            alt="Queens Auto Services Logo"
            width={120}
            height={30}
            className="h-8 w-auto grayscale"
          />
        </div>
        <div className="text-sm text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Queens Auto Service. All Rights Reserved. |{' '}
            <Link
              href="https://queensautoservices.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-cyan-400 transition-colors"
            >
              {t('privacyPolicy')}
            </Link>{' '}
            |{' '}
            <Link
              href="https://queensautoservices.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-cyan-400 transition-colors"
            >
              {t('termsOfUse')}
            </Link>
          </p>
          <p className="mt-2">2401 E Algonquin Rd, Algonquin, IL 60102</p>
        </div>
      </div>
    </footer>
  );
}

