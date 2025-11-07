'use client';
import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from '@/hooks/use-translation';
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

  const savingsTiers = useMemo(() => [
      { min: 700, max: Infinity, discount: 100 },
      { min: 500, max: 699, discount: 50 },
      { min: 300, max: 499, discount: 40 },
      { min: 200, max: 299, discount: 30 },
      { min: 100, max: 199, discount: 15 },
      { min: 0, max: 99, discount: 0 }
  ], []);

  const savings = useMemo(() => {
    const tier = savingsTiers.find(t => cost >= t.min && cost <= t.max);
    return tier ? tier.discount : 0;
  }, [cost, savingsTiers]);

  const finalCost = cost - savings;
  
  const animateValue = (el: HTMLElement | null, start: number, end: number, duration: number) => {
      if (!el) return;
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          el.textContent = `$${Math.floor(progress * (end - start) + start)}`;
          if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
  };

  useEffect(() => {
    const repairCostEl = document.getElementById('repair-cost');
    const savingsAmountEl = document.getElementById('savings-amount');
    const finalCostEl = document.getElementById('final-cost');
    
    const currentRepairCost = parseInt(repairCostEl?.textContent?.replace('$', '') || '0');
    const currentSavingsAmount = parseInt(savingsAmountEl?.textContent?.replace('$', '') || '0');
    const currentFinalCost = parseInt(finalCostEl?.textContent?.replace('$', '') || '0');
    
    animateValue(repairCostEl, currentRepairCost, cost, 300);
    animateValue(savingsAmountEl, currentSavingsAmount, savings, 300);
    animateValue(finalCostEl, currentFinalCost, finalCost, 300);
  }, [cost, savings, finalCost]);

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
    <section id="scale-section" className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {t('savingsScaleTitle')}
          </span>
        </h2>
        <p className="text-lg text-slate-300 mb-10">{t('dragSlider')}</p>
        <div className="max-w-2xl mx-auto bg-slate-900/30 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-lg">
          <input 
            type="range" 
            id="cost-slider" 
            min="100" 
            max="1000" 
            value={cost} 
            step="1" 
            className="w-full"
            onChange={(e) => setCost(parseInt(e.target.value))}
          />
          <div className="flex justify-between text-xs text-slate-400 mt-2 px-2">
            <span>$100</span>
            <span>$500</span>
            <span>$700+</span>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-slate-400">{t('repairCost')}</p>
              <p id="repair-cost" className="text-xl sm:text-2xl font-bold text-white">${cost}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">{t('youSave')}</p>
              <p id="savings-amount" className="text-xl sm:text-2xl font-bold text-cyan-400">${savings}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">{t('finalCost')}</p>
              <p id="final-cost" className="text-xl sm:text-2xl font-bold text-white">${finalCost}</p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mt-6">
          <Button onClick={handleSuggestion} disabled={isLoading} className="cta-button">
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
