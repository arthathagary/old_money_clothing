import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Sparkles,
  ShoppingBag,
  Eye,
} from 'lucide-react';
import { LOOKBOOK_SLIDES } from '../data/lookbook';
import productsData from '../data/products.json';
import { Product } from '../types/product';
import { useStore } from '../store/useStore';
import { BRAND_META, formatLKR } from '../assets/brandMeta';

const products = productsData as Product[];

export const FeaturedCollectionSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { setQuickViewProduct, addToCart } = useStore();

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? LOOKBOOK_SLIDES.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === LOOKBOOK_SLIDES.length - 1 ? 0 : prev + 1
    );
  };

  const activeSlide = LOOKBOOK_SLIDES[activeIndex];
  const pairedProducts = products.filter((p) =>
    activeSlide.featuredProductIds.includes(p.id)
  );

  return (
    <section
      id="lookbook"
      className="py-24 sm:py-32 bg-ivory-soft/70 dark:bg-obsidian-card/60 border-y border-obsidian/10 dark:border-ivory/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.28em] text-champagne mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>02 / 3D Cover-Flow Lookbook</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight">
              The Autumn / Resort{' '}
              <span className="italic font-normal text-champagne">’26 Edit</span>
            </h2>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono tracking-[0.25em] text-stone-muted dark:text-stone-light mr-2">
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(LOOKBOOK_SLIDES.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Look"
              className="w-11 h-11 rounded-full border border-obsidian/20 dark:border-ivory/20 hover:border-champagne hover:bg-champagne hover:text-obsidian flex items-center justify-center transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Look"
              className="w-11 h-11 rounded-full border border-obsidian/20 dark:border-ivory/20 hover:border-champagne hover:bg-champagne hover:text-obsidian flex items-center justify-center transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D Cover-Flow Stage */}
        <div
          className="relative h-[440px] sm:h-[520px] flex items-center justify-center"
          style={{ perspective: '1400px' }}
        >
          {LOOKBOOK_SLIDES.map((slide, index) => {
            // Calculate circular offset for smooth cover-flow wrapping
            let offset = index - activeIndex;
            if (offset > Math.floor(LOOKBOOK_SLIDES.length / 2)) {
              offset -= LOOKBOOK_SLIDES.length;
            } else if (offset < -Math.floor(LOOKBOOK_SLIDES.length / 2)) {
              offset += LOOKBOOK_SLIDES.length;
            }

            const isActive = offset === 0;
            const translateX = offset * 260;
            const translateZ = isActive ? 0 : -Math.abs(offset) * 180;
            const rotateY = offset * -28;
            const opacity = Math.abs(offset) > 2 ? 0 : isActive ? 1 : 0.55;
            const zIndex = 20 - Math.abs(offset);

            return (
              <motion.div
                key={slide.id}
                onClick={() => setActiveIndex(index)}
                animate={{
                  x: translateX,
                  z: translateZ,
                  rotateY,
                  scale: isActive ? 1 : 0.86,
                  opacity,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 220,
                  damping: 26,
                }}
                style={{
                  zIndex,
                  transformStyle: 'preserve-3d',
                }}
                data-cursor={isActive ? 'ACTIVE' : 'SELECT'}
                className="absolute w-[280px] sm:w-[360px] md:w-[410px] aspect-[3/4] rounded-3xl overflow-hidden border border-champagne/40 shadow-luxury-dark cursor-pointer select-none group"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/25 to-transparent" />

                {/* Top Roman Numeral & Location */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-ivory/90">
                  <span className="px-3 py-1 rounded-full bg-obsidian/70 border border-champagne/40 text-champagne backdrop-blur-md">
                    {slide.romanNumeral}
                  </span>
                  <span className="flex items-center gap-1 bg-obsidian/60 px-2.5 py-1 rounded-full backdrop-blur-md">
                    <MapPin className="w-3 h-3 text-champagne" />
                    {slide.season}
                  </span>
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-5 left-5 right-5 text-ivory">
                  <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-champagne">
                    {slide.subtitle}
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl mt-0.5">
                    {slide.title}
                  </h3>
                  <p className="text-xs text-ivory/75 mt-1.5 line-clamp-2">
                    {slide.location}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Active Look Details & Shop-The-Look Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="mt-12 p-6 sm:p-8 rounded-3xl bg-ivory dark:bg-obsidian border border-obsidian/10 dark:border-ivory/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-champagne">
                <span>{activeSlide.romanNumeral}</span>
                <span>•</span>
                <span>{activeSlide.location}</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl">
                {activeSlide.title}
              </h3>
              <p className="text-sm text-stone-muted dark:text-stone-light leading-relaxed">
                {activeSlide.description}
              </p>
            </div>

            {/* Paired Shop-the-Look Garments */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pairedProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-ivory-soft dark:bg-obsidian-card border border-obsidian/10 dark:border-ivory/10 hover:border-champagne/50 transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    onClick={() => setQuickViewProduct(item)}
                    className="w-20 h-24 object-cover rounded-xl cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-champagne">
                      {item.editionNumber}
                    </p>
                    <h4
                      onClick={() => setQuickViewProduct(item)}
                      className="font-serif text-base font-medium truncate cursor-pointer hover:text-champagne"
                    >
                      {item.name}
                    </h4>
                    <p className="text-xs font-mono mt-1">
                      {formatLKR(item.price)}
                    </p>

                    <div className="mt-2.5 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => addToCart(item)}
                        className="px-3 py-1.5 rounded-lg bg-obsidian text-ivory dark:bg-champagne dark:text-obsidian text-[10px] font-mono uppercase tracking-wider font-semibold flex items-center gap-1"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuickViewProduct(item)}
                        className="px-2.5 py-1.5 rounded-lg border border-obsidian/15 dark:border-ivory/15 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 hover:border-champagne"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Atelier Craftsmanship Pillars */}
        <div
          id="atelier"
          className="mt-24 pt-16 border-t border-obsidian/10 dark:border-ivory/10 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {BRAND_META.pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="p-6 sm:p-8 rounded-2xl bg-ivory dark:bg-obsidian border border-obsidian/10 dark:border-ivory/10 hover:border-champagne/40 transition"
            >
              <span className="font-mono text-xs tracking-[0.25em] text-champagne">
                PILLAR {pillar.number}
              </span>
              <h3 className="font-serif text-2xl mt-2 mb-3">{pillar.title}</h3>
              <p className="text-sm text-stone-muted dark:text-stone-light leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
