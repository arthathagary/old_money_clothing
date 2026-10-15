import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Heart,
  ShoppingBag,
  Sun,
  Moon,
  Menu,
  X,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import productsData from '../data/products.json';
import { Product } from '../types/product';
import { formatLKR } from '../assets/brandMeta';

const products = productsData as Product[];

export const Navbar: React.FC = () => {
  const {
    theme,
    toggleTheme,
    cart,
    wishlist,
    setCartOpen,
    setWishlistOpen,
    isSearchOpen,
    setSearchOpen,
    searchQuery,
    setSearchQuery,
    setQuickViewProduct,
    setActiveCategory,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.garmentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products.slice(0, 4);

  const handleNavCategory = (cat: 'All' | 'Men' | 'Women' | 'New' | 'Sale') => {
    setActiveCategory(cat);
    setMobileMenuOpen(false);
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-ivory/85 dark:bg-obsidian/85 backdrop-blur-xl border-b border-obsidian/10 dark:border-ivory/10 py-3.5 shadow-sm'
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Navigation Links (Desktop) & Mobile Hamburger */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Menu"
              className="lg:hidden p-2 -ml-2 rounded-full hover:bg-obsidian/5 dark:hover:bg-ivory/10 transition"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav className="hidden lg:flex items-center gap-7 text-xs font-mono tracking-[0.2em] uppercase">
              <button
                onClick={() => handleNavCategory('All')}
                className="hover:text-champagne transition-colors py-1"
              >
                Archive
              </button>
              <button
                onClick={() => handleNavCategory('Men')}
                className="hover:text-champagne transition-colors py-1"
              >
                Gentlemen
              </button>
              <button
                onClick={() => handleNavCategory('Women')}
                className="hover:text-champagne transition-colors py-1"
              >
                Ladies
              </button>
              <a
                href="#lookbook"
                className="hover:text-champagne transition-colors py-1"
              >
                Lookbook ’26
              </a>
              <a
                href="#atelier"
                className="hover:text-champagne transition-colors py-1"
              >
                The Atelier
              </a>
            </nav>
          </div>

          {/* Center: Brand Logo */}
          <a
            href="#top"
            className="flex flex-col items-center group text-center"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.22em] uppercase font-semibold group-hover:text-champagne transition-colors">
              Old Money
            </span>
            <span className="text-[9px] font-mono tracking-[0.35em] uppercase text-stone-muted dark:text-stone-light -mt-1">
              Clothing Atelier
            </span>
          </a>

          {/* Right: Actions (Search, Theme Toggle, Wishlist, Cart) */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search Archive"
              className="p-2.5 rounded-full hover:bg-obsidian/5 dark:hover:bg-ivory/10 transition flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline text-[11px] font-mono tracking-[0.18em] uppercase text-stone-muted dark:text-stone-light">
                Search
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark or Light Mode"
              className="p-2.5 rounded-full hover:bg-obsidian/5 dark:hover:bg-ivory/10 transition text-obsidian dark:text-ivory"
              title={
                theme === 'dark'
                  ? 'Switch to Ivory Atelier (Light)'
                  : 'Switch to Nocturne Salon (Dark)'
              }
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-4 h-4 text-champagne" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-4 h-4 text-heritage-green" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setWishlistOpen(true)}
              aria-label="Open Wishlist"
              className="relative p-2.5 rounded-full hover:bg-obsidian/5 dark:hover:bg-ivory/10 transition"
            >
              <Heart className="w-4 h-4" />
              <AnimatePresence>
                {wishlist.length > 0 && (
                  <motion.span
                    key={wishlist.length}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1 right-1 w-4 h-4 rounded-full bg-heritage-green text-ivory text-[9px] font-mono flex items-center justify-center border border-champagne/40"
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open Shopping Bag"
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-obsidian text-ivory dark:bg-ivory dark:text-obsidian hover:bg-champagne dark:hover:bg-champagne dark:hover:text-obsidian transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={totalCartCount}
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 8, opacity: 0 }}
                  className="text-xs font-mono font-medium"
                >
                  {totalCartCount}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-80 bg-ivory dark:bg-obsidian border-r border-obsidian/10 dark:border-ivory/10 p-6 flex flex-col justify-between lg:hidden"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-obsidian/10 dark:border-ivory/10">
                  <div>
                    <p className="font-serif text-xl tracking-[0.2em] uppercase">
                      Old Money
                    </p>
                    <p className="text-[10px] font-mono tracking-[0.25em] text-champagne uppercase">
                      Quiet Luxury • LKR
                    </p>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-obsidian/10 dark:hover:bg-ivory/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-8 flex flex-col gap-4 font-serif text-2xl">
                  <button
                    onClick={() => handleNavCategory('All')}
                    className="text-left hover:text-champagne transition flex items-center justify-between"
                  >
                    <span>All Archive Pieces</span>
                    <ArrowUpRight className="w-4 h-4 text-champagne" />
                  </button>
                  <button
                    onClick={() => handleNavCategory('Men')}
                    className="text-left hover:text-champagne transition flex items-center justify-between"
                  >
                    <span>Gentlemen’s Edit</span>
                    <ArrowUpRight className="w-4 h-4 text-champagne" />
                  </button>
                  <button
                    onClick={() => handleNavCategory('Women')}
                    className="text-left hover:text-champagne transition flex items-center justify-between"
                  >
                    <span>Ladies’ Edit</span>
                    <ArrowUpRight className="w-4 h-4 text-champagne" />
                  </button>
                  <button
                    onClick={() => handleNavCategory('New')}
                    className="text-left hover:text-champagne transition flex items-center justify-between"
                  >
                    <span>New Arrivals ’26</span>
                    <ArrowUpRight className="w-4 h-4 text-champagne" />
                  </button>
                  <button
                    onClick={() => handleNavCategory('Sale')}
                    className="text-left hover:text-champagne transition flex items-center justify-between"
                  >
                    <span>Private Archive Sale</span>
                    <ArrowUpRight className="w-4 h-4 text-champagne" />
                  </button>
                  <a
                    href="#lookbook"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-left hover:text-champagne transition flex items-center justify-between pt-4 border-t border-obsidian/10 dark:border-ivory/10"
                  >
                    <span>3D Cover-Flow Lookbook</span>
                    <Sparkles className="w-4 h-4 text-champagne" />
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-obsidian/10 dark:border-ivory/10 text-xs font-mono text-stone-muted dark:text-stone-light space-y-1">
                <p>CURRENCY: SRI LANKAN RUPEE (LKR)</p>
                <p>ISLANDWIDE ATELIER COURIER</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-obsidian/80 backdrop-blur-xl flex items-start justify-center pt-20 px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl bg-ivory dark:bg-obsidian-card border border-champagne/30 rounded-2xl p-6 sm:p-8 shadow-luxury-dark"
            >
              <div className="flex items-center justify-between pb-4 border-b border-obsidian/10 dark:border-ivory/10">
                <div className="flex items-center gap-3 flex-1">
                  <Search className="w-5 h-5 text-champagne" />
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Supima tees, Gurkha linen trousers, Oxford shirts..."
                    className="w-full bg-transparent text-base sm:text-lg focus:outline-none placeholder:text-stone-muted"
                  />
                </div>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-2 rounded-full hover:bg-obsidian/10 dark:hover:bg-ivory/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick filter chips */}
              <div className="flex flex-wrap gap-2 mt-4">
                {['Supima Tee', 'Linen Trousers', 'Cuban Shirt', 'Silk', 'Polo'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border border-obsidian/15 dark:border-ivory/15 hover:border-champagne hover:text-champagne transition"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>

              {/* Matching Results */}
              <div className="mt-6">
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-muted mb-3">
                  {searchQuery.trim()
                    ? `Matching Pieces (${searchResults.length})`
                    : 'Curated Atelier Highlights'}
                </p>

                {searchResults.length === 0 ? (
                  <p className="py-8 text-center font-serif text-lg text-stone-muted">
                    No archive pieces matched &ldquo;{searchQuery}&rdquo;. Try
                    searching for T-Shirts, Shirts, or Trousers.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                    {searchResults.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setQuickViewProduct(item);
                          setSearchOpen(false);
                        }}
                        className="flex items-center gap-3.5 p-2.5 rounded-xl border border-obsidian/10 dark:border-ivory/10 hover:border-champagne/60 text-left transition group"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-mono uppercase tracking-wider text-champagne">
                            {item.garmentType} • {item.category}
                          </p>
                          <h4 className="font-serif text-base font-medium truncate group-hover:text-champagne transition">
                            {item.name}
                          </h4>
                          <p className="text-xs font-mono mt-1">
                            {formatLKR(item.price)}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
