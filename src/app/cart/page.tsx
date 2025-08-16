
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

            {/* Apply Coupon */}
             <Card className="m-2">
              <CardContent className="p-4 space-y-2">
                 <div className="flex items-center gap-2">
                    <Input placeholder="Enter coupon code (SAVE50, GROCERY200)" />
                    <Button variant="outline">Apply</Button>
                </div>
                 <p className="text-xs text-muted-foreground">
                    Use SAVE50 for flat ₹50 off on orders above ₹1000.
                 </p>
                 <p className="text-xs text-muted-foreground">
                    Use GROCERY200 for ₹200 off on purchases up to ₹5000.
                 </p>
              </CardContent>
            </Card>

            
            {/* Price Details */}
            <Card className="m-2">
                <CardHeader>
                    <CardTitle className="text-lg">Price Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div className="flex justify-between">
                        <span className="flex items-center gap-1">Subtotal</span>
                        <span>₹{totalMRP.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                         <span className="flex items-center gap-1">Discount</span>
                        <span className="text-green-600">-₹{totalSavings.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="flex items-center gap-1">Delivery Fee</span>
                        <span>{deliveryFee > 0 ? `₹${deliveryFee.toFixed(2)}` : <span className="text-green-600">FREE</span>}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="flex items-center gap-1">Platform Fee</span>
                        <span>₹{platformFee.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="flex items-center gap-1">Coupon Discount</span>
                        <span className="text-green-600">-₹0.00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-base">
                        <span>Total Amount</span>
                        <span>₹{totalAmount.toFixed(2)}</span>
                    </div>
                </CardContent>
            </Card>


            <div className="mx-2 my-4 flex gap-2">
                 <Button variant="outline" className="w-full h-12 text-lg" size="lg">
                    Update Cart
                </Button>
                 <Button asChild className="w-full h-12 text-lg" size="lg">
                    <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
            </div>
        </div>
      </main>

       {cart.length > 0 && (
         <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background/95 shadow-lg backdrop-blur-sm md:hidden">
            <BottomNav />
        </div>
       )}
    </div>
  );
}
