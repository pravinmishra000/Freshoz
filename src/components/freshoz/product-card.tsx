import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discountPercent = product.mrp > product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="relative p-0">
        <div className="aspect-square w-full overflow-hidden">
          <Image
            src={product.image}
            alt={product.name_en}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            data-ai-hint="product image"
          />
        </div>
        {product.stock_qty <= 5 && (
           <Badge variant="destructive" className="absolute left-2 top-2">Only {product.stock_qty} left!</Badge>
        )}
        {discountPercent > 0 && (
          <Badge className="absolute right-2 top-2 bg-accent text-accent-foreground">
            {discountPercent}% OFF
          </Badge>
        )}
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <CardTitle className="mb-1 text-base font-semibold">{product.name_en}</CardTitle>
        <p className="text-sm text-muted-foreground">{product.pack_size}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div className="flex items-baseline gap-1.5">
          <p className="text-lg font-bold text-primary">₹{product.price}</p>
          {product.mrp > product.price && <p className="text-sm text-muted-foreground line-through">₹{product.mrp}</p>}
        </div>
        <Button size="icon" aria-label="Add to cart">
          <Plus className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
