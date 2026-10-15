export const BRAND_META = {
  name: 'OLD MONEY',
  fullName: 'Old Money Clothing Atelier',
  established: 'EST. MMXXIV • COLOMBO & MILAN',
  currency: 'LKR',
  freeShippingThreshold: 25000,
  marqueeItems: [
    'FREE SHIPPING OVER LKR 25,000',
    'NEW DROP: AUTUMN / RESORT ’26 ARCHIVE',
    'LIMITED STOCK PER EDITION',
    'COMPLIMENTARY ATELIER MONOGRAMMING',
    'ISLANDWIDE EXPRESS DELIVERY (LKR) • KOKO & MINTPAY AVAILABLE',
  ],
  pillars: [
    {
      number: '01',
      title: 'Zero Loud Logos',
      description:
        'True luxury whispers. Every garment is identified by its drape, stitch density, and a discreet tonal interior crest.',
    },
    {
      number: '02',
      title: 'Heritage Natural Fibers',
      description:
        '310 GSM Supima cotton, Belgian flax linen, and mulberry silk blends engineered to breathe in tropical and temperate climates alike.',
    },
    {
      number: '03',
      title: 'Modern Tailored Proportions',
      description:
        'Cut specifically for the 16–35 silhouette—combining classic high-waisted pleats and camp collars with relaxed architectural shoulders.',
    },
  ],
};

export function formatLKR(amount: number): string {
  return `LKR ${amount.toLocaleString('en-LK')}`;
}
