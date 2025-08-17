
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/freshoz/header';
import { Footer } from '@/components/freshoz/footer';
import { Minus, Plus, ChevronRight, PercentSquare, Sparkles, Tag, Info, ShieldCheck, Ticket, CheckCircle, X, MessageSquare, Heart, Bike } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BottomNav } from '@/components/freshoz/bottom-nav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export default function CartPage() {
  const { cart, addToCart, removeFromCart } = useCart();
  const [appliedCoupon, setAppliedCoupon] = useState<null | 'FLAT50' | 'FLAT150'>(null);
  const [isDeliveryBannerVisible, setIsDeliveryBannerVisible] = useState(true);
  const [tipAmount, setTipAmount] = useState(0);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalMRP = cart.reduce((sum, item) => sum + item.mrp * item.quantity, 0);
  const totalSavings = totalMRP - totalPrice;
  const deliveryFee = 0;
  const platformFee = 9;

  let couponDiscount = 0;
  if (appliedCoupon === 'FLAT50') {
    couponDiscount = 50;
  } else if (appliedCoupon === 'FLAT150') {
    couponDiscount = 150;
  }
  
  const totalAmount = totalPrice + deliveryFee + platformFee - couponDiscount + tipAmount;

  const handleApplyCoupon = (coupon: 'FLAT50' | 'FLAT150') => {
    setAppliedCoupon(coupon);
  };
  
  const handleTipSelect = (amount: number) => {
    setTipAmount(prev => prev === amount ? 0 : amount);
  }


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
            
            <div className="bg-white py-4">
              {/* Apply Coupon */}
              <Card className="m-2">
                  <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2">
                          <Input placeholder="Enter coupon code (e.g. GROCERY200)" />
                          <Button variant="outline">Apply</Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                          Use GROCERY200 for ₹200 off on purchases up to ₹5000.
                      </p>
                  </CardContent>
              </Card>

              {/* Auto-applied coupons */}
              <div className="m-2 space-y-2">
                  {totalPrice > 1000 && (
                      <Card className="bg-green-50 border-green-200">
                          <CardContent className="p-3 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                  <Ticket className="h-6 w-6 text-green-600" />
                                  <div>
                                      <p className="font-bold text-green-800">Flat ₹50 Off</p>
                                      <p className="text-xs text-green-700">On orders above ₹1000</p>
                                  </div>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="bg-white border-green-600 text-green-600 hover:bg-green-100"
                                onClick={() => handleApplyCoupon('FLAT50')}
                                disabled={appliedCoupon === 'FLAT50'}
                              >
                                {appliedCoupon === 'FLAT50' ? 'Applied' : 'Apply'}
                              </Button>
                          </CardContent>
                      </Card>
                  )}
                  {totalPrice > 2500 && (
                      <Card className="bg-green-50 border-green-200">
                          <CardContent className="p-3 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                  <Ticket className="h-6 w-6 text-green-600" />
                                  <div>
                                      <p className="font-bold text-green-800">Flat ₹150 Off</p>
                                      <p className="text-xs text-green-700">On orders above ₹2500</p>
                                  </div>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="bg-white border-green-600 text-green-600 hover:bg-green-100"
                                onClick={() => handleApplyCoupon('FLAT150')}
                                disabled={appliedCoupon === 'FLAT150'}
                              >
                                {appliedCoupon === 'FLAT150' ? 'Applied' : 'Apply'}
                              </Button>
                          </CardContent>
                      </Card>
                  )}
              </div>
            </div>

            {/* Delivery Instructions */}
             <Card className="m-2">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary"/> Delivery Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea placeholder="e.g., Avoid ringing the bell, leave at the door..." />
                    <div className="flex items-center space-x-2 mt-4">
                        <Checkbox id="no-bell" />
                        <label htmlFor="no-bell" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Don't ring the bell
                        </label>
                    </div>
                </CardContent>
            </Card>

            {/* Tip your delivery partner */}
             <Card className="m-2">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><Heart className="h-5 w-5 text-primary"/> Tip your delivery partner</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Thank your delivery partner for their hard work. 100% of the tip will go to them.</p>
                    <div className="flex flex-wrap gap-2">
                        {[20, 30, 50].map(tip => (
                            <Button 
                                key={tip} 
                                variant={tipAmount === tip ? "default" : "outline"} 
                                onClick={() => handleTipSelect(tip)}
                                className={cn("rounded-full", tipAmount === tip && "bg-green-600 hover:bg-green-700")}
                            >
                                ₹{tip}
                            </Button>
                        ))}
                        <Input 
                            type="number"
                            placeholder="Custom" 
                            className="w-24"
                            onChange={(e) => setTipAmount(parseInt(e.target.value) || 0)}
                        />
                    </div>
                </CardContent>
            </Card>

            
            {/* Price Details */}
            <Card className="m-2">
                <CardHeader>
                    <CardTitle className="text-lg">Price Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    {totalSavings > 0 && (
                        <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-center font-semibold text-green-700">
                            Your total savings on this order is ₹{totalSavings.toFixed(2)}
                        </div>
                    )}
                    <div className="flex justify-between">
                        <span className="flex items-center gap-1">Subtotal</span>
                        <span>₹{totalMRP.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                         <span className="flex items-center gap-1">Discount on MRP</span>
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
                        <span className="text-green-600">-₹{couponDiscount.toFixed(2)}</span>
                    </div>
                    {tipAmount > 0 && (
                         <div className="flex justify-between">
                            <span className="flex items-center gap-1">Delivery Tip</span>
                            <span>₹{tipAmount.toFixed(2)}</span>
                        </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-bold text-base">
                        <span>Total Amount</span>
                        <span>₹{totalAmount.toFixed(2)}</span>
                    </div>
                </CardContent>
            </Card>

             {/* Cancellation Policy */}
             <Card className="m-2 bg-blue-50 border-blue-100">
                <CardContent className="p-4 flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-semibold text-blue-800">Cancellation Policy</h4>
                        <p className="text-xs text-blue-700">
                           Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.
                        </p>
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
         <div className="fixed bottom-0 left-0 z-50 w-full md:hidden">
             {isDeliveryBannerVisible && (
                <div className="px-4 pb-2">
                    <div className="mx-auto flex max-w-md items-center justify-between rounded-lg bg-blue-100 p-2 text-sm text-blue-800 shadow-lg">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-blue-600"/>
                            <p><span className="font-bold">Yay! You got FREE Delivery</span> No coupon needed</p>
                        </div>
                        <button onClick={() => setIsDeliveryBannerVisible(false)}><X className="h-5 w-5"/></button>
                    </div>
                </div>
            )}
            <div className="border-t bg-background/95 shadow-lg backdrop-blur-sm">
                <BottomNav />
            </div>
        </div>
       )}
    </div>
  );
}
