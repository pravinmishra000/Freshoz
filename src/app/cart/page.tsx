'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Header } from '@/components/freshoz/header';
import { Footer } from '@/components/freshoz/footer';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="mb-8 font-headline text-3xl font-bold">Your Cart</h1>
          {cart.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center rounded-md border border-dashed text-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground" />
              <p className="mt-4 text-lg text-muted-foreground">Your cart is empty.</p>
              <Button asChild className="mt-6">
                <Link href="/">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-0">
                    <ul className="divide-y">
                      {cart.map((item) => (
                        <li key={item.id} className="flex items-center gap-4 p-4">
                          <Image
                            src={item.image}
                            alt={item.name_en}
                            width={80}
                            height={80}
                            className="rounded-md object-cover"
                            data-ai-hint="product image"
                          />
                          <div className="flex-1">
                            <p className="font-semibold">{item.name_en}</p>
                            <p className="text-sm text-muted-foreground">₹{item.price}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => removeFromCart(item.id, true)}
                              className="h-8 w-8"
                            >
                               <Trash2 className="h-4 w-4" />
                            </Button>
                             <Button
                              size="icon"
                              variant="outline"
                              onClick={() => removeFromCart(item.id)}
                              className="h-8 w-8"
                            >
                               <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-bold">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => addToCart(item)}
                              className="h-8 w-8"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="w-20 text-right font-semibold">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Button variant="outline" onClick={clearCart} className="mt-4">
                  Clear Cart
                </Button>
              </div>

              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Charges</span>
                      <span>FREE</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Proceed to Checkout</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}