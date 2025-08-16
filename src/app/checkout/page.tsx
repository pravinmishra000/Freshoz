
'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const handlePlaceOrder = () => {
    const orderDetails = {
      items: cart,
      total: totalPrice,
      orderId: `FRES-${Date.now()}`,
      orderDate: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem('freshoz_orders') || '[]');
    localStorage.setItem('freshoz_orders', JSON.stringify([...existingOrders, orderDetails]));
    
    localStorage.setItem('freshoz_last_order', JSON.stringify(orderDetails));

    clearCart();
    router.push('/order-confirmation');
  }

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
        </div>
    )
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
       <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
            <Button variant="ghost" size="icon" onClick={() => router.push('/cart')}>
                <ChevronLeft />
            </Button>
            <h1 className="text-xl font-bold">Checkout</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Billing & Shipping */}
            <div className="space-y-6">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Billing & Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" placeholder="Pravin" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" placeholder="Mishra" />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" placeholder="L-146, Ladali Bhawan, 2nd Floor" />
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input id="city" placeholder="Sultanganj" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="pincode">PIN Code</Label>
                                <Input id="pincode" placeholder="813213" />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" type="tel" placeholder="9097882555" />
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup defaultValue="cod" className="space-y-4">
                             <div>
                                <RadioGroupItem value="upi" id="upi" />
                                <Label htmlFor="upi" className="ml-2">UPI</Label>
                            </div>
                             <div>
                                <RadioGroupItem value="cod" id="cod" />
                                <Label htmlFor="cod" className="ml-2">Cash on Delivery (COD)</Label>
                            </div>
                             <div>
                                <RadioGroupItem value="card" id="card" />
                                <Label htmlFor="card" className="ml-2">Credit/Debit Card</Label>
                            </div>
                             <div>
                                <RadioGroupItem value="wallet" id="wallet" />
                                <Label htmlFor="wallet" className="ml-2">Wallet</Label>
                            </div>
                        </RadioGroup>
                    </CardContent>
                </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                       {cart.map(item => (
                         <div key={item.id} className="flex justify-between text-sm">
                             <span>{item.name_en} x {item.quantity}</span>
                             <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                         </div>
                       ))}
                        <Separator />
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Coupon</span>
                            <span className="text-green-600">-₹0.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Delivery</span>
                            <span className="text-green-600">FREE</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Final Total</span>
                            <span>₹{totalPrice.toFixed(2)}</span>
                        </div>
                    </CardContent>
                </Card>
                 <div className="flex flex-col gap-2">
                    <Button size="lg" className="h-12 text-lg" onClick={handlePlaceOrder}>Place Order</Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/cart">Back to Cart</Link>
                    </Button>
                </div>
            </div>

        </div>
      </main>
      
    </div>
  );
}
