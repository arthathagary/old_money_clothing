import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import productsData from '../data/products.json';
import { Product } from '../types/product';
import { formatLKR } from '../assets/brandMeta';

const products = productsData as Product[];

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setWishlistOpen,
    toggleWishlist,
    addToCart,
    setQuickViewProduct,
  } = useStore();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setWishlistOpen(false)}
            className="fixed inset-0 z-[75] bg-obsidian/70 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 bottom-0 z-[80] w-full max-w-md bg-ivory dark:bg-obsidian border-l border-champagne/25 flex flex-col justify-between shadow-luxury-dark"
          >
            <div className="p-6 border-b border-obsidian/10 dark:border-ivory/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Heart className="w-5 h-5 text-champagne fill-champagne" />
                <h2 className="font-serif text-2xl tracking-wider uppercase">
                  Private Wishlist
                </h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-champagne/20 text-champagne">
                  {wishlistedProducts.length}
                </span>
              </div>
              <button
                onClick={() => setWishlistOpen(false)}
                className="p-2 rounded-full hover:bg-obsidian/10 dark:hover:bg-ivory/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {wishlistedProducts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <Heart className="w-10 h-10 text-champagne/50 mb-3" />
                  <h3 className="font-serif text-2xl mb-1">
                    No Saved Archive Pieces
                  </h3>
                  <p className="text-xs text-stone-muted dark:text-stone-light max-w-xs">
                    Tap the heart icon on any piece to curate your personal
                    quiet-luxury wardrobe.
                  </p>
                </div>
              ) : (
                wishlistedProducts.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3.5 rounded-2xl bg-ivory-soft dark:bg-obsidian-card border border-obsidian/10 dark:border-ivory/10"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      onClick={() => {
                        setQuickViewProduct(item);
                        setWishlistOpen(false);
                      }}
                      className="w-20 h-24 object-cover rounded-xl cursor-pointer"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4
                            onClick={() => {
                              setQuickViewProduct(item);
                              setWishlistOpen(false);
                            }}
                            className="font-serif text-base font-medium truncate cursor-pointer hover:text-champagne"
                          >
                            {item.name}
                          </h4>
                          <button
                            onClick={() => toggleWishlist(item.id)}
                            className="text-stone-muted hover:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs font-mono text-champagne mt-0.5">
                          {formatLKR(item.price)}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          addToCart(item);
                          setWishlistOpen(false);
                        }}
                        className="mt-2 py-2 px-3 rounded-lg bg-obsidian text-ivory dark:bg-ivory dark:text-obsidian hover:bg-champagne dark:hover:bg-champagne text-[11px] font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
