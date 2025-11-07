'use client';
import Image from 'next/image';
import { useTranslation } from '@/hooks/use-translation';

export default function ServiceArea() {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-white" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
          {t('serviceAreaTitle')}
        </h2>
        <p className="mt-4 text-lg text-slate-400">
          {t('serviceAreaSubtitle')}
        </p>
        <div className="mt-12 rounded-2xl overflow-hidden border-4 border-slate-800 shadow-2xl">
          <Image
            src="https://queensautoservices.com/wp-content/uploads/Queens-Auto-Services-Map.webp"
            alt="Map of Queens Auto Service service area in the greater Elgin area"
            width={1024}
            height={576}
            className="w-full"
          />
        </div>
        <p className="mt-6 text-sm text-slate-500">
          {t('serviceAreaList')}
        </p>
      </div>
    </section>
  );
}
