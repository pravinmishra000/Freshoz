'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/freshoz/header';
import { Footer } from '@/components/freshoz/footer';
import { Minus, Plus, ChevronRight, PercentSquare, Sparkles, Tag, Info, ShieldCheck, Ticket, CheckCircle, X, MessageSquare, Heart, Bike, BellOff, PhoneOff, UserSquare, DoorOpen, ShoppingCart } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BottomNav } from '@/components/freshoz/bottom-nav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { products } from '@/lib/data';
import { ProductCard } from '@/components/freshoz/product-card';

export default function CartPage() {
  const { cart, addToCart, removeFromCart } = useCart();
  const [appliedCoupon, setAppliedCoupon] = useState<null | 'FLAT50' | 'FLAT150'>(null);
  const [isDeliveryBannerVisible, setIsDeliveryBannerVisible] = useState(true);
  const [tipAmount, setTipAmount] = useState(0);
  const [selectedInstruction, setSelectedInstruction] = useState<string | null>(null);
  const [saveForFuture, setSaveForFuture] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalMRP = cart.reduce((sum, item) => sum + item.mrp * item.quantity, 0);
  const totalSavings = totalMRP - subtotal;
  const freeDeliveryThreshold = 199;
  const deliveryFee = subtotal > 0 && subtotal < freeDeliveryThreshold ? 29 : 0;
  const platformFee = cart.length > 0 ? 9 : 0;
  const amountNeededForFreeDelivery = freeDeliveryThreshold - subtotal;

  let couponDiscount = 0;
  if (appliedCoupon === 'FLAT50') {
    couponDiscount = 50;
  } else if (appliedCoupon === 'FLAT150') {
    couponDiscount = 150;
  }
  
  const totalAmount = subtotal + deliveryFee + platformFee - couponDiscount + tipAmount;
  
  const recentlyViewedProducts = products.slice(0, 5);
  const sponsoredProducts = products.slice(5, 10);

  const handleApplyCoupon = (coupon: 'FLAT50' | 'FLAT150') => {
    setAppliedCoupon(coupon);
  };
  
  const handleTipSelect = (amount: number) => {
    setTipAmount(prev => prev === amount ? 0 : amount);
  }
  
  const deliveryInstructions = [
    { id: 'bell', icon: BellOff, text: "Don't ring the bell" },
    { id: 'call', icon: PhoneOff, text: "Avoid calling" },
    { id: 'guard', icon: UserSquare, text: "Leave with guard" },
    { id: 'door', icon: DoorOpen, text: "Leave at door" },
  ];

  const handleInstructionSelect = (instruction: string) => {
    const newInstruction = selectedInstruction === instruction ? null : instruction;
    setSelectedInstruction(newInstruction);
  };

  const handleClearSelection = () => {
    setSelectedInstruction(null);
  };

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
                <div className="py-8 text-center">
                    <div className="relative mx-auto h-48 w-48">
                         <ShoppingCart className="h-full w-full text-gray-300" />
                    </div>
                    <h2 className="mt-4 text-2xl font-bold">Your cart is empty</h2>
                    <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
                     <Button asChild className="mt-6">
                        <Link href="/">Shop Now</Link>
                    </Button>

                     <div className="mt-12 text-left">
                        <h3 className="px-4 text-xl font-bold mb-4">Recently Viewed</h3>
                         <div className="flex space-x-4 overflow-x-auto px-4 pb-4">
                            {recentlyViewedProducts.map((product) => (
                                <div key={product.id} className="w-40 flex-shrink-0">
                                    <ProductCard product={product} view="suggestion" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 text-left">
                         <h3 className="px-4 text-xl font-bold mb-4">Sponsored Ads</h3>
                        <div className="flex space-x-4 overflow-x-auto px-4 pb-4">
                           {sponsoredProducts.map((product) => (
                                <div key={product.id} className="w-40 flex-shrink-0">
                                    <ProductCard product={product} view="suggestion" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                ) : (
                <ul className="divide-y">
                    {cart.map((item) => (
                    <li key={item.id} className="flex gap-4 p-4">
                        <div className="relative h-20 w-20 flex-shrink-0">
                            {item.image ? (
                                <Image
                                    src={item.image}
                                    alt={item.name_en}
                                    fill
                                    className="rounded-md object-contain"
                                    data-ai-hint="product image"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center rounded-md bg-muted">
                                    <MessageSquare className="h-8 w-8 text-muted-foreground" />
                                </div>
                            )}
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
            
          {cart.length > 0 && (
            <>
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
                  {subtotal > 1000 && (
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
                  {subtotal > 2500 && (
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

            {/* Delivery Instructions - Updated */}
            <Card className="m-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-bold">Delivery instructions</CardTitle>
                {selectedInstruction && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleClearSelection}
                    className="h-8 px-2 text-muted-foreground"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {deliveryInstructions.map((instruction) => (
                    <button
                      key={instruction.id}
                      onClick={() => handleInstructionSelect(instruction.text)}
                      className={cn(
                        "relative flex-shrink-0 w-32 h-20 p-2 border rounded-lg flex flex-col items-center justify-center text-center gap-1 transition-all",
                        selectedInstruction === instruction.text
                          ? "border-green-600 bg-green-50/50"
                          : "border-gray-300 bg-white hover:border-gray-400"
                      )}
                    >
                      <instruction.icon className="h-6 w-6 text-gray-700" />
                      <span className="text-xs font-medium">{instruction.text}</span>
                      {selectedInstruction === instruction.text && (
                        <div className="absolute top-1 right-1 h-4 w-4 bg-green-600 text-white rounded-full flex items-center justify-center">
                          <CheckCircle className="h-3 w-3" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox 
                    id="save-instructions" 
                    checked={saveForFuture}
                    onCheckedChange={(checked) => setSaveForFuture(checked === true)}
                  />
                  <Label htmlFor="save-instructions" className="text-sm font-medium leading-none cursor-pointer">
                    Save for all orders at this address
                  </Label>
                </div>
                
                {!selectedInstruction && (
                  <p className="text-xs text-muted-foreground mt-3">
                    Select an option or continue without special instructions
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Tip your delivery partner */}
             <Card className="m-2">
                <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                        <div>
                             <h3 className="font-bold">Tip your delivery partner</h3>
                             <p className="text-sm text-muted-foreground">Your kindness means a lot! 100% of your tip will go directly to them.</p>
                        </div>
                        <Image src="https://placehold.co/100x70.png" width={100} height={70} alt="Delivery partner" data-ai-hint="delivery scooter" />
                    </div>
                     <div className="flex flex-wrap gap-2 mt-4">
                        {[
                            { amount: 20, emoji: '😊' },
                            { amount: 30, emoji: '😄' },
                            { amount: 50, emoji: '🥰' }
                        ].map(tip => (
                            <Button 
                                key={tip.amount} 
                                variant={tipAmount === tip.amount ? "default" : "outline"} 
                                onClick={() => handleTipSelect(tip.amount)}
                                className={cn("rounded-full", tipAmount === tip.amount && "bg-green-600 hover:bg-green-700")}
                            >
                                {tip.emoji} ₹{tip.amount}
                            </Button>
                        ))}
                        <Input 
                            type="number"
                            placeholder="Custom" 
                            className="w-28"
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
            </>
          )}
        </div>
      </main>

       <div className="fixed bottom-0 left-0 z-50 w-full md:hidden">
           {cart.length > 0 && isDeliveryBannerVisible && (
              <div className="px-4 pb-2">
                 {subtotal >= freeDeliveryThreshold ? (
                    <div className="mx-auto flex max-w-md items-center justify-between rounded-lg bg-blue-100 p-2 text-sm text-blue-800 shadow-lg">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-blue-600"/>
                            <p><span className="font-bold">Yay! You got FREE Delivery.</span> No coupon needed</p>
                        </div>
                        <button onClick={() => setIsDeliveryBannerVisible(false)}><X className="h-5 w-5"/></button>
                    </div>
                 ) : (
                    <div className="mx-auto flex max-w-md items-center justify-between rounded-lg bg-amber-100 p-2 text-sm text-amber-800 shadow-lg">
                        <div className="flex items-center gap-2">
                            <Bike className="h-5 w-5 text-amber-600"/>
                            <p>Add <span className="font-bold">₹{amountNeededForFreeDelivery.toFixed(2)}</span> to get free delivery</p>
                        </div>
                        <button onClick={() => setIsDeliveryBannerVisible(false)}><X className="h-5 w-5"/></button>
                    </div>
                 )}
              </div>
          )}
          <div className="border-t bg-background/95 shadow-lg backdrop-blur-sm">
              <BottomNav />
          </div>
      </div>
    </div>
  );
}