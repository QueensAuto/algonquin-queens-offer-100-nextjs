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
      <Script src="https://fast.wistia.com/player.js" async />
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
              <wistia-player media-id="7759m49oox" aspect="1.7777777777777777"></wistia-player>
            </div>
            <div style={{ display: language === 'es' ? 'block' : 'none' }}>
              <div
                className="wistia_responsive_padding"
                style={{ padding: '56.25% 0 0 0', position: 'relative' }}
              >
                <div
                  className="wistia_responsive_wrapper"
                  style={{
                    height: '100%',
                    left: '0',
                    position: 'absolute',
                    top: '0',
                    width: '100%',
                  }}
                >
                  <div
                    className="wistia_embed wistia_async_u9od4mapw5 videoFoam=true"
                    style={{ height: '100%', position: 'relative', width: '100%' }}
                  >
                    &nbsp;
                  </div>
                </div>
              </div>
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