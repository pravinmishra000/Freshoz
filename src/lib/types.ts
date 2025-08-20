
import type { LucideIcon } from 'lucide-react';

export type Category = {
  id: string;
  name_en: string;
  name_hi: string;
  slug: string;
  icon: LucideIcon;
  subCategories?: string[];
};

export type WarehouseStock = {
  warehouse_id: 'sultanganj' | 'bhagalpur' | 'khagaria';
  stock: number;
};

export type Product = {
  id: string;
  name_en: string;
  name_hi: string;
  description?: string;
  brand: string;
  category_id: string;
  mrp: number;
  price: number;
  warehouse_stock: WarehouseStock[];
  stock_qty: number; // For compatibility, will be derived
  image: string;
  delivery_mode: 'quick' | 'ecom';
  is_veg: boolean;
  unit: string;
  pack_size: string;
  tags: string[];
  rating?: number;
  rating_count?: number;
};

export type AssignedWarehouse = 'Sultanganj' | 'Bhagalpur' | 'Khagaria' | 'N/A';

