
'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Wallet, ChevronLeft, Lock, ChevronDown, Landmark, Gift, Percent } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function PaymentPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
      router.push('/');
      return null;
  }

  const paymentOptions = [
      { id: 'upi', label: 'UPI', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> },
      { id: 'card', label: 'Credit / Debit / ATM Card', icon: <CreditCard/> },
      { id: 'netbanking', label: 'Net Banking', icon: <Landmark/> },
      { id: 'cod', label: 'Cash on Delivery', icon: <Wallet/> },
      { id: 'giftcard', label: 'Have a Freshoz Gift Card?', icon: <Gift/>, action: 'Add' },
      { id: 'emi', label: 'EMI', icon: <Percent/>, status: 'Unavailable' },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
       <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.push('/checkout')}>
                    <ChevronLeft />
                </Button>
                <div>
                    <p className="text-xs text-muted-foreground">Step 3 of 3</p>
                    <h1 className="text-xl font-bold">Payments</h1>
                </div>
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold text-muted-foreground">
                <Lock className="h-4 w-4"/>
                <span>100% Secure</span>
            </div>
        </div>
      </header>

      <main className="flex-1 pb-20">
        <div className="bg-background shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 font-bold">
                <div className="flex items-center gap-2 text-primary">
                    <span>Total Amount</span>
                    <ChevronDown className="h-5 w-5"/>
                </div>
                <span className="text-xl">₹{totalPrice.toFixed(2)}</span>
            </div>
        </div>

        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Saved Payment Options</CardTitle>
                </CardHeader>
                <CardContent>
                    <RadioGroup defaultValue="saved-card" className="space-y-4">
                        <div className="flex items-center space-x-3 rounded-md border-2 border-primary bg-primary/5 p-4">
                            <RadioGroupItem value="saved-card" id="saved-card"/>
                            <Label htmlFor="saved-card" className="flex-1">
                                <div className="flex items-center justify-between">
                                    <span className="font-bold">ICICI Bank Debit Card • 0760</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="#f26522" d="M128 26.313c-56.25 0-101.875 45.625-101.875 101.875S71.75 229.688 128 229.688s101.875-45.625 101.875-101.875S184.25 26.313 128 26.313m43.438 41.562c16.25 9.375 28.125 25.625 28.125 43.438h-28.125c-3.125-11.25-10-20.625-20.625-26.25zm-86.876 0l21.25 36.875c-15 4.375-26.875 16.875-31.875 32.5h-26.25c4.375-23.75 18.75-43.75 36.875-51.875m-15.625 69.375h25c1.25 4.375 2.5 8.75 5 12.5l-29.375 16.875c-11.25-10.625-19.375-23.75-23.125-38.125m86.25 60.625c-15.625-8.75-27.5-25-27.5-43.438h27.5c3.125 11.25 10 20.625 20.625 26.25l-20.625 17.188zm-51.25-27.5c-4.375-5.625-7.5-12.5-8.75-20h50c-1.25-17.5-16.25-30.625-33.125-30.625c-13.75 0-25.625 7.5-31.25 18.125l-25 43.125c6.25 18.125 21.875 31.875 40.625 35.625l7.5-16.875zm51.25-20h30c-1.25 4.375-2.5 8.125-5 11.875l-25 14.375z"/></svg>
                                </div>
                            </Label>
                        </div>
                        <div className="pl-10 flex gap-4">
                            <Input placeholder="CVV" className="w-32"/>
                            <Button className="flex-1" size="lg" onClick={handlePlaceOrder}>Pay ₹{totalPrice.toFixed(2)}</Button>
                        </div>
                    </RadioGroup>
                </CardContent>
            </Card>

            <Accordion type="single" collapsible className="w-full bg-background mt-4 rounded-lg shadow-sm">
                {paymentOptions.map(option => (
                <AccordionItem value={option.id} key={option.id}>
                    <AccordionTrigger className="p-4 font-bold text-base hover:no-underline">
                        <div className="flex items-center gap-4">
                            {option.icon}
                            <span>{option.label}</span>
                        </div>
                         {option.action && <Button variant="link" className="font-bold">{option.action}</Button>}
                         {option.status && <span className="text-sm text-muted-foreground font-medium">{option.status}</span>}
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-0">
                       <p>Pay using any UPI app on your phone.</p>
                       <Button className="mt-4" onClick={handlePlaceOrder}>Pay Now</Button>
                    </AccordionContent>
                </AccordionItem>
                ))}
            </Accordion>
        </div>
      </main>
    </div>
  );
}
