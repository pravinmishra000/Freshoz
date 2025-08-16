
'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/data';
import { useCart } from '@/context/cart-context';
import { Header } from '@/components/freshoz/header';
import { Footer } from '@/components/freshoz/footer';
import { BottomNav } from '@/components/freshoz/bottom-nav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, Star } from 'lucide-react';
import { ProductCard } from '@/components/freshoz/product-card';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  const { addToCart, removeFromCart, getCartItem } = useCart();

  const product = products.find((p) => p.id === id);
  const cartItem = product ? getCartItem(product.id) : undefined;

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-lg text-muted-foreground">Product not found.</p>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }
  
  const discountPercent = product.mrp > product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const suggestedProducts = products
    .filter((p) => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 4);

  const productDetails = [
      { label: 'Brand', value: product.brand },
      { label: 'Pack Size', value: product.pack_size },
      { label: 'Is Veg', value: product.is_veg ? "Yes" : "No"},
      { label: 'Shelf Life', value: '9 Months'},
      { label: 'Country of Origin', value: 'India'},
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pb-20">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={product.image}
                alt={product.name_en}
                fill
                className="object-cover"
                data-ai-hint="product image"
              />
               {discountPercent > 0 && (
                <Badge className="absolute right-3 top-3 bg-accent text-accent-foreground text-base">
                  {discountPercent}% OFF
                </Badge>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-medium text-primary">{product.brand}</p>
                <h1 className="font-headline text-3xl font-bold lg:text-4xl">{product.name_en}</h1>
                <p className="mt-1 text-lg text-muted-foreground">{product.pack_size}</p>
              </div>
               {product.rating && product.rating_count && (
                <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1 rounded-full bg-green-600 px-2 py-0.5 text-white">
                        <span>{product.rating.toFixed(1)}</span>
                        <Star className="h-4 w-4 fill-current" />
                    </div>
                    <span>({product.rating_count.toLocaleString()} ratings)</span>
                </div>
              )}
              
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary">₹{product.price}</span>
                {product.mrp > product.price && (
                  <span className="text-xl text-muted-foreground line-through">₹{product.mrp}</span>
                )}
              </div>

              {product.description && (
                <p className="text-muted-foreground">{product.description}</p>
              )}
              
               {product.stock_qty <= 5 && (
                <p className="font-semibold text-destructive">Only {product.stock_qty} left in stock!</p>
              )}

              <div className="mt-4">
                {cartItem ? (
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">Quantity:</span>
                    <div className="flex items-center gap-2">
                       <Button size="icon" variant="outline" onClick={() => removeFromCart(product.id)} className="h-10 w-10">
                        <Minus className="h-5 w-5" />
                      </Button>
                      <span className="w-12 text-center text-xl font-bold">{cartItem.quantity}</span>
                      <Button size="icon" variant="outline" onClick={() => addToCart(product)} className="h-10 w-10">
                        <Plus className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button size="lg" className="w-full sm:w-auto" onClick={() => addToCart(product)}>
                    <Plus className="h-5 w-5 mr-2" /> Add to Cart
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="mt-16">
            <Card>
                <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                        {productDetails.map(detail => (
                            <div key={detail.label} className="flex justify-between border-b pb-2">
                                <p className="text-muted-foreground">{detail.label}</p>
                                <p className="font-semibold">{detail.value}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
          </div>
          
          {/* Suggested Products */}
          {suggestedProducts.length > 0 && (
            <div className="mt-16">
                <Separator />
                <h2 className="my-8 font-headline text-3xl font-bold">You might also like</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {suggestedProducts.map((p) => (
                        <ProductCard key={p.id} product={p}/>
                    ))}
                </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
