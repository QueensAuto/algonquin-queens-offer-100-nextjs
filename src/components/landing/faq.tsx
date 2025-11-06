'use client';
import { useTranslation } from '@/hooks/use-translation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
    { questionKey: "faqQ1", answerKey: "faqA1" },
    { questionKey: "faqQ2", answerKey: "faqA2" },
    { questionKey: "faqQ3", answerKey: "faqA3" },
    { questionKey: "faqQ4", answerKey: "faqA4" },
];

export default function Faq() {
  const { t } = useTranslation();
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-white mb-10" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
          {t('faqTitle')}
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-slate-900/50 border border-slate-800 rounded-lg p-2 px-4 transition-all duration-300 hover:border-cyan-400/50"
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
