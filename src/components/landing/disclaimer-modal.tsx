'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useTranslation } from '@/hooks/use-translation';

type DisclaimerModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export default function DisclaimerModal({ isOpen, onOpenChange }: DisclaimerModalProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-white/10 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white mb-4">
            {t('modalTitle')}
          </DialogTitle>
          <DialogDescription asChild>
            <div className="text-sm text-slate-300 space-y-3">
              <p>{t('modalP1')}</p>
              <p>{t('modalP2')}</p>
              <p>{t('modalP3')}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
