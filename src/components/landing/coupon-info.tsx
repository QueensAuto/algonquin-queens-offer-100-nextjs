'use client';
import { useTranslation } from '@/hooks/use-translation';
import { CheckCircle } from 'lucide-react';

const ServiceListItem = ({ item }: { item: string }) => (
  <li className="flex items-start">
    <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-1" />
    <span>{item}</span>
  </li>
);

export default function CouponInfo() {
  const { t } = useTranslation();

  const couponList1 = t('couponList1') as string[];
  const couponList2 = t('couponList2') as string[];
  const exclusions = t('couponExclusions');

  return (
    <section className="py-24 px-4 bg-black/50 border-y border-slate-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6 font-headline">
          {t('couponTitle')}
        </h2>
        <p className="text-lg mb-8 text-slate-300 max-w-3xl mx-auto">
          {t('couponSubtitle')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-8 text-left text-slate-300 max-w-2xl mx-auto">
          <ul className="space-y-3">
            {couponList1.map((item) => (
              <ServiceListItem key={item} item={item} />
            ))}
          </ul>
          <ul className="space-y-3">
            {couponList2.map((item) => (
              <ServiceListItem key={item} item={item} />
            ))}
          </ul>
        </div>

        <p className="text-sm text-slate-400" dangerouslySetInnerHTML={{ __html: exclusions }} />
      </div>
    </section>
  );
}
