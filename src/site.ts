/**
 * Business details used across the site, in the footer and in the structured
 * data Google reads. Keep the name, address and phone (NAP) here identical to
 * the Facebook page and Google Business Profile — consistency helps local SEO.
 */

const phone = (display: string) => ({display, intl: `+27${display.replace(/\s/g, '').slice(1)}`});

export const site = {
  // TODO(launch): set to the real domain. Used for canonical URLs, the sitemap
  // and social-share previews, so change it before the site goes live.
  // The GitHub Pages demo build overrides it with VITE_SITE_URL.
  url: (import.meta.env.VITE_SITE_URL as string | undefined) || 'https://www.salonlauren.co.za',
  /** Demo builds tell search engines not to index the preview copy. */
  noindex: import.meta.env.VITE_NOINDEX === '1',
  name: 'Salon Lauren',
  tagline: 'Hair & Beauty Salon',
  address: {
    street: '54–56 Brighton Road',
    /** What Google Maps is searched for (the pin lands on no. 54). */
    mapQuery: '54 Brighton Road, Kraaifontein, 7570',
    suburb: 'Kraaifontein',
    city: 'Cape Town',
    region: 'Western Cape',
    postal: '7570',
    country: 'ZA',
  },
  phones: {
    salon: phone('076 029 7775'),
    nella: phone('074 845 7934'),
    kim: phone('071 379 9569'),
  },
  facebook: 'https://www.facebook.com/p/Salon-Lauren-100039893964206/',
  priceRange: 'R80 – R750',

  // Trading hours confirmed by the salon (November 2026). While true, they are
  // also published to Google in the structured data.
  hoursConfirmed: true,
  hours: [
    {days: 'Monday – Friday', time: '08:00 – 18:00', spec: {days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00'}},
    {days: 'Saturday', time: '08:00 – 16:00', spec: {days: ['Saturday'], opens: '08:00', closes: '16:00'}},
    {days: 'Sunday', time: 'Closed', spec: null},
  ],
};

export const fullAddress = `${site.address.street}, ${site.address.suburb}, ${site.address.city}, ${site.address.postal}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapQuery)}`;
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(site.address.mapQuery)}&output=embed`;

export const whatsapp = (intl: string, text = "Hi Salon Lauren, I'd like to book an appointment.") =>
  `https://wa.me/${intl.replace('+', '')}?text=${encodeURIComponent(text)}`;

export const tel = (intl: string) => `tel:${intl}`;

/** The main booking link: WhatsApp to Nella, who manages the diary. */
export const bookingUrl = whatsapp(site.phones.nella.intl);
