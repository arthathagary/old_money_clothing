import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, CategoryFilter, Product, ProductColor } from '../types/product';

interface StoreState {
  // Theme ('dark' | 'light')
  theme: 'dark' | 'light';
  toggleTheme: () => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (
    product: Product,
    size?: string,
    color?: ProductColor,
    quantity?: number
  ) => void;
  removeFromCart: (productId: string, size: string, colorName: string) => void;
  updateQuantity: (
    productId: string,
    size: string,
    colorName: string,
    quantity: number
  ) => void;
  clearCart: () => void;

  // Wishlist (array of product IDs)
  wishlist: string[];
  isWishlistOpen: boolean;
  setWishlistOpen: (open: boolean) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Quick View Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Category & Search Filters
  activeCategory: CategoryFilter;
  setActiveCategory: (category: CategoryFilter) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  // Toast notification for instant luxury feedback
  toastMessage: string | null;
  showToast: (message: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      toggleTheme: () =>
        set((state) => {
          const next = state.theme === 'dark' ? 'light' : 'dark';
          if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark', next === 'dark');
          }
          return { theme: next };
        }),

      cart: [],
      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),

      addToCart: (product, size, color, quantity = 1) => {
        const chosenSize = size || product.sizes[Math.min(1, product.sizes.length - 1)] || 'M';
        const chosenColor = color || product.colors[0];

        set((state) => {
          const existingIndex = state.cart.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedSize === chosenSize &&
              item.selectedColor.name === chosenColor.name
          );

          let updatedCart: CartItem[];
          if (existingIndex > -1) {
            updatedCart = state.cart.map((item, idx) =>
              idx === existingIndex
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            updatedCart = [
              ...state.cart,
              {
                product,
                selectedSize: chosenSize,
                selectedColor: chosenColor,
                quantity,
              },
            ];
          }

          return {
            cart: updatedCart,
            toastMessage: `Added "${product.name}" (${chosenSize}) to your Atelier Bag`,
          };
        });

        setTimeout(() => {
          set({ toastMessage: null });
        }, 3200);
      },

      removeFromCart: (productId, size, colorName) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedSize === size &&
                item.selectedColor.name === colorName
              )
          ),
        })),

      updateQuantity: (productId, size, colorName, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              cart: state.cart.filter(
                (item) =>
                  !(
                    item.product.id === productId &&
                    item.selectedSize === size &&
                    item.selectedColor.name === colorName
                  )
              ),
            };
          }
          return {
            cart: state.cart.map((item) =>
              item.product.id === productId &&
              item.selectedSize === size &&
              item.selectedColor.name === colorName
                ? { ...item, quantity }
                : item
            ),
          };
        }),

      clearCart: () => set({ cart: [] }),

      wishlist: ['omc-001', 'omc-002'],
      isWishlistOpen: false,
      setWishlistOpen: (open) => set({ isWishlistOpen: open }),

      toggleWishlist: (productId) => {
        set((state) => {
          const exists = state.wishlist.includes(productId);
          const nextWishlist = exists
            ? state.wishlist.filter((id) => id !== productId)
            : [...state.wishlist, productId];
          return {
            wishlist: nextWishlist,
            toastMessage: exists
              ? 'Removed piece from your Private Wishlist'
              : 'Saved piece to your Private Wishlist',
          };
        });
        setTimeout(() => {
          set({ toastMessage: null });
        }, 2800);
      },

      isInWishlist: (productId) => get().wishlist.includes(productId),

      quickViewProduct: null,
      setQuickViewProduct: (product) => set({ quickViewProduct: product }),

      activeCategory: 'All',
      setActiveCategory: (category) => set({ activeCategory: category }),

      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      isSearchOpen: false,
      setSearchOpen: (open) => set({ isSearchOpen: open }),

      toastMessage: null,
      showToast: (message) => {
        set({ toastMessage: message });
        setTimeout(() => {
          set({ toastMessage: null });
        }, 3200);
      },
    }),
    {
      name: 'old-money-atelier-storage',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        theme: state.theme,
      }),
    }
  )
);
