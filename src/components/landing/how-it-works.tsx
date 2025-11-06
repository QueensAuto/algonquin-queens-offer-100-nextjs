'use client';
import { useTranslation } from '@/hooks/use-translation';
import { CalendarPlus, CarFront, TicketPercent } from 'lucide-react';

const steps = [
  { icon: CalendarPlus, titleKey: 'step1Title', descKey: 'step1Desc' },
  { icon: CarFront, titleKey: 'step2Title', descKey: 'step2Desc' },
  { icon: TicketPercent, titleKey: 'step3Title', descKey: 'step3Desc' },
];

export default function HowItWorks() {
  const { t } = useTranslation();
  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-white font-headline">
          {t('howItWorksTitle')}
        </h2>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-slate-900/30 border border-slate-700 rounded-2xl p-8 flex flex-col items-center transition-all duration-300 hover:border-cyan-400 hover:-translate-y-2"
            >
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-slate-800 border-2 border-slate-700 text-cyan-400 mb-4">
                <step.icon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white mt-6">
                {t(step.titleKey)}
              </h3>
              <p className="text-slate-400 mt-2">{t(step.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
