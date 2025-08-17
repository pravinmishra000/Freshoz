
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
import { Plus, Minus, Star, MapPin, CalendarDays, TrendingUp, Tag, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/freshoz/product-card';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id;
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

  const boughtTogetherProducts = products.filter(p => ['p5', 'p17', 'p20', 'p29', 'p30']);

  const productDetails = [
      { label: 'Brand', value: product.brand },
      { label: 'Pack Size', value: product.pack_size },
      { label: 'Is Veg', value: product.is_veg ? "Yes" : "No"},
      { label: 'Shelf Life', value: '9 Months'},
      { label: 'Country of Origin', value: 'India'},
  ]
  
  const variants = [
      { id: 'v1', size: '1 kg', price: product.price, mrp: product.mrp, discount: discountPercent },
      { id: 'v2', size: '2 kg', price: product.price * 2 * 0.9, mrp: product.mrp * 2, discount: Math.round(((product.mrp * 2 - (product.price * 2 * 0.9)) / (product.mrp * 2)) * 100) },
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
                <Badge className="absolute right-3 top-3 bg-destructive text-destructive-foreground text-base">
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
                
              {discountPercent > 0 && <p className="font-bold text-green-600">Special price</p>}

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
          
          <Separator className="my-8" />
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-sm">
                <CalendarDays className="h-5 w-5 text-muted-foreground"/>
                <div>
                    <p className="font-semibold">Expiry Date 27 Mar 2026</p>
                    <p className="text-muted-foreground">Manufactured date 01 Jul 2025</p>
                </div>
            </div>
            <div className="flex items-center gap-4 text-sm font-semibold text-green-700">
                <TrendingUp className="h-5 w-5"/>
                <p>3,000+ people ordered this in the last 15 days</p>
            </div>
          </div>
          
          <Separator className="my-8" />

          {/* Select Variant */}
          <div>
            <h2 className="mb-4 font-headline text-xl font-bold">Select Variant</h2>
            <RadioGroup defaultValue={variants[0].id} className="space-y-4">
              {variants.map(variant => (
                <Label key={variant.id} htmlFor={variant.id} className="block cursor-pointer rounded-lg border-2 border-transparent has-[input:checked]:border-primary p-4 transition-all">
                   <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value={variant.id} id={variant.id} />
                       <div>
                          {variant.discount > 0 && <Badge variant="destructive" className="mb-1">{variant.discount}% OFF</Badge>}
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold">₹{Math.round(variant.price)}</span>
                            <span className="text-muted-foreground line-through">₹{variant.mrp}</span>
                          </div>
                        </div>
                    </div>
                     <div className="text-right">
                        <p className="font-bold text-lg">{variant.size}</p>
                        <p className="text-sm text-muted-foreground">@ ₹{Math.round(variant.price / parseInt(variant.size))} /kg</p>
                    </div>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </div>
          
          <Separator className="my-8" />

          {/* Offers */}
          <div>
            <h2 className="mb-4 font-headline text-xl font-bold">Offers</h2>
            <div className="space-y-4">
                <div className="flex items-start justify-between gap-4 rounded-lg border border-dashed border-green-500 bg-green-50 p-4">
                    <div className="flex items-start gap-4">
                        <Tag className="h-6 w-6 text-green-600 flex-shrink-0 mt-1"/>
                        <div>
                            <h3 className="font-semibold text-green-800">Special Price</h3>
                            <p className="text-sm text-green-700">Get extra 7% off on 50 item(s) (price inclusive of cashback/coupon)</p>
                        </div>
                    </div>
                    <Button variant="link" className="text-green-600">T&C</Button>
                </div>
                 <div className="flex items-start justify-between gap-4 rounded-lg border border-dashed border-green-500 bg-green-50 p-4">
                    <div className="flex items-start gap-4">
                        <Tag className="h-6 w-6 text-green-600 flex-shrink-0 mt-1"/>
                        <div>
                            <h3 className="font-semibold text-green-800">Buy More, Save More</h3>
                            <p className="text-sm text-green-700">Buy worth ₹1399 save ₹150 (Minimum 2)</p>
                        </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-green-600" />
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

          {/* Delivery Details Section */}
          <div className="mt-8">
            <Card>
              <CardContent className="space-y-4 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                     <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                     <div>
                       <p className="font-semibold">Deliver to: Sultanganj - 813213</p>
                       <p className="text-sm text-muted-foreground">123, Main Road, Near City Hall...</p>
                     </div>
                  </div>
                  <Button variant="outline" size="sm">Change</Button>
                </div>
                 <Separator />
                <div className="flex items-start gap-4">
                    <CalendarDays className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                    <div>
                        <p className="font-semibold">Delivery in 2 Days, Tuesday</p>
                        <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground space-y-1">
                            <li>Schedule Your Delivery</li>
                            <li>Cash on Delivery available</li>
                            <li>Easy Doorstep Return</li>
                        </ul>
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Bought Together */}
          <div className="mt-16">
            <Separator/>
            <h2 className="my-8 font-headline text-3xl font-bold">Bought Together</h2>
             <div className="flex space-x-4 overflow-x-auto pb-4">
                {boughtTogetherProducts.map((p) => (
                    <div key={p.id} className="w-40 flex-shrink-0">
                        <ProductCard product={p} view="suggestion" />
                    </div>
                ))}
            </div>
          </div>
          
          {/* Sponsored Section */}
          <div className="mt-16">
             <Separator/>
            <h2 className="my-8 font-headline text-3xl font-bold">Sponsored</h2>
            <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg">
                <Image 
                    src="https://placehold.co/1200x600"
                    alt="Sponsored Product"
                    fill
                    className="object-cover"
                    data-ai-hint="advertisement banner"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
                    <h3 className="text-white text-2xl font-bold">Choose only top class</h3>
                    <Button variant="secondary" className="mt-4 w-fit">Shop now</Button>
                </div>
            </div>
          </div>

          {/* Suggested Products */}
          {suggestedProducts.length > 0 && (
            <div className="mt-16">
                <Separator />
                <h2 className="my-8 font-headline text-3xl font-bold">Similar Products</h2>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
