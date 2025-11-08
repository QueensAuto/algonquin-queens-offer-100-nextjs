'use client';
import { useTranslation } from '@/hooks/use-translation';
import { useLanguage } from '@/context/language-context';
import Script from 'next/script';
import { Sparkles } from 'lucide-react';
import React from 'react';

export default function Hero() {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const formElement = document.getElementById('book-appointment-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Script src="https://fast.wistia.com/embed/dpxrr6otfn.js" async type="module" strategy="lazyOnload"></Script>
      <Script src="https://fast.wistia.com/embed/7759m49oox.js" async type="module" strategy="lazyOnload"></Script>
      <style dangerouslySetInnerHTML={{__html: `
        wistia-player[media-id='dpxrr6otfn']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/dpxrr6otfn/swatch'); display: block; filter: blur(5px); padding-top:56.25%; }
        wistia-player[media-id='7759m49oox']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/7759m49oox/swatch'); display: block; filter: blur(5px); padding-top:56.25%; }
      `}}></style>

      <section
        id="hero-section"
        className="relative text-center pt-28 pb-20 sm:pt-24 sm:pb-20 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {t('heroTitlePre')}
            </span>{' '}
            {t('heroTitlePost')}
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
            {t('heroSubtitle')}
          </p>
          <p className="mt-4 text-base text-cyan-400 font-semibold max-w-2xl mx-auto flex items-center justify-center gap-2" dangerouslySetInnerHTML={{ __html: t('heroOffer') || '' }}>
          </p>

          <div className="mt-12 max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border-2 border-slate-800">
            <div style={{ display: language === 'en' ? 'block' : 'none' }}>
              <wistia-player media-id="dpxrr6otfn" aspect="1.7777777777777777"></wistia-player>
            </div>
            <div style={{ display: language === 'es' ? 'block' : 'none' }}>
               <wistia-player media-id="7759m49oox" aspect="1.7777777777777777"></wistia-player>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="#book-appointment-form"
              onClick={scrollToForm}
              className="cta-button inline-flex items-center justify-center h-14 px-10 rounded-full text-white text-lg font-bold w-full sm:w-auto"
            >
              {t('heroCTA')}
            </a>
            <p className="mt-2 text-xs text-slate-400">
              {t('ctaUrgency')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
