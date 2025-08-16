
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { Badge } from '../ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, removeFromCart, getCartItem } = useCart();
  const cartItem = getCartItem(product.id);

  const discountPercent = product.mrp > product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-lg border-2 hover:border-primary/50 hover:shadow-md transition-all duration-300">
      <Link href={`/product/${product.id}`} className="flex flex-1 flex-col">
        <CardContent className="relative flex-1 p-2">
            <div className="relative mx-auto h-32 w-32">
              <Image
                src={product.image}
                alt={product.name_en}
                width={128}
                height={128}
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                data-ai-hint="product image"
              />
            </div>
            {discountPercent > 0 && (
                <Badge className="absolute left-1 top-1 bg-destructive text-destructive-foreground">
                  {discountPercent}% OFF
                </Badge>
              )}
        </CardContent>
        <div className="flex-1 bg-white p-3 pt-0">
          <p className="mb-1 text-xs font-medium text-gray-500">{product.brand}</p>
          <p className="h-10 text-sm font-semibold leading-tight">{product.name_en}</p>
          <p className="mt-1 text-sm text-gray-500">{product.pack_size}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-lg font-bold">₹{product.price}</p>
            {product.mrp > product.price && <p className="text-sm text-muted-foreground line-through">₹{product.mrp}</p>}
          </div>
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
