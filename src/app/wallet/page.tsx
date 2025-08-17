
'use client';

import * as React from 'react';
import { Wallet, ChevronLeft, ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BottomNav } from '@/components/freshoz/bottom-nav';
import { cn } from '@/lib/utils';

export default function WalletPage() {
    const router = useRouter();
    const walletBalance = 500.00;

    const transactions = [
        { type: 'credit', amount: 50.00, description: 'Cashback from coupon SAVE50', date: '2024-07-28', color: 'text-yellow-500' },
        { type: 'debit', amount: 199.00, description: 'Order #1234 Payment', date: '2024-07-27', color: 'text-red-500' },
        { type: 'credit', amount: 200.00, description: 'Refund for Order #1230', date: '2024-07-26', color: 'text-green-500' },
        { type: 'debit', amount: 350.00, description: 'Order #1225 Payment', date: '2024-07-25', color: 'text-red-500' },
    ];
    
    return (
        <div className="flex min-h-screen flex-col bg-muted/20">
            <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
                <div className="container mx-auto flex h-16 items-center gap-4 px-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ChevronLeft />
                    </Button>
                    <h1 className="text-xl font-bold">My Freshoz Wallet</h1>
                </div>
            </header>

            <main className="flex-1 pb-24">
                <div className="container mx-auto px-4 py-6 sm:px-6">
                    <div className="space-y-6">
                        {/* Wallet Balance Card */}
                        <Card className="bg-primary text-primary-foreground">
                            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                                <p className="text-sm uppercase tracking-wider">Current Balance</p>
                                <p className="text-4xl font-bold">₹{walletBalance.toFixed(2)}</p>
                                <Button variant="secondary" className="mt-4" disabled>Add Money</Button>
                            </CardContent>
                        </Card>

                        {/* Transactions History */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Transactions History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {transactions.map((tx, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={cn("flex h-8 w-8 items-center justify-center rounded-full", tx.type === 'credit' ? 'bg-green-100' : 'bg-red-100')}>
                                                    {tx.type === 'credit' ? <ArrowUp className="h-5 w-5 text-green-600" /> : <ArrowDown className="h-5 w-5 text-red-600" />}
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{tx.description}</p>
                                                    <p className="text-sm text-muted-foreground">{tx.date}</p>
                                                </div>
                                            </div>
                                            <p className={cn("font-bold", tx.color)}>
                                                {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Info Section */}
                        <Card>
                            <CardContent className="p-6 text-sm text-muted-foreground space-y-2">
                                <p>Wallet can be used for Freshoz orders along with UPI or COD.</p>
                                <p>Cashback and refunds are automatically added to your wallet.</p>
                            </CardContent>
                        </Card>

                        {/* CTA Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <Button variant="outline" asChild>
                                <Link href="/coupons">View Coupons</Link>
                            </Button>
                             <Button variant="outline" disabled>
                                Withdraw to UPI
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
