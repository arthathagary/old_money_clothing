import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useLenis } from './hooks/useLenis';
import { useStore } from './store/useStore';
import { PageLoader } from './components/PageLoader';
import { CustomCursor } from './components/CustomCursor';
import { MarqueeStrip } from './components/MarqueeStrip';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { ProductGridSection } from './sections/ProductGridSection';
import { FeaturedCollectionSection } from './sections/FeaturedCollectionSection';
import { NewsletterSection } from './sections/NewsletterSection';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';

const StorefrontHome: React.FC = () => {
  return (
    <main>
      <HeroSection />
      <ProductGridSection />
      <FeaturedCollectionSection />
      <NewsletterSection />
    </main>
  );
};

export const App: React.FC = () => {
  useLenis();
  const { theme, toastMessage } = useStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-ivory text-obsidian dark:bg-obsidian dark:text-ivory transition-colors duration-500">
        <PageLoader />
        <CustomCursor />
        <MarqueeStrip />
        <Navbar />

        <div className="flex-1">
          <Routes>
            <Route path="*" element={<StorefrontHome />} />
          </Routes>
        </div>

        <Footer />

        {/* Interactive Modals & Drawers */}
        <QuickViewModal />
        <CartDrawer />
        <WishlistDrawer />

        {/* Floating Atelier Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-6 right-6 z-[90] px-5 py-3.5 rounded-2xl bg-obsidian text-ivory dark:bg-ivory dark:text-obsidian border border-champagne shadow-gold-glow flex items-center gap-3 text-xs font-mono"
            >
              <Sparkles className="w-4 h-4 text-champagne shrink-0" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
};

export default App;
