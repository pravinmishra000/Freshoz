'use client';

import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/freshoz/header';
import { Footer } from '@/components/freshoz/footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Wallet, MapPin, User, Phone } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    // In a real app, this would trigger the payment and order creation process.
    alert('Order placed successfully! (Simulation)');
    clearCart();
    // Redirect to an order confirmation page, e.g., router.push('/order-success');
  }

  if (cart.length === 0) {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                    <p className="text-muted-foreground mb-6">Add some products to your cart to proceed to checkout.</p>
                    <Button asChild>
                        <Link href="/">Continue Shopping</Link>
                    </Button>
                </div>
            </main>
            <Footer />
        </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="mb-8 font-headline text-3xl font-bold">Checkout</h1>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Left side: Address & Payment */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {/* Delivery Address */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="text-primary"/>
                      Delivery Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name"><User className="inline-block mr-2 h-4 w-4"/>Name</Label>
                            <Input id="name" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone"><Phone className="inline-block mr-2 h-4 w-4"/>Phone</Label>
                            <Input id="phone" placeholder="123-456-7890" type="tel"/>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" placeholder="1234 Main St" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                         <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="Bhagalpur" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input id="state" placeholder="Bihar" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="pincode">Pincode</Label>
                            <Input id="pincode" placeholder="813213" />
                        </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Options */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="text-primary"/>
                        Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup defaultValue="cod" className="space-y-4">
                       <div className="flex items-center space-x-2 rounded-md border p-4">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex items-center gap-2 font-medium">
                            <Wallet /> Cash on Delivery (COD)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-4">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="flex items-center gap-2 font-medium">
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                           UPI / Credit Card (Online)
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right side: Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ul className="space-y-2">
                      {cart.map(item => (
                        <li key={item.id} className="flex justify-between text-sm">
                          <span>{item.name_en} x{item.quantity}</span>
                          <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                    <Separator />
                     <div className="flex justify-between font-semibold">
                        <span>Subtotal</span>
                        <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Delivery Charges</span>
                        <span>FREE</span>
                    </div>
                     <Separator />
                     <div className="flex justify-between text-lg font-bold">
                        <span>Total Payable</span>
                        <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardContent>
                    <Button className="w-full" onClick={handlePlaceOrder}>Place Order</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
