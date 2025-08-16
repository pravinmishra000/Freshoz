
'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, Home, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { BottomNav } from '@/components/freshoz/bottom-nav';
import Image from 'next/image';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

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

  const deliveryDates = [
      { day: 'Tue', date: '5 Aug', id: 'd1' },
      { day: 'Wed', date: '6 Aug', id: 'd2' },
      { day: 'Thu', date: '7 Aug', id: 'd3' },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
       <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ChevronLeft />
            </Button>
            <h1 className="text-xl font-bold">Order Summary</h1>
        </div>
      </header>

      <main className="flex-1 pb-24">
         {/* Progress Stepper */}
        <div className="bg-background py-4">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center text-center text-primary">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-primary text-primary-foreground">
                           <CheckCircle className="h-4 w-4" />
                        </div>
                        <p className="text-xs font-bold">Address</p>
                    </div>
                     <div className="flex-1 h-0.5 bg-primary mx-2"></div>
                    <div className="flex flex-col items-center text-center text-primary">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-primary text-primary-foreground">
                            <span className="text-xs font-bold">2</span>
                        </div>
                        <p className="text-xs font-bold">Order Summary</p>
                    </div>
                     <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
                     <div className="flex flex-col items-center text-center text-muted-foreground">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2">
                           <span className="text-xs font-bold">3</span>
                        </div>
                        <p className="text-xs">Payment</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
                <Card>
                    <CardContent className="p-4 space-y-2">
                         <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold">Pravin Mishra</p>
                                        <span className="text-xs font-medium bg-gray-100 px-2 py-0.5 rounded">HOME</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">L-146, Ladali Bhawan, 2nd Floor,, Road N...</p>
                                    <p className="text-sm text-muted-foreground">9097882555</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">Change</Button>
                        </div>
                        <p className="text-xs text-muted-foreground">Check if the address is suitable for collecting grocery delivery</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Grocery basket ({cart.length} items)</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <div className="flex space-x-4 overflow-x-auto pb-4">
                           {cart.map(item => (
                                <div key={item.id} className="flex-shrink-0 w-20 text-center">
                                    <div className="relative h-20 w-20 bg-gray-100 rounded-md p-1">
                                        <Image src={item.image} alt={item.name_en} layout="fill" className="object-contain" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-2xl font-bold">₹{totalPrice.toFixed(0)}</span>
                            <span className="text-muted-foreground line-through">₹{totalMRP.toFixed(0)}</span>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Choose a Delivery slot</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-2">
                            {deliveryDates.map((date, index) => (
                                <button key={date.id} className={`flex-1 rounded-lg p-2 text-center border-2 ${index === 0 ? 'border-primary bg-primary/10' : 'border-gray-200'}`}>
                                    <p className="font-bold">{date.day}</p>
                                    <p className="text-sm">{date.date}</p>
                                </button>
                            ))}
                        </div>
                        <div className="mt-4">
                            <RadioGroup defaultValue="slot1">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="slot1" id="slot1" />
                                    <Label htmlFor="slot1">8:10 AM to 8:10 PM</Label>
                                </div>
                            </RadioGroup>
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
                    <Link href="#" className="text-sm font-semibold text-primary">View price details</Link>
                </div>
                <Button asChild className="h-12 w-48 text-lg" size="lg">
                    <Link href="/payment">Continue</Link>
                </Button>
            </div>
        </div>
    </div>
  );
}
