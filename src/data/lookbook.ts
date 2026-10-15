export interface LookbookSlide {
  id: string;
  romanNumeral: string;
  title: string;
  subtitle: string;
  location: string;
  season: string;
  image: string;
  description: string;
  featuredProductIds: string[];
  accentHex: string;
}

export const LOOKBOOK_SLIDES: LookbookSlide[] = [
  {
    id: 'look-01',
    romanNumeral: 'LOOK I',
    title: 'The Galle Fort Veranda',
    subtitle: 'Belgian Flax & Mercerized Cotton',
    location: 'Galle Fort • 06°01′N 80°13′E',
    season: 'Monsoon / Resort ’26',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
    description:
      'High-waisted Gurkha linen trousers paired with our 310 GSM Mercer Supima Tee. Unhurried structure crafted for tropical humidity and colonial architecture.',
    featuredProductIds: ['omc-001', 'omc-002'],
    accentHex: '#C5A059',
  },
  {
    id: 'look-02',
    romanNumeral: 'LOOK II',
    title: 'Lake Como Regatta Club',
    subtitle: 'Cuban Collars & Mother-of-Pearl',
    location: 'Bellagio • Villa Serbelloni',
    season: 'Summer Heritage ’26',
    image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1200&q=85',
    description:
      'Rolled one-piece camp collars in Normandie linen-silk blend worn untucked over relaxed drawstring trousers for effortless coastal composure.',
    featuredProductIds: ['omc-003', 'omc-010'],
    accentHex: '#274E3E',
  },
  {
    id: 'look-03',
    romanNumeral: 'LOOK III',
    title: 'Mayfair Morning Conservatory',
    subtitle: 'Elongated Pleats & Two-Ply Poplin',
    location: 'Mount Street • London',
    season: 'Autumn Atelier ’26',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    description:
      'Architectural wide-leg palazzo trousers in Tencel-Merino crepe paired with borrowed-from-the-tailor Egyptian cotton poplin shirting.',
    featuredProductIds: ['omc-004', 'omc-005'],
    accentHex: '#C2A382',
  },
  {
    id: 'look-04',
    romanNumeral: 'LOOK IV',
    title: 'Royal Colombo Lawn Tennis',
    subtitle: '16-Gauge Silk-Cotton Knitwear',
    location: 'Cinnamon Gardens • Colombo 07',
    season: 'Club Capsule ’26',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
    description:
      'Sporting heritage reimagined for ages 16–35: open-placket Johnny collar knit polos and cable-knit cricket tees with contrast forest tipping.',
    featuredProductIds: ['omc-006', 'omc-009'],
    accentHex: '#1B352A',
  },
  {
    id: 'look-05',
    romanNumeral: 'LOOK V',
    title: 'Nocturne at The Tintagel',
    subtitle: 'Liquid Champagne Silk & Mock Necks',
    location: 'Rosmead Place • Private Salon',
    season: 'Evening Edit ’26',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85',
    description:
      'Lustrous mulberry silk-blend shirting and elevated mock-neck heavyweight tees designed for candlelit courtyards and gallery openings.',
    featuredProductIds: ['omc-011', 'omc-012'],
    accentHex: '#DFC286',
  },
];
