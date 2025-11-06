'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '../ui/button';

type ExitIntentModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const bonusKeys = ['popupBonus1', 'popupBonus2', 'popupBonus3', 'popupBonus4', 'popupBonus5'];

export default function ExitIntentModal({ isOpen, onOpenChange }: ExitIntentModalProps) {
  const { t } = useTranslation();
  
  const handleCtaClick = () => {
    onOpenChange(false);
    const formElement = document.getElementById('book-appointment-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900/60 backdrop-blur-lg border-white/10 text-white max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">
            {t('popupTitleV2')}
          </DialogTitle>
          <DialogDescription asChild>
            <div>
              <p className="text-base sm:text-lg text-slate-300 text-center mb-6">
                {t('popupSubtitleV2')}
              </p>
              <ul className="space-y-3 mb-6 text-slate-300 text-left max-w-md mx-auto">
                {bonusKeys.map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <span className="text-cyan-400 text-xl flex-shrink-0">✅</span>
                    <span>{t(key as any)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-center">
                <Button onClick={handleCtaClick} className="cta-button h-auto px-6 py-3 font-bold">
                  {t('popupCTAV2')} &rarr;
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
