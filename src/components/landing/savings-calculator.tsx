'use client';
import { useState, useMemo } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { generateSavingsSuggestions } from '@/app/actions';
import { WandSparkles } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

type SavingsCalculatorProps = {
  onDetailsClick: () => void;
};

export default function SavingsCalculator({ onDetailsClick }: SavingsCalculatorProps) {
  const { t } = useTranslation();
  const [cost, setCost] = useState(450);
  const [suggestions, setSuggestions] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const savings = useMemo(() => {
    if (cost >= 700) return 100;
    if (cost >= 500) return 50;
    if (cost >= 300) return 40;
    if (cost >= 200) return 30;
    if (cost >= 100) return 15;
    return 0;
  }, [cost]);

  const finalCost = cost - savings;

  const handleSuggestion = async () => {
    setIsLoading(true);
    setSuggestions('');
    const result = await generateSavingsSuggestions(cost);
    if (result) {
      setSuggestions(result.suggestions);
    }
    setIsLoading(false);
  };

  return (
    <section id="scale-section" className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 font-headline">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {t('savingsScaleTitle')}
          </span>
        </h2>
        <p className="text-lg text-slate-300 mb-10">{t('dragSlider')}</p>
        <div className="max-w-2xl mx-auto bg-slate-900/30 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-lg">
          <Slider
            value={[cost]}
            onValueChange={(value) => setCost(value[0])}
            min={100}
            max={1000}
            step={1}
          />
          <div className="flex justify-between text-xs text-slate-400 mt-2 px-2">
            <span>$100</span>
            <span>$500</span>
            <span>$700+</span>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-slate-400">{t('repairCost')}</p>
              <p className="text-xl sm:text-2xl font-bold text-white">${cost}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">{t('youSave')}</p>
              <p className="text-xl sm:text-2xl font-bold text-cyan-400">${savings}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">{t('finalCost')}</p>
              <p className="text-xl sm:text-2xl font-bold text-white">${finalCost}</p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mt-6">
          <Button onClick={handleSuggestion} disabled={isLoading}>
            <WandSparkles className="mr-2 h-4 w-4" />
            {t('getAISuggestions')}
          </Button>

          {isLoading && (
            <div className="mt-4 space-y-2 text-left">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) }
          
          {suggestions && !isLoading && (
            <div className="mt-4 text-left p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2"><WandSparkles className="text-cyan-400"/> {t('aiSuggestionsTitle')}</h4>
              <p className="text-slate-300 whitespace-pre-wrap">{suggestions}</p>
            </div>
          )}
        </div>


        <p className="mt-4 text-xs text-slate-500">{t('oilChangeNote')}</p>
        <button onClick={onDetailsClick} className="mt-2 text-xs text-cyan-400 underline hover:text-cyan-300">
          {t('detailsApply')}
        </button>
      </div>
    </section>
  );
}
