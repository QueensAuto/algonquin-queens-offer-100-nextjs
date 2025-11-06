'use client';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from '@/hooks/use-translation';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle,
  XCircle,
  PartyPopper,
} from 'lucide-react';
import { submitBooking } from '@/app/actions';

const validationSchema = z.object({
  'first-name': z.string().min(2, 'First name is required'),
  'last-name': z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  'mobile-number': z.string().min(10, 'Invalid phone number'),
  'vehicle-year': z.string().nonempty('Please select a year'),
  'vehicle-make': z.string().min(2, 'Make is required'),
  'vehicle-model': z.string().min(1, 'Model is required'),
  date: z.string().nonempty('Please select a date'),
  time: z.string().nonempty('Please select a time'),
});

type FormData = z.infer<typeof validationSchema>;

const timeSlotsByDay = {
  saturday: ["08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM"],
  weekday: ["08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"],
}

export default function BookingForm() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{success: boolean; couponCode: string; bookingDetails: { name: string; vehicle: string; appointment: string; }} | null>(null);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    watch,
    setValue,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
  });

  const selectedDate = watch('date');
  const selectedTime = watch('time');
  const yearOptions = Array.from({ length: new Date().getFullYear() - 1989 }, (_, i) => String(new Date().getFullYear() - i));

  const availableTimes = () => {
    if (!selectedDate) return [];
    const date = new Date(selectedDate);
    date.setHours(0,0,0,0);
    date.setDate(date.getDate() + 1); // Fix timezone offset issue
    const dayOfWeek = date.getDay();
    const now = new Date();
    
    const baseTimes = dayOfWeek === 6 ? timeSlotsByDay.saturday : timeSlotsByDay.weekday;
    
    return baseTimes.filter(time => {
      const [hourStr, minStr, period] = time.match(/(\d+):(\d+)\s(AM|PM)/)!.slice(1);
      let hours = parseInt(hourStr);
      if (period === 'PM' && hours < 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      
      const timeSlotDate = new Date(date);
      timeSlotDate.setHours(hours, parseInt(minStr));
      
      return timeSlotDate > now;
    });
  }

  const handleNext = async () => {
    const fieldsToValidate: (keyof FormData)[] = ['first-name', 'last-name', 'email', 'mobile-number', 'vehicle-year', 'vehicle-make', 'vehicle-model'];
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(2);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const result = await submitBooking(data);
    setIsSubmitting(false);
    if(result.success) {
      setSubmissionResult(result);
      setStep(3);
    } else {
      // Handle error, maybe with a toast
      console.error("Booking failed");
    }
  };
  
  const isStep1Valid =
    !errors['first-name'] && touchedFields['first-name'] &&
    !errors['last-name'] && touchedFields['last-name'] &&
    !errors.email && touchedFields.email &&
    !errors['mobile-number'] && touchedFields['mobile-number'] &&
    !errors['vehicle-year'] &&
    !errors['vehicle-make'] && touchedFields['vehicle-make'] &&
    !errors['vehicle-model'] && touchedFields['vehicle-model'];


  if (step === 3 && submissionResult) {
    return (
        <section id="book-appointment-form" className="py-24 px-4">
            <div className="max-w-2xl mx-auto animated-gradient-border p-1">
                <div className="bg-slate-950 shadow-inner shadow-black/20 rounded-[16px] p-6 sm:p-8 md:p-12 text-center">
                    <PartyPopper className="w-16 h-16 mx-auto text-cyan-400 mb-4" />
                    <h2 className="text-3xl font-bold text-white font-headline">{t('thankYouTitle')}</h2>
                    <p className="text-lg text-slate-300 mt-2">{t('thankYouSubtitle')}</p>

                    <div className="mt-8 text-left bg-slate-800/50 p-6 rounded-lg space-y-4">
                        <div className="border-b border-slate-700 pb-2">
                            <p className="text-sm text-slate-400">{t('confirmationName')}</p>
                            <p className="font-semibold text-white">{submissionResult.bookingDetails.name}</p>
                        </div>
                        <div className="border-b border-slate-700 pb-2">
                            <p className="text-sm text-slate-400">{t('confirmationVehicle')}</p>
                            <p className="font-semibold text-white">{submissionResult.bookingDetails.vehicle}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-400">{t('confirmationAppointment')}</p>
                            <p className="font-semibold text-white">{submissionResult.bookingDetails.appointment}</p>
                        </div>
                    </div>
                    
                    <div className="mt-8">
                        <p className="text-slate-300">{t('couponCodeInstruction')}</p>
                        <div className="my-4 p-4 border-2 border-dashed border-cyan-400 rounded-lg bg-cyan-400/10">
                            <p className="text-3xl font-bold text-white tracking-widest">{submissionResult.couponCode}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
  }

  return (
    <section id="book-appointment-form" className="py-24 px-4">
      <div id="form-container-wrapper" className="max-w-2xl mx-auto animated-gradient-border p-1">
        <div className="bg-slate-950 shadow-inner shadow-black/20 rounded-[16px] p-6 sm:p-8 md:p-12">
          <div id="form-content">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white font-headline">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {t('formTitle')}
                </span>
              </h2>
              <p id="form-instruction" className="mt-2 text-lg text-slate-300">
                {step === 1 ? t('formInstruction1') : t('formInstruction2')}
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 relative min-h-[500px]">
              {step === 1 && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {['first-name', 'last-name', 'email', 'mobile-number'].map(fieldName => {
                            const key = fieldName as keyof FormData;
                            return (
                                <div key={key}>
                                    <label htmlFor={key} className="block text-sm font-medium text-slate-300 mb-1">{t(key as any)}</label>
                                    <div className="relative mt-1">
                                        <Controller
                                            name={key}
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    id={key}
                                                    placeholder={t(`${key}Placeholder` as any)}
                                                    className={`input-field ${errors[key] ? 'is-invalid' : touchedFields[key] ? 'is-valid' : ''}`}
                                                />
                                            )}
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            {touchedFields[key] && !errors[key] && <CheckCircle className="h-5 w-5 text-green-500" />}
                                            {errors[key] && <XCircle className="h-5 w-5 text-red-500" />}
                                        </div>
                                    </div>
                                    {errors[key] && <p className="mt-1 text-xs text-red-400">{errors[key]?.message}</p>}
                                </div>
                            )
                        })}
                    </div>
                    <div className="pt-2">
                        <h3 className="text-xl font-bold text-white mb-4 font-headline">{t('vehicleDetails')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label htmlFor="vehicle-year" className="block text-sm font-medium text-slate-300 mb-1">{t('carYear')}</label>
                                <Controller name="vehicle-year" control={control} render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger><SelectValue placeholder={t('selectYearPlaceholder')} /></SelectTrigger>
                                        <SelectContent>
                                            {yearOptions.map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                )}/>
                                {errors['vehicle-year'] && <p className="mt-1 text-xs text-red-400">{errors['vehicle-year']?.message}</p>}
                            </div>
                            {['vehicle-make', 'vehicle-model'].map(fieldName => {
                                const key = fieldName as keyof FormData;
                                return (
                                <div key={key}>
                                    <label htmlFor={key} className="block text-sm font-medium text-slate-300 mb-1">{t(key as any)}</label>
                                    <div className="relative mt-1">
                                        <Controller name={key} control={control} render={({ field }) => (
                                            <Input {...field} id={key} placeholder={t(`${key}Placeholder` as any)} className={`input-field ${errors[key] ? 'is-invalid' : touchedFields[key] ? 'is-valid' : ''}`}/>
                                        )}/>
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            {touchedFields[key] && !errors[key] && <CheckCircle className="h-5 w-5 text-green-500" />}
                                            {errors[key] && <XCircle className="h-5 w-5 text-red-500" />}
                                        </div>
                                    </div>
                                    {errors[key] && <p className="mt-1 text-xs text-red-400">{errors[key]?.message}</p>}
                                </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="mt-8 text-center">
                        <Button type="button" onClick={handleNext} disabled={!isStep1Valid} className="w-full cta-button h-auto px-8 py-4 text-lg font-bold">
                            {t('nextBtn')} &rarr;
                        </Button>
                        <p className="mt-2 text-xs text-slate-400">{t('ctaUrgency')}</p>
                    </div>
                </div>
              )}
              {step === 2 && (
                 <div className="space-y-8">
                     <div>
                        <h3 className="text-xl font-bold text-white mb-4 font-headline">{t('whenBringIn')}</h3>
                        <div className="bg-slate-800/50 p-4 rounded-lg">
                           <Controller name="date" control={control} render={({ field }) => (
                                <Calendar
                                    mode="single"
                                    selected={field.value ? new Date(field.value) : undefined}
                                    onSelect={(day) => field.onChange(day?.toISOString().split('T')[0])}
                                    month={currentMonth}
                                    onMonthChange={setCurrentMonth}
                                    disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1)) || date.getDay() === 0}
                                    className="p-0"
                                    components={{
                                        IconLeft: () => <ChevronLeft className="h-6 w-6" />,
                                        IconRight: () => <ChevronRight className="h-6 w-6" />,
                                    }}
                                />
                            )}/>
                        </div>
                        {errors.date && <p className="mt-1 text-xs text-red-400">{errors.date.message}</p>}
                     </div>

                     {selectedDate && availableTimes().length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-4">{t('availableTimes')}</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {availableTimes().map(time => (
                                <Button
                                  key={time}
                                  type="button"
                                  variant={selectedTime === time ? 'default' : 'outline'}
                                  onClick={() => setValue('time', time, { shouldValidate: true })}
                                  className={`time-slot transition-colors duration-200 ${selectedTime === time ? 'bg-cyan-500 border-cyan-500 text-white' : 'border-slate-600 hover:bg-slate-700'}`}
                                >
                                  {time}
                                </Button>
                            ))}
                          </div>
                          {errors.time && <p className="mt-1 text-xs text-red-400">{errors.time.message}</p>}
                        </div>
                     )}

                     {selectedDate && availableTimes().length === 0 && (
                       <p className="text-slate-400 text-center">{t('noTimesAvailable')}</p>
                     )}

                    <div className="mt-8 text-center">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button type="button" variant="ghost" onClick={() => setStep(1)} className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-slate-300 hover:bg-slate-800">
                                &larr; {t('backBtn')}
                            </Button>
                            <Button type="submit" disabled={isSubmitting || !selectedTime} className="w-full sm:w-auto cta-button h-auto px-8 py-4 text-xl font-bold">
                                {isSubmitting && <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />}
                                {isSubmitting ? t('submitBtnLoading') : t('submitBtn')}
                            </Button>
                        </div>
                        <p className="mt-2 text-xs text-slate-400">{t('ctaUrgency')}</p>
                    </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
