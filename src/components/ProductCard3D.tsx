import React, { useState } from 'react';
import { Eye, Heart, ShoppingBag, Sparkles } from 'lucide-react';
import { Product } from '../types/product';
import { useTilt3D } from '../hooks/useTilt3D';
import { useStore } from '../store/useStore';
import { formatLKR } from '../assets/brandMeta';

interface ProductCard3DProps {
  product: Product;
}

export const ProductCard3D: React.FC<ProductCard3DProps> = ({ product }) => {
  const { tilt, handleMouseMove, handleMouseLeave } = useTilt3D(9);
  const { addToCart, toggleWishlist, wishlist, setQuickViewProduct } = useStore();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div
      className="product-card-item group relative perspective-[1200px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          transform: tilt.isHovered
            ? `perspective(1100px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.015, 1.015, 1.015)`
            : 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: tilt.isHovered
            ? 'transform 120ms ease-out'
            : 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)',
          transformStyle: 'preserve-3d',
        }}
        className="relative rounded-2xl bg-ivory-soft/90 dark:bg-obsidian-card/95 border border-obsidian/10 dark:border-ivory/10 overflow-hidden shadow-luxury dark:shadow-luxury-dark transition-shadow duration-500 group-hover:shadow-gold-glow group-hover:border-champagne/50"
      >
        {/* Dynamic Cursor-Following Soft Glow */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(420px circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(197, 160, 89, 0.22), transparent 65%)`,
          }}
        />

        {/* Image Stage */}
        <div
          className="relative aspect-[3/4] w-full overflow-hidden bg-obsidian/5 dark:bg-black/30 cursor-pointer"
          onClick={() => setQuickViewProduct(product)}
          data-cursor="VIEW"
        >
          {/* Primary Image */}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-105"
          />

          {/* Secondary Hover Image */}
          <img
            src={product.hoverImage}
            alt={`${product.name} alternate view`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-0 scale-105 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-100"
          />

          {/* Subtle Bottom Vignette */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-obsidian/70 via-obsidian/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

          {/* Top Left Badges */}
          <div className="absolute top-3.5 left-3.5 z-20 flex flex-wrap gap-1.5">
            {product.tags.includes('New') && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] bg-heritage-green text-ivory border border-champagne/40">
                New Drop
              </span>
            )}
            {product.tags.includes('Sale') && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] bg-champagne text-obsidian font-semibold">
                Archive Sale
              </span>
            )}
            {product.tags.includes('Limited') && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] bg-obsidian/80 text-champagne border border-champagne/40 backdrop-blur-md flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> Limited
              </span>
            )}
          </div>

          {/* Top Right Wishlist Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            aria-label={`Save ${product.name} to wishlist`}
            className={`absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
              isWishlisted
                ? 'bg-champagne text-obsidian border-champagne scale-105'
                : 'bg-obsidian/45 text-ivory border-white/15 hover:bg-obsidian/75 hover:border-champagne/60'
            }`}
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? 'fill-obsidian' : ''}`}
            />
          </button>

          {/* Edition Coordinate Stamp */}
          <span className="absolute bottom-14 left-3.5 z-20 text-[10px] font-mono tracking-[0.22em] text-ivory/80 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {product.editionNumber} • {product.garmentType}
          </span>

          {/* Hover Action Bar (Quick View + Add to Cart) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-3 bottom-3 z-20 flex items-center gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
          >
            <button
              type="button"
              onClick={() => addToCart(product, product.sizes[1] || product.sizes[0], selectedColor, 1)}
              className="flex-1 py-2.5 px-3 rounded-xl bg-ivory text-obsidian hover:bg-champagne hover:text-obsidian text-xs font-mono uppercase tracking-[0.16em] font-medium flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </button>

            <button
              type="button"
              onClick={() => setQuickViewProduct(product)}
              aria-label={`Quick view ${product.name}`}
              className="p-2.5 rounded-xl bg-obsidian/85 text-ivory hover:bg-champagne hover:text-obsidian border border-ivory/20 transition-colors"
              title="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card Content Details */}
        <div className="p-4 sm:p-5 relative z-20">
          <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.2em] uppercase text-stone-muted dark:text-stone-light mb-1.5">
            <span>
              {product.category} • {product.garmentType}
            </span>
            <span>★ {product.rating.toFixed(1)}</span>
          </div>

          <h3
            onClick={() => setQuickViewProduct(product)}
            className="font-serif text-lg sm:text-xl font-medium leading-snug cursor-pointer hover:text-champagne transition-colors line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-stone-muted dark:text-stone-light line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>

          {/* Price & Color Swatches Row */}
          <div className="mt-4 pt-3 border-t border-obsidian/10 dark:border-ivory/10 flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-sm sm:text-base font-semibold text-obsidian dark:text-ivory">
                {formatLKR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="font-mono text-xs line-through text-stone-muted">
                  {formatLKR(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Interactive Color Swatches */}
            <div className="flex items-center gap-1.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  title={color.name}
                  aria-label={`Select color ${color.name}`}
                  className={`w-4 h-4 rounded-full border transition-transform ${
                    selectedColor.name === color.name
                      ? 'scale-125 ring-1 ring-champagne ring-offset-1 ring-offset-ivory dark:ring-offset-obsidian'
                      : 'border-obsidian/25 dark:border-ivory/25 opacity-75 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
