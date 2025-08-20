
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/freshoz/header';
import { Footer } from '@/components/freshoz/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2 } from 'lucide-react';
import type { CartItem } from '@/context/cart-context';
import { BottomNav } from '@/components/freshoz/bottom-nav';

interface OrderDetails {
    items: CartItem[];
    total: number;
    orderId: string;
    orderDate: string;
}

export default function OrderConfirmationPage() {
    const [order, setOrder] = useState<OrderDetails | null>(null);

    useEffect(() => {
        const savedOrder = localStorage.getItem('freshoz_last_order');
        if (savedOrder) {
            setOrder(JSON.parse(savedOrder));
        }
    }, []);

    if (!order) {
        return (
             <div className="flex min-h-screen flex-col bg-background">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <p>Loading order details...</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1 pb-20">
                <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <Card className="mx-auto max-w-2xl">
                        <CardHeader className="items-center text-center">
                            <CheckCircle2 className="h-16 w-16 text-green-500" />
                            <CardTitle className="text-2xl">Thank you for your order!</CardTitle>
                            <p className="text-muted-foreground">
                                Your order <span className="font-semibold text-primary">{order.orderId}</span> has been placed.
                            </p>
                            <p className="text-sm text-muted-foreground">Estimated delivery: 2-3 business days</p>
                            <p className="text-sm text-muted-foreground">Payment Method: <span className="font-semibold text-foreground">Cash on Delivery</span></p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <h3 className="font-semibold">Order Summary</h3>
                                <ul className="space-y-2">
                                    {order.items.map(item => (
                                        <li key={item.id} className="flex justify-between text-sm">
                                            <span>{item.name_en} x{item.quantity}</span>
                                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Separator />
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total to be Paid</span>
                                    <span>₹{order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                         <CardFooter className="flex flex-col gap-4 sm:flex-row justify-center">
                             <Button asChild>
                                <Link href="/">Continue Shopping</Link>
                            </Button>
                             <Button asChild variant="outline">
                                <Link href="/orders">View My Orders</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
}
