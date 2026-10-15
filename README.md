# OLD MONEY CLOTHING — Quiet Luxury 3D Editorial Storefront

A highly interactive, visually unique **Quiet Luxury** storefront homepage built for **Old Money Clothing** (targeting ages 16–35, priced in **LKR**). Designed with an editorial lookbook feel featuring heavyweight Supima T-shirts, Cuban & Oxford linen shirts, pleated Gurkha trousers, silk dresses, and fine knitwear.

---

## Tech Stack

- **Framework:** React 18 + Vite + TypeScript
- **Styling:** Tailwind CSS (Custom Quiet Luxury palette: Warm Alabaster `#F7F4EF`, Deep Obsidian `#0F0E0C`, Heritage Forest Green `#1B352A`, and Brushed Champagne Gold `#C5A059` with full Dark/Light mode support)
- **3D Engine:** Three.js + `@react-three/fiber` + `@react-three/drei` (Lazy-loaded interactive 3D clothing & dress showcase with 3 selectable 3D garments, real-time cloth-wave vertex animation, live fabric dye swatches, mouse parallax, and scroll reactivity)
- **Scroll & Motion:** GSAP + `ScrollTrigger`, Framer Motion (modals, drawers, filter tabs, 3D cover-flow lookbook), and `Lenis` (smooth scrolling)
- **State Management:** Zustand with `localStorage` persistence (Cart, Wishlist, Theme, Search, Quick View)
- **Routing & Icons:** React Router v6 + Lucide React
- **Code Quality:** ESLint + Prettier

---

## Project Folder Structure

```text
old_money_clothing/
├── index.html                        # SEO & OpenGraph meta tags + Google Fonts
├── package.json                      # Dependencies & scripts
├── tailwind.config.js                # Quiet luxury color palette & typography tokens
├── tsconfig.json                     # Strict TypeScript config
├── vite.config.ts                    # Vite bundler & chunk splitting config
└── src/
    ├── assets/
    │   └── brandMeta.ts              # Brand constants, marquee copy, and LKR formatter
    ├── components/
    │   ├── CartDrawer.tsx            # Slide-in bag with LKR subtotal, free-shipping bar & promo code
    │   ├── CustomCursor.tsx          # Spring-physics cursor that expands on interactive elements
    │   ├── Footer.tsx                # Editorial footer, socials & Sri Lankan payment badges
    │   ├── HeroScene3D.tsx           # React Three Fiber 3D clothing models (Pleated Dress / Cuban Shirt / Gurkha Ensemble)
    │   ├── MarqueeStrip.tsx          # Continuous announcement marquee
    │   ├── Navbar.tsx                # Sticky glassmorphic navbar + live Search modal + Theme toggle
    │   ├── PageLoader.tsx            # Numbered atelier curtain loader (000% – 100%)
    │   ├── ProductCard3D.tsx         # 3D tilt product card with radial gold glow & hover image swap
    │   ├── QuickViewModal.tsx        # Gallery modal with size guide, color swatches & quantity
    │   └── WishlistDrawer.tsx        # Slide-in private wishlist drawer
    ├── data/
    │   ├── lookbook.ts               # 5 editorial lookbook slides with paired product IDs
    │   └── products.json             # 12 sample quiet-luxury products in LKR with Unsplash imagery
    ├── hooks/
    │   ├── useLenis.ts               # Smooth scrolling synced with GSAP ScrollTrigger
    │   ├── useMediaQuery.ts          # Responsive & fine-pointer detection
    │   └── useTilt3D.ts              # Real-time 3D perspective tilt & glow coordinates
    ├── sections/
    │   ├── FeaturedCollectionSection.tsx # 3D Cover-Flow Lookbook Carousel + Shop-The-Look
    │   ├── HeroSection.tsx           # Full-screen 3D garment hero with GSAP typography & live dye swatches
    │   ├── NewsletterSection.tsx     # Animated Private Salon signup with tailoring preferences
    │   └── ProductGridSection.tsx    # Staggered 3D product grid with Category & Garment filters
    ├── store/
    │   └── useStore.ts               # Zustand store persisted in localStorage
    ├── types/
    │   └── product.ts                # TypeScript interfaces
    ├── App.tsx                       # Main storefront layout & routes
    ├── index.css                     # Tailwind base & custom scrollbar styles
    └── main.tsx                      # Application entry point
```

---

## Setup & Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open the local URL printed in your terminal (typically `http://localhost:5173`) to view the storefront.

### 3. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## Interactive Highlights

1. **3D Garment & Dress Switcher:** Switch between `I. Pleated Silk Dress` (on a brass & walnut dressmaker mannequin with real-time wind-rippling knife pleats), `II. Cuban Shirt on Hanger` (with Mother-of-Pearl buttons and wooden Savile Row coat hanger), and `III. Tee & Gurkha Trousers` (with double buckles and cuffed ankles) plus 5 live **Fabric Dye** color swatches in the Hero section.
2. **3D Tilt Product Cards:** Hover any of the 12 products to experience real-time 3D perspective tilt, radial champagne-gold cursor glow, and secondary lookbook image reveal.
3. **3D Cover-Flow Lookbook:** Browse 5 curated looks in 3D perspective and add paired garments directly to your bag.
4. **Privilege Promo Code:** Open the Atelier Bag drawer and enter `OLDMONEY10` to test the 10% private member discount calculation in LKR.
# old_money_clothing
