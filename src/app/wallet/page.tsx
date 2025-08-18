
'use client';

import * as React from 'react';
import { Wallet, ChevronLeft, ArrowDown, ArrowUp, Settings, Smartphone, ShieldCheck, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { BottomNav } from '@/components/freshoz/bottom-nav';

export default function WalletPage() {
    const router = useRouter();

    const features = [
        {
            icon: Smartphone,
            title: "Single tap payments",
            description: "Enjoy seamless payments without the wait for OTPs",
        },
        {
            icon: ShieldCheck,
            title: "Zero failures",
            description: "Zero payment failures ensure you never miss an order",
        },
        {
            icon: RefreshCw,
            title: "Real-time refunds",
            description: "No need to wait for refunds. Freshoz Money refunds are instant!",
        }
    ]
    
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-b from-yellow-300/80 to-yellow-50 text-slate-800">
            <header className="sticky top-0 z-40 w-full bg-transparent text-slate-800">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ChevronLeft />
                    </Button>
                     <Button variant="ghost" size="icon">
                        <Settings />
                    </Button>
                </div>
            </header>

            <main className="flex-1 flex flex-col px-4 text-center">
                <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="relative mb-4">
                        <Wallet className="h-24 w-24 text-green-600 drop-shadow-lg" />
                    </div>
                    <p className="font-bold text-green-700">Freshoz</p>
                    <h1 className="text-5xl font-extrabold tracking-tight">MONEY</h1>
                </div>

                <div className="space-y-4 mb-6">
                   {features.map((feature, index) => (
                     <Card key={index} className="text-left bg-white/70 backdrop-blur-sm border-none shadow-sm">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <feature.icon className="h-8 w-8 text-yellow-600" />
                            </div>
                            <div>
                                <h3 className="font-bold">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                   ))}
                </div>
                
                 <div className="py-4">
                    <Button className="w-full h-14 bg-green-600 hover:bg-green-700 text-lg rounded-xl shadow-lg">
                        Add Money
                    </Button>
                </div>

                 <p className="text-center text-muted-foreground/50 pb-8">
                    Enjoy seamless one tap payments
                </p>

            </main>
        </div>
    );
}
