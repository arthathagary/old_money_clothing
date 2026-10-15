import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Truck,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { BRAND_META, formatLKR } from '../assets/brandMeta';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discountAmount = discountApplied ? Math.round(subtotal * 0.1) : 0;
  const finalTotal = subtotal - discountAmount;

  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / BRAND_META.freeShippingThreshold) * 100)
  );
  const remainingForFreeShipping = Math.max(
    0,
    BRAND_META.freeShippingThreshold - subtotal
  );

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'OLDMONEY10') {
      setDiscountApplied(true);
    }
  };

  const handleSimulatedCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      clearCart();
      setCheckoutSuccess(false);
      setCartOpen(false);
    }, 3200);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[75] bg-obsidian/70 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 bottom-0 z-[80] w-full max-w-md bg-ivory dark:bg-obsidian border-l border-champagne/25 flex flex-col justify-between shadow-luxury-dark"
          >
            {/* Header */}
            <div className="p-6 border-b border-obsidian/10 dark:border-ivory/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-champagne" />
                  <h2 className="font-serif text-2xl tracking-wider uppercase">
                    Atelier Bag
                  </h2>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-champagne/20 text-champagne">
                    {cart.reduce((sum, i) => sum + i.quantity, 0)}
                  </span>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  aria-label="Close Bag"
                  className="p-2 rounded-full hover:bg-obsidian/10 dark:hover:bg-ivory/10 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Bar */}
              <div className="mt-4 p-3 rounded-xl bg-obsidian/5 dark:bg-white/5 border border-obsidian/10 dark:border-ivory/10">
                <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-champagne" />
                    {remainingForFreeShipping === 0
                      ? 'Complimentary Express Courier Unlocked'
                      : `Add ${formatLKR(remainingForFreeShipping)} for Free Courier`}
                  </span>
                  <span className="text-champagne">{freeShippingProgress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-obsidian/10 dark:bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${freeShippingProgress}%` }}
                    className="h-full bg-champagne"
                  />
                </div>
              </div>
            </div>

            {/* Body: Cart Items or Empty State */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {checkoutSuccess ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-heritage-green text-champagne flex items-center justify-center mb-4 border border-champagne">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl mb-2">
                    Atelier Order Reserved
                  </h3>
                  <p className="text-sm text-stone-muted dark:text-stone-light max-w-xs">
                    Your bespoke selection has been logged in our demo storefront.
                    Thank you for experiencing Old Money Clothing.
                  </p>
                </motion.div>
              ) : cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="w-16 h-16 rounded-full border border-champagne/30 flex items-center justify-center mb-4 text-champagne">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl mb-1">
                    Your Atelier Bag is Empty
                  </h3>
                  <p className="text-xs text-stone-muted dark:text-stone-light max-w-xs mb-6">
                    Explore our 310 GSM Supima tees, Cuban linen shirts, and
                    pleated Gurkha trousers.
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="px-6 py-3 rounded-full bg-obsidian text-ivory dark:bg-champagne dark:text-obsidian text-xs font-mono uppercase tracking-[0.2em] font-semibold"
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    layout
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                    className="flex gap-4 p-3.5 rounded-2xl bg-ivory-soft dark:bg-obsidian-card border border-obsidian/10 dark:border-ivory/10"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover rounded-xl"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-base font-medium leading-snug truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() =>
                              removeFromCart(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor.name
                              )
                            }
                            aria-label="Remove item"
                            className="text-stone-muted hover:text-red-400 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-stone-muted dark:text-stone-light">
                          <span>Size: {item.selectedSize}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block border border-white/20"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-obsidian/15 dark:border-ivory/15 rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor.name,
                                item.quantity - 1
                              )
                            }
                            className="p-1.5 hover:bg-obsidian/10 dark:hover:bg-ivory/10"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 font-mono text-xs">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor.name,
                                item.quantity + 1
                              )
                            }
                            className="p-1.5 hover:bg-obsidian/10 dark:hover:bg-ivory/10"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono text-sm font-semibold">
                          {formatLKR(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer: Promo, Subtotal & Checkout Button */}
            {cart.length > 0 && !checkoutSuccess && (
              <div className="p-6 border-t border-obsidian/10 dark:border-ivory/10 bg-ivory-soft/60 dark:bg-obsidian-card/80 space-y-4">
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Privilege Code (Try OLDMONEY10)"
                    className="flex-1 px-3.5 py-2 rounded-xl bg-ivory dark:bg-obsidian border border-obsidian/15 dark:border-ivory/15 text-xs font-mono focus:outline-none focus:border-champagne"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl border border-champagne text-champagne hover:bg-champagne hover:text-obsidian text-xs font-mono uppercase tracking-wider transition"
                  >
                    Apply
                  </button>
                </form>

                {discountApplied && (
                  <p className="text-[11px] font-mono text-champagne flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> 10% Private Member Privilege
                    Applied (-{formatLKR(discountAmount)})
                  </p>
                )}

                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-stone-muted dark:text-stone-light">
                    <span>Subtotal</span>
                    <span>{formatLKR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-stone-muted dark:text-stone-light">
                    <span>Islandwide Atelier Courier</span>
                    <span>
                      {remainingForFreeShipping === 0 ? 'COMPLIMENTARY' : 'LKR 650'}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-semibold text-obsidian dark:text-ivory pt-2 border-t border-obsidian/10 dark:border-ivory/10">
                    <span>Estimated Total</span>
                    <span className="text-champagne">
                      {formatLKR(
                        finalTotal + (remainingForFreeShipping === 0 ? 0 : 650)
                      )}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSimulatedCheckout}
                  className="w-full py-4 rounded-xl bg-champagne text-obsidian hover:bg-champagne-light font-mono text-xs uppercase tracking-[0.22em] font-semibold flex items-center justify-center gap-2 shadow-gold-glow transition"
                >
                  <span>Proceed to Atelier Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
