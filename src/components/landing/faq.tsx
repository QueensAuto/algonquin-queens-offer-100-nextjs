'use client';
import { useTranslation } from '@/hooks/use-translation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqs } from '@/data/landing-page-data';

export default function Faq() {
  const { t } = useTranslation();
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-white mb-10 font-headline">
          {t('faqTitle')}
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-slate-900/50 border border-slate-800 rounded-lg p-2 px-4 transition-all duration-300 hover:border-cyan-400/50 data-[state=open]:border-cyan-400/50"
            >
              <AccordionTrigger className="text-left font-semibold text-lg text-slate-100 no-underline">
                {t(faq.questionKey)}
              </AccordionTrigger>
              <AccordionContent className="text-slate-400">
                {t(faq.answerKey)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
