'use client';
import { useState, useEffect, useCallback } from 'react';
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
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle,
  XCircle,
  PartyPopper,
} from 'lucide-react';
import { submitBooking } from '@/app/actions';
import { useRouter } from 'next/navigation';


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
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    watch,
    setValue,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
  });

  const selectedDate = watch('date');
  const selectedTime = watch('time');
  const yearOptions = Array.from({ length: new Date().getFullYear() + 1 - 1990 }, (_, i) => String(new Date().getFullYear() + 1 - i));
  const watchedFields = watch(['first-name', 'last-name', 'email', 'mobile-number', 'vehicle-year', 'vehicle-make', 'vehicle-model']);


  const availableTimes = useCallback(() => {
    if (!selectedDate) return [];
    const date = new Date(selectedDate.replace(/-/g, '/'));
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
  }, [selectedDate]);

  const smoothScrollToForm = () => {
    const formElement = document.getElementById('form-container-wrapper');
    const header = document.getElementById('site-header');
    if (formElement) {
        const headerHeight = header ? header.offsetHeight : 0;
        const elementPosition = formElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight - 20; // 20px buffer for spacing

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
  };

  const handleNext = async () => {
    const fieldsToValidate: (keyof FormData)[] = ['first-name', 'last-name', 'email', 'mobile-number', 'vehicle-year', 'vehicle-make', 'vehicle-model'];
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(2);
      smoothScrollToForm();
    }
  };

  const handleBack = () => {
    setStep(1);
    smoothScrollToForm();
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    const enhancedData = {
      ...data,
      'full-name': `${data['first-name']} ${data['last-name']}`,
      vehicle: `${data['vehicle-year']} ${data['vehicle-make']} ${data['vehicle-model']}`,
    };

    const result = await submitBooking(enhancedData);
    setIsSubmitting(false);

    if(result.success) {
      const thankYouUrl = new URL('/thank-you', window.location.origin);
      thankYouUrl.searchParams.set('name', result.bookingDetails.name);
      thankYouUrl.searchParams.set('vehicle', result.bookingDetails.vehicle);
      thankYouUrl.searchParams.set('appointment', result.bookingDetails.appointment);
      thankYouUrl.searchParams.set('couponCode', result.couponCode);
      
      router.push(thankYouUrl.toString());

    } else {
      // Handle error, maybe with a toast
      console.error("Booking failed");
    }
  };
  
  const isStep1Valid =
    !errors['first-name'] && !!watch('first-name') &&
    !errors['last-name'] && !!watch('last-name') &&
    !errors.email && !!watch('email') &&
    !errors['mobile-number'] && !!watch('mobile-number') &&
    !errors['vehicle-year'] && !!watch('vehicle-year') &&
    !errors['vehicle-make'] && !!watch('vehicle-make') &&
    !errors['vehicle-model'] && !!watch('vehicle-model');


  const renderCalendar = useCallback(() => {
    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dayElements = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
        dayElements.push(<div key={`empty-${i}`}></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dayDate = new Date(year, month, i);
        let classes = "calendar-day";
        const formattedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
        
        if (dayDate < today || dayDate.getDay() === 0) classes += " disabled";
        if (dayDate.getTime() === today.getTime()) classes += " today";
        if (selectedDate === formattedDate) classes += " selected";

        dayElements.push(
            <div 
                key={i} 
                className={classes} 
                data-date={formattedDate}
                onClick={(e) => {
                  const target = e.target as HTMLDivElement;
                  if (target.classList.contains('disabled')) return;
                  setValue('date', target.dataset.date || '', { shouldValidate: true });
                  setValue('time', '', { shouldValidate: true });
                }}
            >
                {i}
            </div>
        );
    }
    return dayElements;
  }, [currentMonth, selectedDate, setValue]);


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
                        {(['first-name', 'last-name', 'email', 'mobile-number'] as const).map(fieldName => {
                            const isTouched = touchedFields[fieldName];
                            const hasError = !!errors[fieldName];
                            const autoCompleteMap = {
                                'first-name': 'given-name',
                                'last-name': 'family-name',
                                'email': 'email',
                                'mobile-number': 'tel'
                            };
                            return (
                                <div key={fieldName} >
                                    <label htmlFor={fieldName} className="block text-sm font-medium text-slate-300 mb-1">{t(fieldName)}</label>
                                    <div className="relative mt-1">
                                        <Controller
                                            name={fieldName}
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    id={fieldName}
                                                    placeholder={t(`${fieldName}Placeholder`)}
                                                    autoComplete={autoCompleteMap[fieldName]}
                                                    className={`input-field block w-full bg-slate-800 border border-slate-600 rounded-md shadow-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 sm:text-sm ${isTouched && !hasError ? 'border-green-500' : ''} ${hasError ? 'border-red-500' : ''}`}
                                                />
                                            )}
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                          {isTouched && !hasError && <CheckCircle className="h-5 w-5 text-green-500" />}
                                          {hasError && <XCircle className="h-5 w-5 text-red-500" />}
                                        </div>
                                    </div>
                                    {errors[fieldName] && <p className="mt-1 text-xs text-red-400">{errors[fieldName]?.message}</p>}
                                </div>
                            )
                        })}
                    </div>
                    <div className="pt-2">
                        <h3 className="text-xl font-bold text-white mb-4 font-headline">{t('vehicleDetails')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label htmlFor="vehicle-year" className="block text-sm font-medium text-slate-300 mb-1">{t('year')}</label>
                                <Controller name="vehicle-year" control={control} render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-full mt-1 bg-slate-800 border border-slate-600 text-white focus:ring-cyan-400">
                                          <SelectValue placeholder={t('selectYearPlaceholder')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {yearOptions.map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                )}/>
                                {errors['vehicle-year'] && <p className="mt-1 text-xs text-red-400">{errors['vehicle-year']?.message}</p>}
                            </div>
                            {(['vehicle-make', 'vehicle-model'] as const).map(fieldName => {
                                const isTouched = touchedFields[fieldName];
                                const hasError = !!errors[fieldName];
                                return (
                                <div key={fieldName}>
                                    <label htmlFor={fieldName} className="block text-sm font-medium text-slate-300 mb-1">{t(fieldName)}</label>
                                    <div className="relative mt-1">
                                        <Controller name={fieldName} control={control} render={({ field }) => (
                                            <Input {...field} id={fieldName} placeholder={t(`${fieldName}Placeholder`)} className={`input-field block w-full bg-slate-800 border border-slate-600 rounded-md shadow-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 sm:text-sm ${isTouched && !hasError ? 'border-green-500' : ''} ${hasError ? 'border-red-500' : ''}`}/>
                                        )}/>
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                          {isTouched && !hasError && <CheckCircle className="h-5 w-5 text-green-500" />}
                                          {hasError && <XCircle className="h-5 w-5 text-red-500" />}
                                        </div>
                                    </div>
                                    {errors[fieldName] && <p className="mt-1 text-xs text-red-400">{errors[fieldName]?.message}</p>}
                                </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="mt-8 text-center">
                        <Button type="button" onClick={handleNext} disabled={!isStep1Valid} className="cta-button text-white w-full h-auto px-8 py-4 text-lg font-bold rounded-full">
                            {t('nextBtn')}
                        </Button>
                        <p className="mt-2 text-xs text-slate-400">{t('ctaUrgency')}</p>
                    </div>
                </div>
              )}
              {step === 2 && (
                 <div className="space-y-8">
                     <div>
                        <h3 className="text-xl font-bold text-white mb-4 font-headline">{t('whenBringIn')}</h3>
                        <div className="bg-slate-800/50 p-6 rounded-lg shadow-lg w-full">
                           <div className="flex items-center justify-between mb-6">
                               <Button type="button" variant="ghost" onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() -1, 1))} className="p-2 rounded-full hover:bg-slate-700 transition-colors"><ChevronLeft className="w-6 h-6 text-slate-400" /></Button>
                               <h3 className="text-xl font-semibold text-white">{currentMonth.toLocaleString( 'default', { month: 'long', year: 'numeric' })}</h3>
                               <Button type="button" variant="ghost" onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))} className="p-2 rounded-full hover:bg-slate-700 transition-colors"><ChevronRight className="w-6 h-6 text-slate-400" /></Button>
                           </div>
                           <div className="grid grid-cols-7 gap-1 text-center font-semibold text-slate-400 text-xs py-2">
                               {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d=><div key={d}>{d}</div>)}
                           </div>
                           <div className="grid grid-cols-7 gap-2 text-center mt-2">
                               {renderCalendar()}
                           </div>
                        </div>
                        {errors.date && <p className="mt-1 text-xs text-red-400">{errors.date.message}</p>}
                     </div>

                     {selectedDate && availableTimes().length > 0 && (
                        <div id="time-slot-container">
                          <h4 className="text-lg font-semibold text-white mb-4">{t('availableTimes')}</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {availableTimes().map(time => (
                                <Button
                                  key={time}
                                  type="button"
                                  variant={selectedTime === time ? 'default' : 'outline'}
                                  onClick={() => setValue('time', time, { shouldValidate: true })}
                                  className={`time-slot p-2 border rounded-md transition-colors duration-200 hover:bg-slate-700 ${selectedTime === time ? 'selected' : 'border-slate-600 text-slate-200'}`}
                                >
                                  {time}
                                </Button>
                            ))}
                          </div>
                          {errors.time && <p className="mt-1 text-xs text-red-400">{errors.time.message}</p>}
                        </div>
                     )}

                     {selectedDate && availableTimes().length === 0 && (
                       <p className="text-slate-400 text-center col-span-full">{t('noTimesAvailable')}</p>
                     )}

                    <div className="mt-8 text-center">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button type="button" variant="ghost" onClick={handleBack} className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-slate-300 rounded-full hover:bg-slate-800 transition-colors">
                                &larr; {t('backBtn')}
                            </Button>
                            <Button type="submit" disabled={isSubmitting || !selectedTime} className="cta-button text-white w-full sm:w-auto inline-flex items-center justify-center h-auto px-8 py-4 text-xl font-bold rounded-full">
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

    