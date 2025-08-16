
'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, Lock, MapPin, User, Phone, Home, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { BottomNav } from '@/components/freshoz/bottom-nav';
import Image from 'next/image';

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();
  
  if (cart.length === 0) {
    return (
        <div className="flex min-h-screen flex-col bg-muted/20">
            <main className="flex-1 flex items-center justify-center">
                <div className="text-center p-4">
                    <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                    <p className="text-muted-foreground mb-6">Add some products to your cart to proceed to checkout.</p>
                    <Button asChild>
                        <Link href="/">Continue Shopping</Link>
                    </Button>
                </div>
            </main>
            <BottomNav />
        </div>
    )
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalMRP = cart.reduce((sum, item) => sum + item.mrp * item.quantity, 0);
  const totalSavings = totalMRP - totalPrice;

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
       <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft />
                </Button>
                <div>
                    <p className="text-xs text-muted-foreground">Step 2 of 3</p>
                    <h1 className="text-xl font-bold">Checkout</h1>
                </div>
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold text-muted-foreground">
                <Lock className="h-4 w-4"/>
                <span>100% Secure</span>
            </div>
        </div>
      </header>

      <main className="flex-1 pb-24">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Delivery Address</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <Home className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                                <div>
                                <p className="font-bold">Home</p>
                                <p className="text-sm text-muted-foreground">123, Main Road, Near City Hall, Sultanganj, Bhagalpur, Bihar - 813213</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">Change</Button>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            <User className="h-5 w-5 text-muted-foreground"/>
                            <p className="font-semibold">John Doe</p>
                        </div>
                         <div className="flex items-center gap-4 text-sm">
                            <Phone className="h-5 w-5 text-muted-foreground"/>
                            <p className="font-semibold">+91 98765 43210</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                           <ShoppingBag /> Order Summary
                        </CardTitle>
                    </CardHeader>
                     <CardContent>
                        <ul className="space-y-4">
                            {cart.map(item => (
                                <li key={item.id} className="flex items-center gap-4">
                                    <div className="relative h-16 w-16 flex-shrink-0">
                                        <Image src={item.image} alt={item.name_en} layout="fill" className="rounded-md object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">{item.name_en}</p>
                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Price Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Price ({cart.length} items)</span>
                            <span>₹{totalMRP.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Discount</span>
                            <span className="text-green-600">-₹{totalSavings.toFixed(2)}</span>
                        </div>
                         <div className="flex justify-between">
                            <span>Delivery Charges</span>
                            <span className="text-green-600">FREE</span>
                        </div>
                        <Separator className="my-2"/>
                        <div className="flex justify-between font-bold text-base">
                            <span>Total Amount</span>
                            <span>₹{totalPrice.toFixed(2)}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
      
       <div className="fixed bottom-0 left-0 z-10 w-full border-t bg-background/95 p-4 shadow-lg backdrop-blur-sm">
            <div className="container mx-auto flex items-center justify-between">
                 <div>
                    <p className="text-xl font-bold">₹{totalPrice.toFixed(0)}</p>
                    <p className="text-xs text-muted-foreground">Total Amount</p>
                </div>
                <Button asChild className="h-12 w-48 text-lg" size="lg">
                    <Link href="/payment">Proceed to Payment</Link>
                </Button>
            </div>
        </div>
    </div>
  );
}
