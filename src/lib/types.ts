import type { LucideIcon } from 'lucide-react';

export type Category = {
  id: string;
  name_en: string;
  name_hi: string;
  slug: string;
  icon: LucideIcon;
};

export type Product = {
  id: string;
  name_en: string;
  name_hi: string;
  brand: string;
  category_id: string;
  mrp: number;
  price: number;
  stock_qty: number;
  image: string;
  delivery_mode: 'quick' | 'ecom';
  is_veg: boolean;
  unit: string;
  pack_size: string;
  tags: string[];
};
