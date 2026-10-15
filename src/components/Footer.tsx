import React from 'react';
import {
  Instagram,
  Globe,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '../store/useStore';

export const Footer: React.FC = () => {
  const { setActiveCategory } = useStore();

  const handleCategoryLink = (cat: 'All' | 'Men' | 'Women' | 'New' | 'Sale') => {
    setActiveCategory(cat);
    const el = document.getElementById('collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-obsidian text-ivory border-t border-champagne/25 pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-champagne/50 flex items-center justify-center font-serif text-champagne text-lg">
                OM
              </div>
              <div>
                <h3 className="font-serif text-2xl tracking-[0.2em] uppercase">
                  Old Money
                </h3>
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-champagne">
                  Quiet Luxury Atelier
                </p>
              </div>
            </div>

            <p className="text-sm text-ivory/70 leading-relaxed max-w-sm">
              Architectural heavyweight tees, Normandie linen camp shirts, and
              high-waisted Gurkha trousers tailored for the modern 16–35
              wardrobe. Crafted without loud logos.
            </p>

            <div className="pt-2 space-y-1.5 text-xs font-mono text-ivory/65">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-champagne" />
                No. 42 Horton Place, Cinnamon Gardens, Colombo 07
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-champagne" />
                +94 (11) 269 4400 • Private Concierge
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-champagne" />
                concierge@oldmoneyatelier.lk
              </p>
            </div>
          </div>

          {/* Archive Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-champagne">
              The Archive
            </h4>
            <ul className="space-y-2.5 text-sm text-ivory/75">
              <li>
                <button
                  onClick={() => handleCategoryLink('All')}
                  className="hover:text-champagne transition"
                >
                  All Collection Pieces (12)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryLink('Men')}
                  className="hover:text-champagne transition"
                >
                  Gentlemen’s Tailoring & Tees
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryLink('Women')}
                  className="hover:text-champagne transition"
                >
                  Ladies’ Silk Shirts & Trousers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryLink('New')}
                  className="hover:text-champagne transition"
                >
                  New Arrivals — Resort ’26
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryLink('Sale')}
                  className="hover:text-champagne transition"
                >
                  Private Archive Sale
                </button>
              </li>
            </ul>
          </div>

          {/* House & Craft */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-champagne">
              The House
            </h4>
            <ul className="space-y-2.5 text-sm text-ivory/75">
              <li>
                <a href="#lookbook" className="hover:text-champagne transition">
                  3D Lookbook ’26
                </a>
              </li>
              <li>
                <a href="#atelier" className="hover:text-champagne transition">
                  Fabric Provenance
                </a>
              </li>
              <li>
                <a href="#newsletter" className="hover:text-champagne transition">
                  Private Salon Access
                </a>
              </li>
              <li>
                <a href="#top" className="hover:text-champagne transition">
                  3D Garment Studio
                </a>
              </li>
            </ul>
          </div>

          {/* Socials & Currency */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-champagne">
              Connect & Currency
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Instagram', href: 'https://instagram.com' },
                { label: 'TikTok', href: 'https://tiktok.com' },
                { label: 'Pinterest', href: 'https://pinterest.com' },
              ].map((soc) => (
                <a
                  key={soc.label}
                  href={soc.href}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-full border border-white/15 hover:border-champagne hover:text-champagne text-xs font-mono flex items-center gap-1 transition"
                >
                  <span>{soc.label}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-1.5 text-champagne">
                  <Globe className="w-3.5 h-3.5" /> Sri Lanka (LKR)
                </span>
                <span className="text-ivory/60">Active</span>
              </div>
              <p className="text-[11px] text-ivory/60">
                All prices displayed in Sri Lankan Rupees (LKR) with duties
                included.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Badges & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-ivory/60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-champagne" />
            <span>
              © {new Date().getFullYear()} OLD MONEY CLOTHING ATELIER. ALL RIGHTS
              RESERVED.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {['VISA', 'MASTERCARD', 'AMEX', 'KOKO 3X', 'MINTPAY', 'APPLE PAY'].map(
              (method) => (
                <span
                  key={method}
                  className="px-2.5 py-1 rounded border border-white/15 bg-white/5 text-[10px] tracking-widest text-ivory/80"
                >
                  {method}
                </span>
              )
            )}
          </div>
        </div>

        {/* Giant Editorial Watermark */}
        <div className="mt-12 select-none pointer-events-none text-center">
          <p className="font-serif text-[12vw] leading-none tracking-[0.18em] uppercase text-white/[0.04]">
            OLD MONEY
          </p>
        </div>
      </div>
    </footer>
  );
};
