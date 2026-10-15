import React, { Suspense, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDownRight, Sparkles, Compass, Shirt } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Garment3DMode } from '../components/HeroScene3D';

const HeroScene3D = React.lazy(() => import('../components/HeroScene3D'));

const ATELIER_DYE_SWATCHES = [
  { name: 'Heritage Forest', hex: '#1B352A' },
  { name: 'Alabaster Silk', hex: '#F4F0E8' },
  { name: 'Liquid Champagne', hex: '#C8AE7D' },
  { name: 'Nocturne Espresso', hex: '#231D1A' },
  { name: 'Regatta Navy', hex: '#1B2A3D' },
];

export const HeroSection: React.FC = () => {
  const { theme } = useStore();
  // Default to the Pleated Silk Dress on Atelier Mannequin so it immediately showcases a dress/clothing form
  const [garmentMode, setGarmentMode] = useState<Garment3DMode>('dress');
  const [fabricColor, setFabricColor] = useState<string>('#1B352A');

  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.45,
      });

      tl.fromTo(
        badgeRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          titleRef.current,
          { y: 48, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.05 },
          '-=0.5'
        )
        .fromTo(
          subtitleRef.current,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85 },
          '-=0.65'
        )
        .fromTo(
          ctaRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.55'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-[92vh] w-full overflow-hidden flex items-center pt-8 pb-20"
    >
      {/* Subtle Architectural Grid Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #C5A059 1px, transparent 1px), linear-gradient(to bottom, #C5A059 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Ambient Radial Luxury Glows */}
      <div className="pointer-events-none absolute -top-32 right-1/4 w-[520px] h-[520px] rounded-full bg-champagne/15 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 left-10 w-[440px] h-[440px] rounded-full bg-heritage-green/30 blur-[120px]" />

      {/* 3D Clothing & Dress Mannequin Stage */}
      <div className="absolute inset-0 lg:left-[34%] z-10 opacity-90 lg:opacity-100">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border border-champagne/40 animate-pulse flex items-center justify-center font-mono text-[10px] tracking-widest uppercase text-champagne">
                3D Garment
              </div>
            </div>
          }
        >
          <HeroScene3D
            mode={garmentMode}
            theme={theme}
            fabricColor={fabricColor}
          />
        </Suspense>
      </div>

      {/* Foreground Editorial Copy */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pointer-events-none">
        <div className="max-w-2xl pointer-events-auto">
          {/* Edition Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-ivory/80 dark:bg-obsidian-card/85 border border-champagne/35 backdrop-blur-md mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-obsidian dark:text-ivory">
              Autumn / Resort ’26 • Quiet Luxury Archive
            </span>
          </div>

          {/* Main Editorial Headline */}
          <h1
            ref={titleRef}
            className="font-serif text-5xl sm:text-7xl lg:text-[5.25rem] leading-[0.98] tracking-tight text-obsidian dark:text-ivory"
          >
            Whispered{' '}
            <span className="italic font-normal text-champagne">Heritage.</span>
            <br />
            Modern Drape.
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="mt-6 text-base sm:text-lg text-obsidian/80 dark:text-ivory/80 max-w-xl leading-relaxed font-sans"
          >
            Tailored for the 16–35 silhouette without a single loud logo. Explore
            310 GSM Supima cotton tees, Normandie linen camp shirts, pleated
            dresses, and Gurkha trousers crafted for timeless composure.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#collection"
              data-cursor="SHOP"
              className="px-8 py-4 rounded-full bg-obsidian text-ivory dark:bg-champagne dark:text-obsidian hover:bg-champagne hover:text-obsidian dark:hover:bg-champagne-light font-mono text-xs uppercase tracking-[0.22em] font-semibold flex items-center gap-3 shadow-gold-glow transition-all"
            >
              <span>Shop Now</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>

            <a
              href="#lookbook"
              data-cursor="LOOKS"
              className="px-7 py-4 rounded-full bg-ivory/75 dark:bg-obsidian-card/75 hover:border-champagne border border-obsidian/20 dark:border-ivory/20 backdrop-blur-md font-mono text-xs uppercase tracking-[0.22em] transition-all"
            >
              3D Lookbook ’26
            </a>
          </div>

          {/* Interactive 3D Garment & Fabric Dye Customizer HUD */}
          <div className="mt-10 p-4 rounded-2xl bg-ivory/80 dark:bg-obsidian-card/85 border border-obsidian/15 dark:border-ivory/15 backdrop-blur-md space-y-3.5 max-w-xl">
            {/* Garment Selector */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Shirt className="w-4 h-4 text-champagne" />
                <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-stone-muted dark:text-stone-light">
                  3D Garment Piece:
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {(
                  [
                    { id: 'dress', label: 'I. Pleated Silk Dress' },
                    { id: 'shirt', label: 'II. Cuban Shirt on Hanger' },
                    { id: 'ensemble', label: 'III. Tee & Gurkha Trousers' },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setGarmentMode(item.id)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition ${
                      garmentMode === item.id
                        ? 'bg-champagne text-obsidian font-semibold shadow-sm'
                        : 'bg-obsidian/5 dark:bg-white/5 hover:border-champagne/40 border border-transparent text-stone-muted dark:text-stone-light'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live 3D Fabric Swatch Picker */}
            <div className="pt-2.5 border-t border-obsidian/10 dark:border-ivory/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-stone-muted dark:text-stone-light">
                  Fabric Dye:
                </span>
                <div className="flex items-center gap-2">
                  {ATELIER_DYE_SWATCHES.map((swatch) => (
                    <button
                      key={swatch.hex}
                      type="button"
                      onClick={() => setFabricColor(swatch.hex)}
                      title={swatch.name}
                      aria-label={`Change 3D garment color to ${swatch.name}`}
                      className={`w-5 h-5 rounded-full border transition-transform ${
                        fabricColor === swatch.hex
                          ? 'scale-125 ring-2 ring-champagne ring-offset-2 ring-offset-ivory dark:ring-offset-obsidian'
                          : 'border-obsidian/30 dark:border-ivory/30 opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: swatch.hex }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-mono text-stone-muted dark:text-stone-light">
                <Compass
                  className="w-3.5 h-3.5 text-champagne animate-spin"
                  style={{ animationDuration: '14s' }}
                />
                <span>HOVER TO TILT 3D GARMENT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
