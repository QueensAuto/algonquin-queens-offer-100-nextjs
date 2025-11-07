'use server';

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

  const webhookUrl = 'https://n8n.queensautoservices.com/webhook-test/465c85ff-f19e-4d8b-8907-c806cc9fc07b';

  try {
    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Failed to send data to webhook:', error);
  }
  
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
