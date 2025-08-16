
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/freshoz/header';
import { Footer } from '@/components/freshoz/footer';
import { Minus, Plus, ChevronRight, PercentSquare, Sparkles, Tag } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BottomNav } from '@/components/freshoz/bottom-nav';

export default function CartPage() {
  const { cart, addToCart, removeFromCart } = useCart();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalMRP = cart.reduce((sum, item) => sum + item.mrp * item.quantity, 0);
  const totalSavings = totalMRP - totalPrice;
  const savingsPercentage = totalMRP > 0 ? Math.round((totalSavings / totalMRP) * 100) : 0;


  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold">Grocery ({cart.length})</h1>
        </div>
      </header>

      <main className="flex-1 pb-24">
        <div className="container mx-auto px-0 py-2 sm:px-4">

         {/* Offers Section */}
          <div className="space-y-2 bg-white p-4">
             <div className="rounded-lg border border-dashed border-green-500 bg-green-50 p-3 text-green-800">
                <div className="flex items-center gap-2 font-bold">
                    <PercentSquare/>
                    <p>₹500 Off on order above ₹3999</p>
                </div>
                <div className="ml-8 mt-1 text-sm">
                    <span className="font-semibold">ICICI Bank</span> | <span className="font-semibold">BOBCARD</span> ₹300 off on ₹2,000
                    <span className="float-right text-xs">T&C apply</span>
                </div>
            </div>
             <Alert variant="destructive" className="border-yellow-400 bg-yellow-50 text-yellow-800 [&>svg]:text-yellow-800">
                <AlertDescription>
                *Offers will not be applicable on oil, ghee & baby products
                </AlertDescription>
            </Alert>
            <div className="flex items-center gap-2 rounded-lg bg-green-100 p-3 font-semibold text-green-700">
                <Sparkles className="h-6 w-6"/>
                <p>₹{totalSavings.toFixed(0)} ({savingsPercentage}%) saved so far</p>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                    <Tag className="h-6 w-6 text-primary"/>
                    <div>
                        <p className="font-bold">Flat Rs.50 off</p>
                        <p className="text-sm text-muted-foreground">On Orders Above Rs.749</p>
                    </div>
                </div>
                <Button variant="outline">Apply</Button>
            </div>
             <Link href="#" className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3 font-semibold">
                     <PercentSquare className="h-6 w-6 text-primary"/>
                    <span>View all offers</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground"/>
            </Link>
          </div>
          

          {/* Cart Items */}
          <div className="mt-4 bg-white">
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
        </div>
      </main>

       {cart.length > 0 && (
         <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background shadow-lg">
            <div className="container mx-auto flex h-20 items-center justify-between px-4">
                <div>
                    <p className="text-xl font-bold">₹{totalPrice.toFixed(0)}</p>
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
