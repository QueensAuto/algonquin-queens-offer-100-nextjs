'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PartyPopper } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const name = searchParams.get('name') || '';
  const vehicle = searchParams.get('vehicle') || '';
  const appointment = searchParams.get('appointment') || '';
  const couponCode = searchParams.get('couponCode') || '';

  return (
    <div className="relative overflow-x-hidden">
        <Header />
        <main>
            <section id="thank-you" className="py-24 px-4 min-h-screen">
                <div className="max-w-2xl mx-auto animated-gradient-border p-1">
                    <div className="bg-slate-950 shadow-inner shadow-black/20 rounded-[16px] p-6 sm:p-8 md:p-12 text-center">
                        <PartyPopper className="w-16 h-16 mx-auto text-cyan-400 mb-4" />
                        <h1 className="text-3xl font-bold text-white font-headline">{t('thankYouTitle')}</h1>
                        <p className="text-lg text-slate-300 mt-2">{t('thankYouSubtitle')}</p>

                        <div className="mt-8 text-left bg-slate-800/50 p-6 rounded-lg space-y-4">
                            <div className="border-b border-slate-700 pb-2">
                                <p className="text-sm text-slate-400">{t('confirmationName')}</p>
                                <p className="font-semibold text-white">{name}</p>
                            </div>
                            <div className="border-b border-slate-700 pb-2">
                                <p className="text-sm text-slate-400">{t('confirmationVehicle')}</p>
                                <p className="font-semibold text-white">{vehicle}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">{t('confirmationAppointment')}</p>
                                <p className="font-semibold text-white">{appointment}</p>
                            </div>
                        </div>
                        
                        <div className="mt-8">
                            <p className="text-slate-300">{t('couponCodeInstruction')}</p>
                            <div className="my-4 p-4 border-2 border-dashed border-cyan-400 rounded-lg bg-cyan-400/10">
                                <p className="text-3xl font-bold text-white tracking-widest">{couponCode}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <Footer />
    </div>
  );
}

export default function ThankYouPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ThankYouContent />
        </Suspense>
    );
}
