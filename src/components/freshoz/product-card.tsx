
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Star } from 'lucide-react';
import { useCart } from '@/context/cart-context';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, getCartItem } = useCart();
  const cartItem = getCartItem(product.id);

  const discountPercent = product.mrp > product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  return (
    <Card className="flex h-full w-40 flex-shrink-0 flex-col overflow-hidden rounded-lg border-2">
       <CardContent className="relative p-2">
        <Link href={`/product/${product.id}`} className="block">
          <div className="relative mx-auto h-32 w-32">
            <Image
              src={product.image}
              alt={product.name_en}
              width={128}
              height={128}
              className="h-full w-full object-contain"
              data-ai-hint="product image"
            />
          </div>
          <div className="absolute left-0 top-0 rounded-br-md bg-gray-100 px-1.5 py-0.5 text-xs font-medium flex items-center gap-1">
            4.2 <Star className="h-3 w-3 text-green-600 fill-green-600" />
          </div>
        </Link>
         <Button 
            size="icon" 
            className="absolute bottom-2 right-2 h-7 w-7 rounded-md border border-primary bg-secondary text-primary hover:bg-primary/10"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product)
            }}
          >
            <Plus className="h-5 w-5" />
          </Button>
       </CardContent>
      <div className="flex-1 bg-white p-2 pt-0">
         <Link href={`/product/${product.id}`} className="block">
            <p className="text-sm font-medium text-gray-500">{product.pack_size}</p>
            <p className="truncate text-sm font-semibold">{product.name_en}</p>
            {discountPercent > 0 && (
                <p className="text-xs font-bold text-green-600">{discountPercent}% OFF</p>
            )}
            <div className="mt-1 flex items-baseline gap-2">
              <p className="text-base font-bold">₹{product.price}</p>
              {product.mrp > product.price && <p className="text-sm text-muted-foreground line-through">₹{product.mrp}</p>}
            </div>
         </Link>
      </div>
    </Card>
  );
}
