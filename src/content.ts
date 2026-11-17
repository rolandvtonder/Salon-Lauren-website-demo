/**
 * All page copy lives here, so prices and wording can be changed in one place.
 * Prices come from the salon's own flyers and Facebook posts. A service with no
 * `price` shows "Ask for a quote". TODO(launch): add those prices when ready.
 */

export type Line = {t: string; i?: boolean};

export type PriceItem = {name: string; note?: string; price?: string};

export type PriceGroup = {id: string; title: Line[]; intro: string; photo: string; items: PriceItem[]};

/** Headline lines; `i` lines are set in italic. */
export const hero = {
  lines: [
    {t: 'Beautiful hair'},
    {t: 'starts here.', i: true},
    {t: 'Cut, colour & care'},
    {t: 'in Kraaifontein', i: true},
  ] as Line[],
  body: 'A warm, friendly hair and beauty salon on Brighton Road. From precision cuts and full-head highlights to smoothing treatments and blow-dries, we look after every length and every texture.',
};

export type Signature = {
  id: string;
  name: [string, string];
  photo: string;
  specs: [string, string][];
  href: string;
  tint: string;
};

/** The three tall panels on the home page. */
export const signatures: Signature[] = [
  {
    id: 'cuts',
    name: ['Cut &', 'Style'],
    photo: 'black-bob',
    specs: [['For', 'Every length & texture'], ['Pensioners', 'Blow-dry R120, Mon – Thu']],
    href: '/services/#cuts',
    tint: '#3a2f2b',
  },
  {
    id: 'colour',
    name: ['Colour &', 'Highlights'],
    photo: 'sleek-highlights',
    specs: [['Full colour', 'R450 – R750'], ['Highlights', 'From R500']],
    href: '/services/#colour',
    tint: '#c9a492',
  },
  {
    id: 'treatments',
    name: ['Smoothing &', 'Treatments'],
    photo: 'glossy-layers',
    specs: [['Result', 'Sleek, glossy, manageable'], ['Products', 'Professional salon ranges']],
    href: '/services/#treatments',
    tint: '#d9cdd8',
  },
];

export const about = {
  kicker: 'Welcome to Salon Lauren',
  lines: [{t: 'Hair care'}, {t: '& treatment,', i: true}, {t: 'done with heart.'}] as Line[],
  body: [
    "Salon Lauren is a neighbourhood hair and beauty salon at Shop 54, Brighton Road in Kraaifontein. Our stylists work with every hair type — fine, thick, curly, coily, relaxed or colour-treated — and we take the time to get it right.",
    'Under the same roof, L. Beauty offers gel nails, pedicures, waxing, lash lifts and massages, so you can leave looking and feeling your best.',
  ],
};

export const services: PriceGroup[] = [
  {
    id: 'cuts',
    title: [{t: 'Cuts &'}, {t: 'styling', i: true}],
    intro: 'Precision cuts, tapers and bobs, finished with a professional blow-dry or set.',
    photo: 'black-bob',
    items: [
      {name: "Ladies' cut & blow-dry"},
      {name: 'Wash & blow-dry'},
      {name: 'Pensioner blow-dry', note: 'Monday to Thursday', price: 'R120'},
      {name: 'Short cuts, tapers & pixies'},
      {name: 'Curls, waves & sets'},
      {name: 'Updos & occasion styling'},
    ],
  },
  {
    id: 'colour',
    title: [{t: 'Colour &'}, {t: 'highlights', i: true}],
    intro: 'From natural brunettes to icy silver and fashion pinks — always finished with a treatment.',
    photo: 'sleek-highlights',
    items: [
      {name: 'Full colour', note: 'Includes a free trim & treatment', price: 'R450 – R750'},
      {name: 'Full-head highlights', note: 'All lengths. Includes treatment, toner excluded', price: 'R750'},
      {name: 'Half-head highlights', note: 'All lengths. Includes treatment, toner excluded', price: 'R500'},
      {name: 'Toner & gloss'},
      {name: 'Root touch-up'},
      {name: 'Fashion colour', note: 'Pinks, plums, coppers'},
    ],
  },
  {
    id: 'treatments',
    title: [{t: 'Smoothing &'}, {t: 'treatments', i: true}],
    intro: 'Tame frizz, add shine and bring tired hair back to life with professional products.',
    photo: 'glossy-layers',
    items: [
      {name: 'Smoothing & straightening treatment'},
      {name: 'Deep-conditioning treatment'},
      {name: 'Trim & treatment'},
      {name: 'Professional hair-care products', note: 'We stock products for all our clients’ needs', price: 'In salon'},
    ],
  },
];

export type Special = {price: string; title: string; detail: string; photo: string};

