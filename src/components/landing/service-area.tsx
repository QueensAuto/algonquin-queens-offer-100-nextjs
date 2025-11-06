'use client';
import Image from 'next/image';
import { useTranslation } from '@/hooks/use-translation';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ServiceArea() {
  const { t } = useTranslation();
  const mapImage = PlaceHolderImages.find((img) => img.id === 'service-map');

  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-white font-headline">
          {t('serviceAreaTitle')}
        </h2>
        <p className="mt-4 text-lg text-slate-400">
          {t('serviceAreaSubtitle')}
        </p>
        <div className="mt-12 rounded-2xl overflow-hidden border-4 border-slate-800 shadow-2xl">
          {mapImage && (
            <Image
              src={mapImage.imageUrl}
              alt="Map of Queens Auto Service service area in the greater Elgin area"
              width={1024}
              height={576}
              className="w-full"
              data-ai-hint={mapImage.imageHint}
            />
          )}
        </div>
        <p className="mt-6 text-sm text-slate-500">
          {t('serviceAreaList')}
        </p>
      </div>
    </section>
  );
}
