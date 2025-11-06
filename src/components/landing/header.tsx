'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';
import { useTranslation } from '@/hooks/use-translation';

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const st = window.pageYOffset;
      setScrolled(st > 10);
      if (st > lastY && st > 80) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      setLastY(st);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const progressEl = document.getElementById('scroll-progress');
    const updateScrollProgress = () => {
        const h = document.documentElement;
        const st = h.scrollTop || document.body.scrollTop;
        const sh = h.scrollHeight - h.clientHeight;
        if (progressEl) {
            progressEl.style.width = (sh ? (st / sh) * 100 : 0) + '%';
        }
    }
    window.addEventListener('scroll', updateScrollProgress);


    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', updateScrollProgress);
    }
  }, [lastY]);

  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const formElement = document.getElementById('book-appointment-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div id="scroll-progress" className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-400 z-[60]" style={{width: '0%'}}/>
      <header
        id="site-header"
        className={`fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-black/70 border-b transition-all duration-300 will-change-transform ${
          scrolled ? 'border-white/5' : 'border-transparent'
        } ${!headerVisible ? '-translate-y-full' : ''}`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
          <div className="h-full flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-md">
              <Image
                src="https://queensautoserviceselgin.com/wp-content/uploads/2024/11/Logo-White.webp"
                alt="Queens Auto Services Logo"
                width={160}
                height={40}
                className="h-10 w-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; 
                  target.src='https://placehold.co/200x50/0f172a/ffffff?text=Logo';
                }}
              />
            </Link>
            <div className="flex items-center gap-4">
              <div className="text-sm">
                <button
                  onClick={() => setLanguage('en')}
                  className={`transition-colors hover:text-cyan-400 ${
                    language === 'en' ? 'font-bold text-white' : 'text-slate-400'
                  }`}
                >
                  Eng
                </button>
                <span className="text-slate-500 mx-1">|</span>
                <button
                  onClick={() => setLanguage('es')}
                  className={`transition-colors hover:text-cyan-400 ${
                    language === 'es' ? 'font-bold text-white' : 'text-slate-400'
                  }`}
                >
                  Spa
                </button>
              </div>
              <a
                href="#book-appointment-form"
                onClick={scrollToForm}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-gray-100 text-black hover:bg-gray-200 transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                {t('bookNowNav')}
              </a>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
