
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/freshoz/header';
import { Footer } from '@/components/freshoz/footer';
import { Minus, Plus, ChevronRight, PercentSquare, Sparkles, Tag, Info, ShieldCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BottomNav } from '@/components/freshoz/bottom-nav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

export default function CartPage() {
  const { cart, addToCart, removeFromCart } = useCart();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalMRP = cart.reduce((sum, item) => sum + item.mrp * item.quantity, 0);
  const totalSavings = totalMRP - totalPrice;
  const deliveryFee = 0;
  const platformFee = 9;
  const totalAmount = totalPrice + deliveryFee + platformFee;


  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
       <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold">Grocery ({cart.length})</h1>
        </div>
      </header>

      <main className="flex-1 pb-40">
        <div className="container mx-auto px-0 py-2 sm:px-4">

            {/* Offer Banners */}
             <div className="space-y-2 p-2">
                <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                    <PercentSquare className="h-5 w-5" />
                    <span>Get 10% off with HDFC Bank Credit Cards</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-yellow-50 p-3 text-sm text-yellow-700">
                    <Sparkles className="h-5 w-5" />
                    <span>Shop for Rs. 500 more to get free delivery</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
                    <ShieldCheck className="h-5 w-5" />
                    <span>Total savings of Rs. {totalSavings.toFixed(0)} on this order</span>
                </div>
            </div>

            {/* Apply Coupon */}
             <Card className="m-2">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Tag className="h-5 w-5 text-primary" />
                        <span className="font-semibold">Flat Rs.50 off with a coupon</span>
                    </div>
                    <Button variant="outline">Apply</Button>
                </div>
                 <Link href="#" className="ml-7 mt-1 block text-sm font-semibold text-primary">View all offers <ChevronRight className="inline-block h-4 w-4"/></Link>
              </CardContent>
            </Card>

            {/* Cart Items */}
            <div className="bg-white">
                {cart.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">Your cart is empty.</div>
                ) : (
                <ul className="divide-y">
                    {cart.map((item) => (
                    <li key={item.id} className="flex gap-4 p-4">
                        <div className="relative h-20 w-20 flex-shrink-0">
                            <Image
                                src={item.image}
                                alt={item.name_en}
                                fill
                                className="rounded-md object-contain"
                                data-ai-hint="product image"
                            />
                        </div>
                        <div className="flex-1">
                        <p className="font-semibold">{item.name_en}</p>
                        <p className="text-sm text-muted-foreground">{item.pack_size}</p>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-lg font-bold">₹{item.price}</span>
                            {item.mrp > item.price && (
                            <span className="text-muted-foreground line-through">₹{item.mrp}</span>
                            )}
                        </div>
                        </div>
                        <div className="flex h-8 items-center justify-between self-center rounded-md border-2 border-primary">
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => removeFromCart(item.id)}
                                className="h-full w-8 text-primary hover:bg-primary/10"
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-2 font-bold text-primary">{item.quantity}</span>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => addToCart(item)}
                                className="h-full w-8 text-primary hover:bg-primary/10"
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </li>
                    ))}
                </ul>
                )}
            </div>

            {/* Open Box Delivery */}
            <Alert className="mx-2 my-4 bg-yellow-50 border-yellow-200">
                <AlertTitle className="font-bold flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 h-5 w-5"><path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5"/><path d="m22 10.5-8.5 5-8.5-5"/><path d="M22 10.5V15l-3.5 2-3.5-2v-4.5"/></svg>
                    Rest assured with Open Box Delivery
                </AlertTitle>
                <AlertDescription className="text-xs text-muted-foreground pl-7">
                The Wishmaster will open the package at your doorstep, kindly check and return for damaged or incorrect item, and report any missing item at the doorstep only.
                </AlertDescription>
            </Alert>
            
            {/* Price Details */}
            <Card className="m-2">
                <CardHeader>
                    <CardTitle className="text-lg">Price Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div className="flex justify-between">
                        <span className="flex items-center gap-1">Price ({cart.length} items) <Info className="h-3 w-3 text-muted-foreground"/></span>
                        <span>₹{totalMRP.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                         <span className="flex items-center gap-1">Product Discount <Info className="h-3 w-3 text-muted-foreground"/></span>
                        <span className="text-green-600">-₹{totalSavings.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="flex items-center gap-1">Delivery Fee <Info className="h-3 w-3 text-muted-foreground"/></span>
                        <span>{deliveryFee > 0 ? `₹${deliveryFee.toFixed(2)}` : <span className="text-green-600">FREE</span>}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="flex items-center gap-1">Platform Fee <Info className="h-3 w-3 text-muted-foreground"/></span>
                        <span>₹{platformFee.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-base">
                        <span>Total Amount</span>
                        <span>₹{totalAmount.toFixed(2)}</span>
                    </div>
                </CardContent>
            </Card>

            <div className="my-4 mx-2 rounded-lg bg-green-50 p-3 text-center text-sm font-semibold text-green-700">
                You will save ₹{totalSavings.toFixed(0)} on this order
            </div>
        </div>
      </main>

       {cart.length > 0 && (
         <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background/95 shadow-lg backdrop-blur-sm">
            <div className="container mx-auto flex h-20 items-center justify-between px-4">
                <div>
                    <p className="text-xl font-bold">₹{totalAmount.toFixed(0)}</p>
                    <Link href="#" className="text-sm font-semibold text-primary">View price details</Link>
                </div>
                <Button asChild className="h-12 w-48 text-lg" size="lg">
                    <Link href="/checkout">Continue</Link>
                </Button>
            </div>
            <BottomNav />
        </div>
       )}
    </div>
  );
}
