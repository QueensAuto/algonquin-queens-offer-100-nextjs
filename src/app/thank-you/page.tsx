'use client';

import { Suspense, useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, Copy, PartyPopper, Play, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTranslation } from '@/hooks/use-translation';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const { language } = useLanguage();

  const name = searchParams.get('name') || t('guest');
  const vehicle = searchParams.get('vehicle') || '';
  const appointment = searchParams.get('appointment') || '';

  const [couponCode, setCouponCode] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [audioStatus, setAudioStatus] = useState<'idle' | 'playing'>('idle');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Fire confetti on mount
    const colors = ['#22d3ee', '#3b82f6', '#ffffff', '#a78bfa'];
    confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 }, colors: colors });

    // Retrieve data from session storage
    setCouponCode(sessionStorage.getItem('userCouponCode') || '');
    setAudioUrl(sessionStorage.getItem('customAudioUrl') || '');

  }, []);

  const formattedDate = useCallback(() => {
    if (!appointment) return '';
    const [datePart] = appointment.split(' at ');
    if (!datePart) return '';
    const date = new Date(datePart.replace(/-/g, '/'));
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat(language, options).format(date);
  }, [appointment, language]);


  const handleCopy = () => {
    if (couponCode) {
      navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePlayAudio = () => {
      if (audioUrl) {
          if (audioRef.current) {
              audioRef.current.play();
          } else {
              const newAudio = new Audio(audioUrl);
              audioRef.current = newAudio;
              newAudio.onplay = () => setAudioStatus('playing');
              newAudio.onended = () => {
                  setAudioStatus('idle');
              };
              newAudio.play().catch(e => console.error("Audio playback failed", e));
          }
      }
  };


  return (
    <div className="relative overflow-x-hidden">
        <Header />
        <main className="flex-grow">
            <section id="thank-you-hero" className="py-16 px-4 text-center">
                <div className="max-w-2xl mx-auto">
                    <PartyPopper className="w-20 h-20 mx-auto text-cyan-400 mb-6" />
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-headline">
                        {t('thankYouTitlePart1')}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{name}</span>!
                    </h1>
                    <p className="mt-4 text-lg text-slate-300">{t('thankYouSubtitle')}</p>
                    
                    {audioUrl && (
                        <div className="mt-8">
                            <Button onClick={handlePlayAudio} disabled={audioStatus === 'playing'} className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-sky-400 to-indigo-500 text-white text-lg font-bold rounded-full shadow-lg shadow-sky-500/30 hover:shadow-sky-400/50 transition-all duration-300 transform hover:scale-105">
                                {audioStatus === 'playing' ? <Volume2 className="w-6 h-6 animate-pulse" /> : <Play className="w-6 h-6" />}
                                <span>{audioStatus === 'playing' ? t('playingAudio') : t('playMessageFor', { name })}</span>
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            <section id="confirmation-details" className="pb-24 px-4">
                 <div className="max-w-3xl mx-auto space-y-8">
                    {couponCode && (
                      <div className="p-6 bg-slate-900/50 rounded-lg border-2 border-dashed border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.25)] text-center">
                          <p className="text-base text-slate-300">{t('couponCodeInstruction')}</p>
                          <div className="flex items-center justify-center gap-3 mt-2">
                              <p className="text-4xl font-bold text-cyan-300 tracking-widest">{couponCode}</p>
                              <Button onClick={handleCopy} size="icon" variant="ghost" className="p-2 bg-slate-700/50 rounded-lg text-slate-300 hover:text-white hover:bg-slate-600 transition-colors" aria-label="Copy coupon code">
                                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                              </Button>
                          </div>
                          <p className={`text-sm text-green-400 h-5 mt-1 transition-opacity duration-300 ${copied ? 'opacity-100' : 'opacity-0'}`}>{t('copied')}</p>
                      </div>
                    )}
                    
                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6 text-left">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div>
                                <p className="text-sm text-slate-400">{t('confirmationName')}</p>
                                <p className="font-semibold text-white">{name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">{t('confirmationVehicle')}</p>
                                <p className="font-semibold text-white">{vehicle}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">{t('confirmationAppointment')}</p>
                                <p className="font-semibold text-white">{appointment}</p>
                            </div>
                        </div>
                    </div>
                
                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6 text-left">
                        <h3 className="text-xl font-bold text-white mb-4">{t('whatHappensNextTitle')}</h3>
                        <ol className="list-decimal list-inside space-y-2 text-slate-300">
                            <li>{t('whatHappensNextStep1')}</li>
                            <li>{t('whatHappensNextStep2')}</li>
                            <li>{t('whatHappensNextStep3')}</li>
                        </ol>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6 text-center">
                            <h4 className="font-bold text-white text-lg">{t('needToRescheduleTitle')}</h4>
                            <p className="text-slate-400 mt-2 text-sm">{t('needToRescheduleBody')}</p>
                            <a href={t('phoneNumberLink')} className="mt-4 inline-block px-6 py-2 border-2 border-white rounded-full text-white font-semibold hover:bg-white hover:text-black transition-colors">
                                {t('phoneNumber')}
                            </a>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6 text-center">
                            <h4 className="font-bold text-white text-lg">{t('whereToFindUsTitle')}</h4>
                            <p className="text-slate-400 mt-2 text-sm">{t('address')}</p>
                             <a href={t('googleMapsLink')} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block px-6 py-2 border-2 border-white rounded-full text-white font-semibold hover:bg-white hover:text-black transition-colors">
                              {t('getDirections')}
                            </a>
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
