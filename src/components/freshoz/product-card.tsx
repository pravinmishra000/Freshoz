
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Star, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';


interface ProductCardProps {
  product: Product;
  view?: 'default' | 'suggestion';
}

export function ProductCard({ product, view = 'default' }: ProductCardProps) {
  const { addToCart, removeFromCart, getCartItem } = useCart();
  const cartItem = getCartItem(product.id);

  const discountPercent = product.mrp > product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const ProductImage = () => {
    if (product.image) {
      return (
        <Image
          src={product.image}
          alt={product.name_en}
          width={view === 'suggestion' ? 96 : 128}
          height={view === 'suggestion' ? 96 : 128}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          data-ai-hint="product image"
        />
      );
    }
    return (
      <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-gradient-to-br from-slate-50 to-blue-100">
        <ShoppingCart className="h-16 w-16 text-slate-400" />
        <span className="mt-2 text-xs text-slate-500">Image coming soon</span>
      </div>
    );
  };

  if (view === 'suggestion') {
      return (
         <Card className="group relative flex h-full flex-col overflow-hidden rounded-lg border-2 hover:border-primary/50 hover:shadow-md transition-all duration-300">
          <Link href={`/product/${product.id}`} className="flex flex-1 flex-col p-2">
            <div className="relative mx-auto h-24 w-24">
                <ProductImage />
            </div>
             <p className="mt-2 h-8 text-xs font-semibold leading-tight text-center">{product.name_en}</p>
          </Link>
           <div className="p-2 pt-0">
             <Button className="w-full h-8" size="sm" onClick={() => addToCart(product)}>
                <Plus className="h-4 w-4" /> Add
            </Button>
           </div>
        </Card>
      )
  }

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-lg border-2 hover:border-primary/50 hover:shadow-md transition-all duration-300">
      <Link href={`/product/${product.id}`} className="flex flex-1 flex-col">
        <CardContent className="relative flex-1 p-2">
            <div className="relative mx-auto h-32 w-32">
              <ProductImage />
            </div>
        </CardContent>
        <div className="flex-1 bg-white p-3 pt-0">
          <p className="mb-1 text-xs font-medium text-gray-500">{product.brand}</p>
          <p className="h-10 text-sm font-semibold leading-tight">{product.name_en}</p>
          <p className="mt-1 text-sm text-gray-500">{product.pack_size}</p>

          {discountPercent > 0 && (
             <p className="text-sm font-bold text-green-600">Special price</p>
          )}

          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-lg font-bold">₹{product.price}</p>
            {product.mrp > product.price && <p className="text-sm text-muted-foreground line-through">₹{product.mrp}</p>}
             {discountPercent > 0 && (
                <Badge className="bg-green-100 text-green-800">
                  {discountPercent}% OFF
                </Badge>
              )}
          </div>
           {product.rating && product.rating_count && (
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1 rounded-full bg-green-600 px-2 py-0.5 text-white">
                <span>{product.rating.toFixed(1)}</span>
                <Star className="h-3 w-3 fill-current" />
              </div>
              <span>({product.rating_count.toLocaleString()})</span>
            </div>
          )}

        </div>
      </Link>
      <div className="p-3 pt-0">
        {cartItem ? (
           <div className="flex h-10 items-center justify-between rounded-lg border border-primary bg-primary/10">
            <Button size="icon" variant="ghost" className="h-full w-10 text-primary" onClick={() => removeFromCart(product.id)}>
              <Minus className="h-5 w-5" />
            </Button>
            <span className="text-lg font-bold text-primary">{cartItem.quantity}</span>
            <Button size="icon" variant="ghost" className="h-full w-10 text-primary" onClick={() => addToCart(product)}>
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <Button className="w-full h-10" onClick={() => addToCart(product)}>
            <Plus className="h-5 w-5" /> Add
          </Button>
        )}
      </div>
    </Card>
  );
}
