import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SlidersHorizontal, Sparkles } from 'lucide-react';
import productsData from '../data/products.json';
import { CategoryFilter, GarmentType, Product } from '../types/product';
import { ProductCard3D } from '../components/ProductCard3D';
import { useStore } from '../store/useStore';

gsap.registerPlugin(ScrollTrigger);

const products = productsData as Product[];

const CATEGORY_TABS: CategoryFilter[] = ['All', 'Men', 'Women', 'New', 'Sale'];
const GARMENT_FILTERS: ('All' | GarmentType)[] = [
  'All',
  'T-Shirts',
  'Shirts',
  'Trousers',
  'Polos & Knitwear',
];

export const ProductGridSection: React.FC = () => {
  const { activeCategory, setActiveCategory } = useStore();
  const [activeGarment, setActiveGarment] = useState<'All' | GarmentType>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>(
    'featured'
  );

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        activeCategory === 'All'
          ? true
          : activeCategory === 'Men' || activeCategory === 'Women'
          ? product.category === activeCategory
          : product.tags.includes(activeCategory);

      const matchesGarment =
        activeGarment === 'All' ? true : product.garmentType === activeGarment;

      return matchesCategory && matchesGarment;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  // Staggered GSAP ScrollTrigger reveal when section enters viewport
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.product-card-item');
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory, activeGarment]);

  return (
    <section
      id="collection"
      ref={sectionRef}
      className="py-24 sm:py-32 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-obsidian/10 dark:border-ivory/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.28em] text-champagne mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>01 / Curated Wardrobe Archive</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight">
              The Permanent{' '}
              <span className="italic font-normal text-champagne">Collection</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-stone-muted dark:text-stone-light max-w-md leading-relaxed">
            Every garment is numbered and cut in small batches from Belgian
            linen, extra-long staple Supima cotton, and mulberry silk. Hover to
            inspect secondary drape angles in 3D.
          </p>
        </div>

        {/* Filter Bar: Main Category Tabs + Garment Pills + Sort */}
        <div className="mt-10 flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Primary Category Tabs (All / Men / Women / New / Sale) */}
            <div className="inline-flex p-1.5 rounded-full bg-ivory-soft dark:bg-obsidian-card border border-obsidian/10 dark:border-ivory/10">
              {CATEGORY_TABS.map((tab) => {
                const isActive = activeCategory === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveCategory(tab)}
                    className={`relative px-4 sm:px-6 py-2 rounded-full text-xs font-mono uppercase tracking-[0.2em] transition-colors ${
                      isActive
                        ? 'text-obsidian font-semibold'
                        : 'text-stone-muted dark:text-stone-light hover:text-obsidian dark:hover:text-ivory'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="categoryTabHighlight"
                        transition={{
                          type: 'spring',
                          stiffness: 340,
                          damping: 28,
                        }}
                        className="absolute inset-0 rounded-full bg-champagne"
                      />
                    )}
                    <span className="relative z-10">{tab}</span>
                  </button>
                );
              })}
            </div>

            {/* Sort Selector & Count */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-stone-muted dark:text-stone-light">
                Showing {filteredProducts.length} of {products.length} Pieces
              </span>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-ivory-soft dark:bg-obsidian-card border border-obsidian/10 dark:border-ivory/10 text-xs font-mono">
                <SlidersHorizontal className="w-3.5 h-3.5 text-champagne" />
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as 'featured' | 'price-asc' | 'price-desc'
                    )
                  }
                  aria-label="Sort products"
                  className="bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="featured" className="bg-obsidian text-ivory">
                    Sort: Atelier Curated
                  </option>
                  <option value="price-asc" className="bg-obsidian text-ivory">
                    Price: Low to High (LKR)
                  </option>
                  <option value="price-desc" className="bg-obsidian text-ivory">
                    Price: High to Low (LKR)
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Secondary Garment Silhouette Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-muted mr-2">
              Silhouette:
            </span>
            {GARMENT_FILTERS.map((garment) => (
              <button
                key={garment}
                type="button"
                onClick={() => setActiveGarment(garment)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider border transition ${
                  activeGarment === garment
                    ? 'border-champagne bg-champagne/15 text-champagne font-semibold'
                    : 'border-obsidian/15 dark:border-ivory/15 text-stone-muted dark:text-stone-light hover:border-champagne/50'
                }`}
              >
                {garment}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Interactive Product Grid */}
        <motion.div
          ref={gridRef}
          layout
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35 }}
              >
                <ProductCard3D product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
