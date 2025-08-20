
'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Phone, ChevronRight, Mic, MapPin, MessageSquare, ShoppingBasket, Copy } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { products } from '@/lib/data';

export default function TrackOrderPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id as string;
  
  const [eta, setEta] = useState('2 minutes');
  
  // Dummy data, replace with actual order data
  const order = {
    id: orderId,
    address: 'Pravin Mishra, 2nd Floor, L-146, Road Number 22, Sri Krishna Nag...',
    contact: 'Pravin, 90978XXXXX',
    items: products.slice(0, 5) // Get first 5 products as dummy items
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
       <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
        <div className="container mx-auto flex h-auto flex-col gap-2 px-4 py-3">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="-ml-4" onClick={() => router.back()}>
              <ChevronRight className="h-5 w-5 rotate-180" />
            </Button>
            <div className="flex-1 text-center">
                <p className="text-sm text-muted-foreground">Order is on the way</p>
                <h1 className="text-2xl font-bold">Arriving in <span className="text-primary">{eta}</span></h1>
            </div>
             <div className="w-6"></div>
          </div>
        </div>
      </header>

      <main className="flex-1 space-y-4 p-2 pb-24">
        <Alert variant="destructive" className="border-orange-200 bg-orange-50 text-orange-600">
            <AlertTitle className="font-bold text-orange-800">Your order is running late</AlertTitle>
        </Alert>

        <Card>
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Mic className="h-6 w-6 text-primary"/>
                        <div>
                            <p className="font-bold">Instructions</p>
                            <p className="text-sm text-muted-foreground">Help your delivery partner reach you faster</p>
                        </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                    <Image src="https://placehold.co/40x40.png" width={40} height={40} alt="Delivery scooter" data-ai-hint="delivery scooter" />
                    Your delivery details
                </CardTitle>
                <p className="text-sm text-muted-foreground pt-1">Details of your current order</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <Separator/>
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                        <MapPin className="h-6 w-6 text-muted-foreground mt-1"/>
                        <div>
                            <p className="font-bold">Delivery at Home</p>
                            <p className="text-sm text-muted-foreground">{order.address}</p>
                            <Button variant="link" className="p-0 h-auto text-primary font-bold">Change address</Button>
                        </div>
                    </div>
                </div>

                <Alert className="border-amber-200 bg-amber-50">
                    <AlertDescription className="flex items-center justify-between text-amber-800">
                        <span>Now update your address effortlessly if you've ordered a...</span>
                        <Button variant="ghost" className="text-amber-800 font-bold">OK</Button>
                    </AlertDescription>
                </Alert>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Phone className="h-6 w-6 text-muted-foreground"/>
                         <div>
                            <p className="text-sm">{order.contact}</p>
                            <Button variant="link" className="p-0 h-auto text-primary font-bold">Update receiver's contact</Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardContent className="p-4">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <MessageSquare className="h-6 w-6 text-primary"/>
                        <div>
                            <p className="font-bold">Need help?</p>
                            <p className="text-sm text-muted-foreground">Chat with us about any issue related to your order</p>
                        </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
            </CardContent>
        </Card>
        
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                    <ShoppingBasket className="h-6 w-6 text-primary"/>
                    Order summary
                </CardTitle>
                 <div className="flex items-center gap-2 pt-1">
                    <p className="text-sm text-muted-foreground">Order id - #{order.id}</p>
                    <Copy className="h-4 w-4 text-muted-foreground cursor-pointer"/>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-4 overflow-x-auto pb-2">
                    {order.items.map(item => (
                        <div key={item.id} className="w-20 flex-shrink-0">
                            <Image src={item.image || 'https://placehold.co/100x100.png'} alt={item.name_en} width={100} height={100} className="rounded-md border object-cover aspect-square" data-ai-hint="product image"/>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

      </main>
    </div>
  );
}
