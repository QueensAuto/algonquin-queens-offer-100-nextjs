
'use client';

import { Suspense, useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    setCouponCode(sessionStorage.getItem('userCouponCode') || '');
    setAudioUrl(sessionStorage.getItem('customAudioUrl') || '');
    
    const colors = ['#22d3ee', '#3b82f6', '#ffffff', '#a78bfa'];
    const end = Date.now() + 3 * 1000;

    const frame = () => {
      if (Date.now() > end) return;
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.8 }, colors: colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.8 }, colors: colors });
      requestAnimationFrame(frame);
    };
    
    setTimeout(() => confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 }, colors: colors }), 500);
    frame();
  }, []);

  const draw = useCallback(() => {
    if (!analyserRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / dataArray.length) * 2.5;
    let barHeight;
    let x = 0;

    for(let i = 0; i < dataArray.length; i++) {
        barHeight = dataArray[i] / 2;
        ctx.fillStyle = `rgba(34, 211, 238, ${barHeight / 150})`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
    }
    animationFrameIdRef.current = requestAnimationFrame(draw);
  }, []);

  const handlePlayAudio = () => {
      if (audioUrl) {
          if (!audioRef.current) {
              const newAudio = new Audio(audioUrl);
              audioRef.current = newAudio;
              
              if (!audioContextRef.current) {
                  audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
                  analyserRef.current = audioContextRef.current.createAnalyser();
                  analyserRef.current.fftSize = 256;
                  sourceRef.current = audioContextRef.current.createMediaElementSource(newAudio);
                  sourceRef.current.connect(analyserRef.current);
                  analyserRef.current.connect(audioContextRef.current.destination);
              }
              
              newAudio.onplay = () => {
                setAudioStatus('playing');
                draw();
              };
              newAudio.onpause = () => {
                setAudioStatus('idle');
                if(animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
              };
              newAudio.onended = () => {
                setAudioStatus('idle');
                if(animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
              };
          }
          if (audioContextRef.current?.state === 'suspended') {
              audioContextRef.current.resume();
          }
          audioRef.current.play().catch(e => console.error("Audio playback failed", e));
      }
  };

  const handleCopy = () => {
    if (couponCode) {
      navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative overflow-hidden breathing-gradient-background">
        <Header />
        <main className="flex-grow">
            <motion.section 
                id="thank-you-hero" 
                className="py-16 px-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="max-w-2xl mx-auto">
                    <PartyPopper className="w-20 h-20 mx-auto text-cyan-400 mb-6" />
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-headline">
                        {t('thankYouTitlePart1')}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{name}</span>!
                    </h1>
                    <p className="mt-4 text-lg text-slate-300">{t('thankYouSubtitle')}</p>
                    
                    {audioUrl && (
                        <div className="mt-8 flex flex-col items-center gap-4">
                            <Button onClick={handlePlayAudio} disabled={audioStatus === 'playing'} className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-sky-400 to-indigo-500 text-white text-lg font-bold rounded-full shadow-lg shadow-sky-500/30 hover:shadow-sky-400/50 transition-all duration-300 transform hover:scale-105">
                                {audioStatus === 'playing' ? <Volume2 className="w-6 h-6 animate-pulse" /> : <Play className="w-6 h-6" />}
                                <span>{audioStatus === 'playing' ? t('playingAudio') : t('playMessageFor', { name })}</span>
                            </Button>
                            <canvas ref={canvasRef} width="300" height="50" className="transition-opacity duration-300" style={{opacity: audioStatus === 'playing' ? 1: 0}}/>
                        </div>
                    )}
                </div>
            </motion.section>

            <section id="confirmation-details" className="pb-24 px-4">
                 <div className="max-w-3xl mx-auto space-y-8">
                    {couponCode && (
                      <motion.div 
                        className="p-6 bg-slate-900/50 rounded-lg border-2 border-dashed border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.25)] text-center"
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 100, delay: 0.8 }}
                      >
                          <p className="text-base text-slate-300">{t('couponCodeInstruction')}</p>
                          <div className="flex items-center justify-center gap-3 mt-2">
                              <p className="text-4xl font-bold text-cyan-300 tracking-widest">{couponCode}</p>
                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={copied ? 'copied' : 'copy'}
                                  initial={{ scale: 0.5, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.5, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Button onClick={handleCopy} size="icon" variant="ghost" className="p-2 bg-slate-700/50 rounded-lg text-slate-300 hover:text-white hover:bg-slate-600 transition-colors relative" aria-label="Copy coupon code">
                                      {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                                  </Button>
                                </motion.div>
                              </AnimatePresence>
                          </div>
                          <p className={`text-sm text-green-400 h-5 mt-1 transition-opacity duration-300 ${copied ? 'opacity-100' : 'opacity-0'}`}>{t('copied')}</p>
                      </motion.div>
                    )}
                    
                    <motion.div 
                        className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6 text-left"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                    >
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
                    </motion.div>
                
                    <motion.div 
                        className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6 text-left"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.4 }}
                    >
                        <h3 className="text-xl font-bold text-white mb-4">{t('whatHappensNextTitle')}</h3>
                        <ol className="list-decimal list-inside space-y-2 text-slate-300">
                            <li>{t('whatHappensNextStep1')}</li>
                            <li>{t('whatHappensNextStep2')}</li>
                            <li>{t('whatHappensNextStep3')}</li>
                        </ol>
                    </motion.div>

                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.6 }}
                    >
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
                    </motion.div>
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
