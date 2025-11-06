'use client';

import { useTranslation } from '@/hooks/use-translation';
import { useState, useEffect } from 'react';

export default function StickyCta() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroSection = document.getElementById('hero-section');
    const scaleSection = document.getElementById('scale-section');
    const formSection = document.getElementById('book-appointment-form');
    const footer = document.querySelector('footer');

    if (!heroSection || !scaleSection || !formSection || !footer) return;
    
    let heroIsVisible = false;
    let scaleIsVisible = false;
    let formIsVisible = false;
    let footerIsVisible = false;

    const showStickyCta = () => {
        if (!heroIsVisible && !scaleIsVisible && !formIsVisible && !footerIsVisible) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };


    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target.id === 'hero-section') {
                heroIsVisible = entry.isIntersecting;
            }
            if (entry.target.id === 'scale-section') {
                scaleIsVisible = entry.isIntersecting;
            }
            if (entry.target.id === 'book-appointment-form') {
                formIsVisible = entry.isIntersecting;
            }
            if (entry.target.tagName === 'FOOTER') {
                footerIsVisible = entry.isIntersecting;
            }
        });
        showStickyCta();
    }, {
        root: null,
        threshold: 0.1
    });

    observer.observe(heroSection);
    observer.observe(scaleSection);
    observer.observe(formSection);
    observer.observe(footer);


    return () => {
        observer.disconnect();
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
    <div className="lg:hidden fixed bottom-6 left-0 right-0 z-40 flex justify-center pointer-events-none">
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
