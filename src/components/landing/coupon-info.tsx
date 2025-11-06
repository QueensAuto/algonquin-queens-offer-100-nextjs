'use client';
import { useTranslation } from '@/hooks/use-translation';

export default function CouponInfo() {
  const { t } = useTranslation();

  const couponList1 = t('couponList1') as string | undefined;
  const couponList2 = t('couponList2') as string | undefined;
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
          {couponList1 && <ul className="space-y-3" style={{listStyle: 'none', paddingLeft: 0}} dangerouslySetInnerHTML={{ __html: couponList1 }} />}
          {couponList2 && <ul className="space-y-3" style={{listStyle: 'none', paddingLeft: 0}} dangerouslySetInnerHTML={{ __html: couponList2 }} />}
        </div>

        <p className="text-sm text-slate-400" dangerouslySetInnerHTML={{ __html: exclusions }} />
      </div>
    </section>
  );
}
