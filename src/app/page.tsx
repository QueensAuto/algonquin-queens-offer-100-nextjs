'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import SavingsCalculator from '@/components/landing/savings-calculator';
import CouponInfo from '@/components/landing/coupon-info';
import Bonuses from '@/components/landing/bonuses';
import HowItWorks from '@/components/landing/how-it-works';
import BookingForm from '@/components/landing/booking-form';
import Testimonials from '@/components/landing/testimonials';
import About from '@/components/landing/about';
import Faq from '@/components/landing/faq';
import ServiceArea from '@/components/landing/service-area';
import Footer from '@/components/landing/footer';
import DisclaimerModal from '@/components/landing/disclaimer-modal';
import ExitIntentModal from '@/components/landing/exit-intent-modal';
import StickyCta from '@/components/landing/sticky-cta';
import { useTranslation } from '@/hooks/use-translation';

export default function Home() {
  const { t } = useTranslation();
  const [isDisclaimerOpen, setDisclaimerOpen] = useState(false);
  const [isExitIntentOpen, setExitIntentOpen] = useState(false);
  const popupShown = useRef(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !popupShown.current) {
        setExitIntentOpen(true);
        popupShown.current = true;
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          style={{ animation: 'blob-anim 15s infinite alternate' }}
        ></div>
        <div
          className="absolute top-40 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          style={{ animation: 'blob-anim 20s infinite alternate-reverse' }}
        ></div>
        <div
          className="absolute -bottom-20 left-1/3 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          style={{ animation: 'blob-anim 25s infinite alternate' }}
        ></div>
      </div>
      <div className="relative overflow-x-hidden">
        <Header />
        <main>
          <Hero />
          <SavingsCalculator onDetailsClick={() => setDisclaimerOpen(true)} />
          <CouponInfo />
          <Bonuses />
          <HowItWorks />
          <BookingForm />
          <Testimonials />
          <About />
          <Faq />
          <ServiceArea />
        </main>
        <StickyCta />
        <Footer />
        <DisclaimerModal
          isOpen={isDisclaimerOpen}
          onOpenChange={setDisclaimerOpen}
        />
        <ExitIntentModal
          isOpen={isExitIntentOpen}
          onOpenChange={setExitIntentOpen}
        />
      </div>
    </>
  );
}
