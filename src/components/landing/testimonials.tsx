'use client';
import { useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import { testimonials as allReviews } from '@/data/landing-page-data';

const QuoteIcon = () => (
  <svg
    width="45"
    height="36"
    className="fill-current text-cyan-400 opacity-10"
    viewBox="0 0 45 36"
  >
    <path d="M13.5 0C6.04 0 0 6.04 0 13.5C0 20.96 6.04 27 13.5 27H18V36H9C4.03 36 0 31.97 0 27V25.65C0 22.77 1.17 20.04 3.26 17.96C5.34 15.87 8.07 14.7 10.95 14.7H13.5C16.8 14.7 19.8 12.15 20.25 8.85C20.25 8.85 20.25 8.55 20.25 8.55C20.25 3.83 16.42 0 11.7 0H13.5ZM40.5 0C33.04 0 27 6.04 27 13.5C27 20.96 33.04 27 40.5 27H45V36H36C31.03 36 27 31.97 27 27V25.65C27 22.77 28.17 20.04 30.26 17.96C32.34 15.87 35.07 14.7 37.95 14.7H40.5C43.8 14.7 46.8 12.15 47.25 8.85C47.25 8.85 47.25 8.55 47.25 8.55C47.25 3.83 43.42 0 38.7 0H40.5Z" />
  </svg>
);

export default function Testimonials() {
  const { t } = useTranslation();
  const [reviewsToShow, setReviewsToShow] = useState(6);

  const showMoreReviews = () => {
    setReviewsToShow(allReviews.length);
  };

  return (
    <section className="py-24 px-4" itemScope itemType="http://schema.org/AutoRepair">
      <meta itemProp="name" content="Queens Auto Service" />
      <meta itemProp="image" content="https://queensautoserviceselgin.com/wp-content/uploads/2024/11/Logo-White.webp" />
      <meta itemProp="telephone" content="+1-224-635-3000" />
      <address itemProp="address" itemScope itemType="http://schema.org/PostalAddress" className="hidden">
        <span itemProp="streetAddress">1303 Dundee Ave</span>,
        <span itemProp="addressLocality">Elgin</span>,
        <span itemProp="addressRegion">IL</span>
        <span itemProp="postalCode">60120</span>
      </address>
      <div itemProp="aggregateRating" itemScope itemType="http://schema.org/AggregateRating" className="hidden">
        <meta itemProp="ratingValue" content="4.9" />
        <meta itemProp="reviewCount" content="52" />
      </div>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-white" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
          {t('testimonialsTitle')}
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-center text-slate-400">
          {t('testimonialsSubtitle')}
        </p>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allReviews.slice(0, reviewsToShow).map((review, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl border border-slate-800 bg-slate-900/50 hover:shadow-2xl hover:-translate-y-1 shadow-lg transition-all flex flex-col"
            >
              <div className="absolute top-4 left-4 z-0">
                <QuoteIcon />
              </div>
              <div className="relative z-10 flex flex-col flex-grow">
                 <p className="text-base text-slate-300 leading-relaxed flex-grow">
                  {review.text.length > 150 ? review.text.substring(0, 150) + "..." : review.text}
                </p>
              </div>
              <div className="relative z-10 flex items-center mt-6 pt-6 border-t border-slate-800">
                <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-white text-lg font-bold mr-4">
                  {review.name.split(" ").map((n) => n[0]).join("").substring(0,2)}
                </div>
                <div>
                  <h4 className="font-semibold text-white">{review.name}</h4>
                  <div className="text-yellow-400">★★★★★</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {reviewsToShow < allReviews.length && (
          <div className="mt-12 text-center">
            <Button
              onClick={showMoreReviews}
              className="cta-button text-white w-full sm:w-auto px-8 py-3 font-semibold rounded-full shadow-lg h-auto"
            >
              {t('loadMore')}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
