
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/freshoz/header';
import { Footer } from '@/components/freshoz/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Package } from 'lucide-react';
import type { CartItem } from '@/context/cart-context';
import { BottomNav } from '@/components/freshoz/bottom-nav';

interface Order {
    items: CartItem[];
    total: number;
    orderId: string;
    orderDate: string;
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const savedOrders = localStorage.getItem('freshoz_orders');
        if (savedOrders) {
            setOrders(JSON.parse(savedOrders).sort((a: Order, b: Order) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()));
        }
    }, []);

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1 pb-20">
                <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <h1 className="mb-8 font-headline text-3xl font-bold">My Orders</h1>
                    {orders.length === 0 ? (
                         <div className="flex h-64 flex-col items-center justify-center rounded-md border border-dashed text-center">
                            <Package className="h-16 w-16 text-muted-foreground" />
                            <p className="mt-4 text-lg text-muted-foreground">You haven't placed any orders yet.</p>
                            <Button asChild className="mt-6">
                                <Link href="/">Start Shopping</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map(order => (
                                <Card key={order.orderId}>
                                    <CardHeader className="flex flex-row justify-between items-center">
                                        <div>
                                            <CardTitle>Order {order.orderId}</CardTitle>
                                            <p className="text-sm text-muted-foreground">
                                                Placed on {new Date(order.orderDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-lg">₹{order.total.toFixed(2)}</p>
                                            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">Processing</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-1 text-sm text-muted-foreground">
                                             {order.items.map(item => (
                                                <li key={item.id}>
                                                    {item.name_en} x {item.quantity}
                                                </li>
                                             ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
}
