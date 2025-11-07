'use client';
import Image from 'next/image';
import { useTranslation } from '@/hooks/use-translation';
import { MapPin } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 items-center gap-8 md:gap-12">
          <div className="order-2 md:order-1 bg-white/5 backdrop-blur-lg p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl shadow-black/20">
            <p className="text-sm font-bold uppercase text-cyan-400">
              {t('aboutUs')}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mt-2">
              {t('aboutTitle')}
            </h2>
            <p className="mt-4 text-slate-300">{t('aboutBody')}</p>
            <p className="mt-8 text-xs text-slate-400 italic">
              {t('aboutTagline')}
            </p>
          </div>
          <div className="order-1 md:order-2 relative">
              <Image
                src="https://queensautoserviceselgin.com/wp-content/uploads/2025/09/Queens-Auto-Services-Elgin-Front-View-Shop-001.webp"
                alt="The exterior of Queens Auto Service shop in Elgin."
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; 
                  target.src='https://placehold.co/600x500/1e293b/ffffff?text=Our+Shop';
                }}
              />
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
              <p className="text-sm text-slate-200 font-semibold flex items-center">
                <MapPin className="inline-block mr-2 h-4 w-4 text-cyan-400" />
                {t('address')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
