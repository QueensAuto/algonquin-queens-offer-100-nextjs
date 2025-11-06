'use server';

import { getSavingsSuggestions } from '@/ai/flows/ai-savings-suggestions';

export async function generateSavingsSuggestions(currentCost: number) {
  try {
    const result = await getSavingsSuggestions({ currentCost });
    return result;
  } catch (error) {
    console.error('Error getting savings suggestions:', error);
    return { suggestions: 'Could not retrieve suggestions at this time. Please try again later.' };
  }
}

type BookingData = {
  'first-name': string;
  'last-name': string;
  email: string;
  'mobile-number': string;
  'vehicle-year': string;
  'vehicle-make': string;
  'vehicle-model': string;
  date: string;
  time: string;
  [key: string]: unknown;
};


export async function submitBooking(data: BookingData) {
  console.log('New Booking Submitted:', data);
  
  // Here you would typically save the data to a database,
  // send confirmation emails/SMS, and interact with a CRM.
  
  // For demo purposes, we'll simulate a successful submission.
  
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const couponCode = `SAVE${Math.floor(1000 + Math.random() * 9000)}`;

  return { 
    success: true, 
    message: 'Booking confirmed!',
    couponCode: couponCode,
    bookingDetails: {
      name: `${data['first-name']} ${data['last-name']}`,
      vehicle: `${data['vehicle-year']} ${data['vehicle-make']} ${data['vehicle-model']}`,
      appointment: `${data.date} at ${data.time}`,
    }
  };
}
