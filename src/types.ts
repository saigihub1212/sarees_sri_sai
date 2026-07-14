export interface Review {
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  location: string;
}

export interface Saree {
  id: string;
  name: string;
  category: string; // e.g. "Banarasi", "Kanchipuram Silk", "Linen & Cotton", "Pochampally Ikat", "Organza & Festive"
  fabric: string;
  price: number;
  originalPrice: number;
  color: string;
  occasion: string; // "Wedding", "Festive", "Daily Wear", "Party Wear"
  images: string[]; // Gallery images
  description: string;
  fabricDetails: string;
  blouseIncluded: boolean;
  blouseDescription: string;
  dimensions: string;
  careInstructions: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Sold Out';
  rating: number;
  borderType: string;
  palluDetails: string;
  featured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  reviews: Review[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
