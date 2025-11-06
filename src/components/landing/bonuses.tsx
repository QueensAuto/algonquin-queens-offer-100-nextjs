'use client';
import { useTranslation } from '@/hooks/use-translation';
import { Tag, SearchCheck, ShieldCheck, Truck, Award } from 'lucide-react';

const bonusData = [
  { icon: Tag, titleKey: 'bonus1Title', descKey: 'bonus1Desc' },
  { icon: SearchCheck, titleKey: 'bonus2Title', descKey: 'bonus2Desc' },
  { icon: ShieldCheck, titleKey: 'bonus3Title', descKey: 'bonus3Desc' },
  { icon: Truck, titleKey: 'bonus4Title', descKey: 'bonus4Desc' },
  { icon: Award, titleKey: 'bonus5Title', descKey: 'bonus5Desc' },
];

export default function Bonuses() {
  const { t } = useTranslation();
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-white" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {t('bonusStackTitle')}
          </span>
        </h2>
        <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
          {t('bonusStackSubtitle')}
        </p>
        <div className="mt-16">
          <div className="flex flex-wrap items-stretch justify-center gap-8">
            {bonusData.map((bonus, index) => (
              <div
                key={index}
                className="bonus-card flex flex-col items-center p-8 text-center bg-black-950 border border-slate-900 rounded-2xl transition-all duration-300 hover:border-cyan-500 hover:-translate-y-2 w-full sm:w-[45%] lg:w-[30%]"
              >
                <div className="icon-wrapper flex items-center justify-center w-16 h-16 rounded-full">
                  <bonus.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mt-6">
                  {t(bonus.titleKey)}
                </h3>
                <p className="text-slate-400 mt-2">{t(bonus.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-12 text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed text-center">
          {t('bonusStackDisclaimer')}
        </p>
      </div>
    </section>
  );
}
