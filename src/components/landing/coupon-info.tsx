'use client';
import { useTranslation } from '@/hooks/use-translation';
import { CheckCircle } from 'lucide-react';

export default function CouponInfo() {
  const { t } = useTranslation();

  const couponList1Keys = ['Brake repairs & replacements', 'Suspension & steering work', 'Engine diagnostics & tune-ups', 'Batteries, alternators & starters'];
  const couponList2Keys = ['Heating & A/C repairs', 'Belts, hoses & spark plugs', 'Electrical diagnostics', 'Fluid flushes & maintenance'];

  const couponTranslations = {
    'Brake repairs & replacements': 'Brake repairs & replacements',
    'Suspension & steering work': 'Suspension & steering work',
    'Engine diagnostics & tune-ups': 'Engine diagnostics & tune-ups',
    'Batteries, alternators & starters': 'Batteries, alternators & starters',
    'Heating & A/C repairs': 'Heating & A/C repairs',
    'Belts, hoses & spark plugs': 'Belts, hoses & spark plugs',
    'Electrical diagnostics': 'Electrical diagnostics',
    'Fluid flushes & maintenance': 'Fluid flushes & maintenance',
    es: {
      'Brake repairs & replacements': 'Reparación y reemplazo de frenos',
      'Suspension & steering work': 'Trabajos de suspensión y dirección',
      'Engine diagnostics & tune-ups': 'Diagnóstico de motor y afinaciones',
      'Batteries, alternators & starters': 'Baterías, alternadores y arranques',
      'Heating & A/C repairs': 'Reparaciones de calefacción y A/C',
      'Belts, hoses & spark plugs': 'Correas, mangueras y bujías',
      'Electrical diagnostics': 'Diagnóstico eléctrico',
      'Fluid flushes & maintenance': 'Lavado de fluidos y mantenimiento',
    }
  }

  const exclusions = t('couponExclusions');

  return (
    <section className="py-24 px-4 bg-black-950/50 border-y border-slate-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
          {t('couponTitle')}
        </h2>
        <p className="text-lg mb-8 text-slate-300 max-w-3xl mx-auto">
          {t('couponSubtitle')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-8 text-left text-slate-300 max-w-2xl mx-auto">
          <ul className="space-y-3" style={{listStyle: 'none', paddingLeft: 0}}>
            {couponList1Keys.map(item => (
              <li key={item} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-1" />
                <span>{couponTranslations.es[item as keyof typeof couponTranslations.es] || item}</span>
              </li>
            ))}
          </ul>
          <ul className="space-y-3" style={{listStyle: 'none', paddingLeft: 0}}>
            {couponList2Keys.map(item => (
              <li key={item} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-1" />
                <span>{couponTranslations.es[item as keyof typeof couponTranslations.es] || item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-slate-400" dangerouslySetInnerHTML={{ __html: exclusions }} />
      </div>
    </section>
  );
}
