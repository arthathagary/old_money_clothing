export type CategoryFilter = 'All' | 'Men' | 'Women' | 'New' | 'Sale';

export type GarmentType = 'T-Shirts' | 'Shirts' | 'Trousers' | 'Polos & Knitwear';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  currency: 'LKR';
  category: 'Men' | 'Women';
  garmentType: GarmentType;
  tags: ('New' | 'Sale' | 'Bestseller' | 'Limited')[];
  image: string;
  hoverImage: string;
  gallery: string[];
  colors: ProductColor[];
  sizes: string[];
  fabric: string;
  fit: string;
  description: string;
  editionNumber: string;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}