export const specials: Special[] = [
  {price: 'R750', title: 'Full-head highlights', detail: 'All lengths. Includes a treatment; toner excluded.', photo: 'highlights-blonde'},
  {price: 'R500', title: 'Half-head highlights', detail: 'All lengths. Includes a treatment; toner excluded.', photo: 'highlights-contrast'},
  {price: 'R450 – R750', title: 'Full colour special', detail: 'With a free trim & treatment.', photo: 'copper-bob'},
  {price: 'R120', title: 'Pensioner blow-dry', detail: 'Monday to Thursday.', photo: 'ba-grey-bob'},
];

export type Member = {name: string; role: string; bio: string; contact?: {label: string; phone: 'salon' | 'nella' | 'kim'}};

// TODO(launch): check names, roles and bios with the team; add portraits by
// listing a `photo` slug here and in src/data/photos.json.
export const team: Member[] = [
  {name: 'Lauren', role: 'Owner & stylist', bio: 'Lauren built Salon Lauren on honest advice and beautiful, easy-to-wear hair. Ask her about cuts, colour and smoothing.'},
  {name: 'Nella', role: 'Hairstylist · bookings', bio: 'Nella looks after the diary. WhatsApp her to book or to ask about this month’s specials.', contact: {label: 'WhatsApp Nella', phone: 'nella'}},
  {name: 'Zelda', role: 'Hairstylist', bio: 'Our newest stylist — please join us in giving Zelda a warm welcome to Salon Lauren.'},
  {name: 'Kim', role: 'L. Beauty · nails, waxing, lashes & massage', bio: 'Kim runs L. Beauty from the salon: gel nails, pedicures, waxing, lash lifts and massages.', contact: {label: 'WhatsApp Kim', phone: 'kim'}},
];

export const beauty = {
  intro: 'Ready to turn hands into masterpieces? Gel nails, pedicures, waxing, lash lifts and massages — your dream nails are just one appointment away.',
  groups: [
    {
      id: 'nails',
      title: [{t: 'Nails'}, {t: '& pedicures', i: true}],
      items: [
        {name: 'Gel polish', price: 'R180'},
        {name: 'Rubber-base gel polish', price: 'R200'},
        {name: 'Gel full-cover tips', price: 'R280'},
        {name: 'Soak-off', price: 'R80'},
        {name: 'Pedicure with gel', price: 'R300'},
        {name: 'Pedicure without gel polish'},
      ],
    },
    {
      id: 'waxing',
      title: [{t: 'Waxing'}],
      items: [
        {name: 'Brow wax', price: 'R80'},
        {name: 'Lip wax', price: 'R80'},
        {name: 'Chin wax', price: 'R80'},
        {name: 'Underarm wax', price: 'R180'},
        {name: 'Half-leg wax', price: 'R150'},
        {name: 'Full-leg wax', price: 'R250'},
        {name: 'Bikini wax', price: 'R150'},
        {name: 'Brazilian wax', price: 'R280'},
        {name: 'Hollywood wax', price: 'R350'},
      ],
    },
    {
      id: 'lashes',
      title: [{t: 'Lashes'}, {t: '& brows', i: true}],
      items: [
        {name: 'Lash lift with tint', price: 'R260'},
        {name: 'Tint', price: 'R80'},
      ],
    },
    {
      id: 'massage',
      title: [{t: 'Massage'}],
      items: [
        {name: 'Back & neck massage', note: '30 minutes', price: 'R150'},
        {name: 'Full-body massage', note: '60 minutes', price: 'R300'},
      ],
    },
  ] as {id: string; title: Line[]; items: PriceItem[]}[],
};

export const galleryFilters = [
  {id: 'all', label: 'All'},
  {id: 'before-after', label: 'Before & after'},
  {id: 'colour', label: 'Colour'},
  {id: 'cuts', label: 'Cuts'},
  {id: 'styling', label: 'Styling'},
  {id: 'treatments', label: 'Smoothing'},
];

/** Order of photos on the gallery page (slugs from src/data/photos.json). */
export const galleryOrder = [
  'ba-smooth-plum', 'hero-balayage-waves', 'ba-silver-pixie', 'pink-fringe-bob', 'ba-smooth-long', 'sleek-highlights',
  'black-bob', 'ba-auburn-crop', 'balayage-waves-2', 'copper-bob', 'ba-smooth-shoulder', 'updo-pins',
  'highlights-blonde', 'ba-grey-bob', 'defined-curls', 'short-taper', 'ba-brown-bob', 'copper-highlights',
  'plum-bob', 'ba-black-crop', 'glossy-layers', 'highlights-contrast', 'undercut-crop', 'curly-blowout',
  'outdoor-bob', 'updo-braid', 'highlights-straight', 'pixie-grey', 'copper-crop', 'balayage-waves-3',
  'highlights-honey', 'short-grey',
];
