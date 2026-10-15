import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Heart,
  ShoppingBag,
  Ruler,
  ShieldCheck,
  Sparkles,
  Minus,
  Plus,
  Check,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatLKR } from '../assets/brandMeta';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    wishlist,
    setCartOpen,
  } = useStore();

  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);

  useEffect(() => {
    if (quickViewProduct) {
      setActiveImage(quickViewProduct.gallery[0] || quickViewProduct.image);
      setSelectedSize(
        quickViewProduct.sizes[Math.min(1, quickViewProduct.sizes.length - 1)] ||
          quickViewProduct.sizes[0]
      );
      setSelectedColorIndex(0);
      setQuantity(1);
      setShowSizeGuide(false);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isWishlisted = wishlist.includes(quickViewProduct.id);
  const chosenColor =
    quickViewProduct.colors[selectedColorIndex] || quickViewProduct.colors[0];

  const handleAddAndOpenBag = () => {
    addToCart(quickViewProduct, selectedSize, chosenColor, quantity);
    setQuickViewProduct(null);
    setCartOpen(true);
  };

  return (
    <AnimatePresence>
      {quickViewProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 z-[80] bg-obsidian/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-ivory dark:bg-obsidian-card border border-champagne/30 rounded-3xl overflow-hidden shadow-luxury-dark grid grid-cols-1 md:grid-cols-12 my-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setQuickViewProduct(null)}
              aria-label="Close Quick View"
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-obsidian/70 text-ivory hover:bg-champagne hover:text-obsidian flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Image Gallery */}
            <div className="md:col-span-6 bg-obsidian/5 dark:bg-black/40 p-4 sm:p-6 flex flex-col justify-between">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-obsidian/10">
                <img
                  src={activeImage}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] bg-obsidian/75 text-champagne border border-champagne/30 backdrop-blur-md">
                  {quickViewProduct.editionNumber}
                </span>
              </div>

              {/* Thumbnail Strip */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {quickViewProduct.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(imgUrl)}
                    className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition ${
                      activeImage === imgUrl
                        ? 'border-champagne scale-[1.02]'
                        : 'border-transparent opacity-65 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${quickViewProduct.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Product Specifications & Controls */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-champagne">
                  <span>{quickViewProduct.category}</span>
                  <span>•</span>
                  <span>{quickViewProduct.garmentType}</span>
                  <span>•</span>
                  <span>★ {quickViewProduct.rating} ({quickViewProduct.reviewsCount})</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-medium mt-2 leading-tight">
                  {quickViewProduct.name}
                </h2>
                <p className="text-xs font-mono text-stone-muted dark:text-stone-light mt-1">
                  {quickViewProduct.subtitle}
                </p>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-mono text-2xl font-semibold text-obsidian dark:text-ivory">
                    {formatLKR(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="font-mono text-sm line-through text-stone-muted">
                      {formatLKR(quickViewProduct.originalPrice)}
                    </span>
                  )}
                  <span className="text-[11px] font-mono text-heritage-sage uppercase">
                    Incl. Taxes
                  </span>
                </div>

                <p className="mt-4 text-sm text-obsidian/80 dark:text-ivory/80 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Fabric & Fit Specs */}
                <div className="mt-4 p-3.5 rounded-xl bg-obsidian/5 dark:bg-white/5 border border-obsidian/10 dark:border-ivory/10 text-xs space-y-1">
                  <p>
                    <span className="font-mono uppercase text-champagne mr-2">
                      Fabric:
                    </span>
                    {quickViewProduct.fabric}
                  </p>
                  <p>
                    <span className="font-mono uppercase text-champagne mr-2">
                      Silhouette:
                    </span>
                    {quickViewProduct.fit}
                  </p>
                </div>

                {/* Color Swatch Selector */}
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider mb-2">
                    <span>Colorway: {chosenColor.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {quickViewProduct.colors.map((color, idx) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColorIndex(idx)}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition ${
                          selectedColorIndex === idx
                            ? 'ring-2 ring-champagne ring-offset-2 ring-offset-ivory dark:ring-offset-obsidian scale-105'
                            : 'border-obsidian/30 dark:border-ivory/30 opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColorIndex === idx && (
                          <Check
                            className={`w-3.5 h-3.5 ${
                              color.hex.toLowerCase() > '#aaaaaa'
                                ? 'text-obsidian'
                                : 'text-ivory'
                            }`}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider mb-2">
                    <span>Select Size: {selectedSize}</span>
                    <button
                      type="button"
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="flex items-center gap-1 text-champagne hover:underline"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>{showSizeGuide ? 'Hide Size Guide' : 'Atelier Size Guide'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {quickViewProduct.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`py-2.5 rounded-xl font-mono text-xs uppercase border transition ${
                          selectedSize === size
                            ? 'bg-obsidian text-ivory dark:bg-champagne dark:text-obsidian border-champagne font-semibold'
                            : 'border-obsidian/15 dark:border-ivory/15 hover:border-champagne'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  {showSizeGuide && (
                    <div className="mt-3 p-3 rounded-xl bg-heritage-green/15 border border-champagne/30 text-[11px] font-mono space-y-1">
                      <p className="text-champagne uppercase">
                        Tailored 16–35 Proportion Guide:
                      </p>
                      <p>
                        • Tops (XS–XL): Relaxed shoulder drop; take your true size
                        for an editorial drape.
                      </p>
                      <p>
                        • Trousers (28–36): High-waisted Gurkha/pleated cut; sits
                        1 inch above the hip bone.
                      </p>
                    </div>
                  )}
                </div>

                {/* Quantity Controls */}
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider">
                    Quantity
                  </span>
                  <div className="flex items-center border border-obsidian/20 dark:border-ivory/20 rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2.5 hover:bg-obsidian/10 dark:hover:bg-ivory/10 transition"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 font-mono text-sm">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2.5 hover:bg-obsidian/10 dark:hover:bg-ivory/10 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-obsidian/10 dark:border-ivory/10 space-y-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleAddAndOpenBag}
                    className="flex-1 py-3.5 px-5 rounded-xl bg-champagne text-obsidian hover:bg-champagne-light font-mono text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 shadow-gold-glow transition"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      Add to Atelier Bag — {formatLKR(quickViewProduct.price * quantity)}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    aria-label="Toggle Wishlist"
                    className={`p-3.5 rounded-xl border transition ${
                      isWishlisted
                        ? 'bg-heritage-green text-champagne border-champagne'
                        : 'border-obsidian/20 dark:border-ivory/20 hover:border-champagne'
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isWishlisted ? 'fill-champagne' : ''}`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-stone-muted dark:text-stone-light pt-1">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-champagne" />
                    Complimentary Garment Bag Included
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-champagne" />
                    3-Day Colombo & Islandwide Courier
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
