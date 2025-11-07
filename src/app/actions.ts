'use server';

type BookingData = {
  'first-name': string;
  'last-name': string;
  'full-name': string;
  email: string;
  'mobile-number': string;
  'vehicle-year': string;
  'vehicle-make': string;
  'vehicle-model': string;
  vehicle: string;
  date: string;
  time: string;
  [key: string]: unknown;
};


export async function submitBooking(data: BookingData) {
  console.log('New Booking Submitted:', data);

  const webhookUrl = 'https://n8n.queensautoservices.com/webhook-test/465c85ff-f19e-4d8b-8907-c806cc9fc07b';

  const webhookPayload = {
    "First Name": data['first-name'],
    "Last Name": data['last-name'],
    "Full Name": data['full-name'],
    "Phone": data['mobile-number'],
    "Email": data.email,
    "Car Make": data['vehicle-make'],
    "Car Model": data['vehicle-model'],
    "Car Year": data['vehicle-year'],
    "Vehicle": data.vehicle,
    "Appointment Date": data.date,
    "Appointment Time": data.time,
    "UTM Source": data.utm_source,
    "UTM Medium": data.utm_medium,
    "UTM Campaign": data.utm_campaign,
    "UTM Term": data.utm_term,
    "UTM Content": data.utm_content,
    "GCLID": data.gclid,
    "FBCLID": data.fbclid,
    "MSCLKID": data.msclkid,
    "GA Client ID": data.ga_client_id,
    "FBC": data.fbc,
    "Referrer": data.referrer,
    "Page Variant": "save_100_v1_nextjs",
    "User Language": data.language,
    "Event ID": `gen_${Date.now()}`,
    "Lead Type": "generate_lead"
  };

  try {
    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
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
