'use client';

import { useTranslation } from '@/hooks/use-translation';
import { useState, useEffect } from 'react';

export default function StickyCta() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If hero is NOT intersecting (i.e., scrolled past), show sticky CTA
        setVisible(!entry.isIntersecting);
      },
      { rootMargin: "-200px 0px 0px 0px" } // trigger when hero is 200px off screen from top
    );

    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection);
      }
    };
  }, []);

  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const formElement = document.getElementById('book-appointment-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4 flex justify-center pointer-events-none">
      <a
        href="#book-appointment-form"
        onClick={scrollToForm}
        className={`pointer-events-auto cta-button inline-flex items-center justify-center h-14 px-8 rounded-full text-white text-lg font-bold shadow-2xl shadow-cyan-500/50 transition-all duration-500 ease-in-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
        }`}
      >
        {t('heroCTA')}
      </a>
    </div>
  );
}
