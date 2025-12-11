export interface Product {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  price_html: string;
  images: {
    id: number;
    src: string;
    alt: string;
  }[];
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  // Added for Course compatibility
  level?: string;
  rating?: number;
  duration?: string;
  instructor?: string;
  discountedPrice?: string;
  tags?: string[]; // Added for filtering
  totalEnrolled?: number;
  benefits?: string[];
  requirements?: string[];
  curriculum?: {
    title: string;
    lessons: { title: string }[];
  }[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface PaymentGateway {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}