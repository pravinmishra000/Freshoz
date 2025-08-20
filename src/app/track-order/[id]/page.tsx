
'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Phone, ChevronRight, Mic, MapPin, MessageSquare, ShoppingBasket, Copy, Star, ShieldCheck, PhoneCall } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { products } from '@/lib/data';

export default function TrackOrderPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id as string;
  
  const [etaMinutes, setEtaMinutes] = useState(2);
  const deliveryPartnerPhoneNumber = '9097882555';

  useEffect(() => {
    const timer = setInterval(() => {
      setEtaMinutes(prev => (prev > 0 ? prev - 1 : 0));
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getEtaMessage = () => {
    if (etaMinutes <= 0) {
      return 'Arriving now';
    }
    return `in ${etaMinutes} ${etaMinutes === 1 ? 'minute' : 'minutes'}`;
  };
  
  // Dummy data, replace with actual order data
  const order = {
    id: orderId,
    address: 'Pravin Mishra, 2nd Floor, L-146, Road Number 22, Sri Krishna Nag...',
    contact: 'Pravin, 90978XXXXX',
    items: products.slice(0, 5) // Get first 5 products as dummy items
  };

  const deliveryPartner = {
      name: 'Rakesh Kumar',
      photo: 'https://placehold.co/80x80.png',
      rating: 4.8,
      safetyStatus: 'Vaccinated & Safe'
  }

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
                <h1 className="text-2xl font-bold">Arriving <span className="text-primary">{getEtaMessage()}</span></h1>
            </div>
             <div className="w-6"></div>
          </div>
        </div>
      </header>

      <main className="flex-1 space-y-4 p-2 pb-24">
        
        <Card>
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Image src={deliveryPartner.photo} alt={deliveryPartner.name} width={64} height={64} className="rounded-full" data-ai-hint="person avatar" />
                        <div>
                            <p className="font-bold text-lg">{deliveryPartner.name}</p>
                            <p className="text-sm text-muted-foreground">is your delivery partner</p>
                            <div className="flex items-center gap-1 text-xs mt-1">
                                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" /> {deliveryPartner.rating}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                         <a href={`https://wa.me/${deliveryPartnerPhoneNumber}`} target="_blank" rel="noopener noreferrer">
                            <Button size="icon" variant="outline" className="h-10 w-10 border-green-500 text-green-500">
                                <MessageSquare className="h-5 w-5 fill-green-100" />
                            </Button>
                        </a>
                        <a href={`tel:${deliveryPartnerPhoneNumber}`}>
                            <Button size="icon" className="h-10 w-10">
                                <PhoneCall className="h-5 w-5" />
                            </Button>
                        </a>
                    </div>
                </div>
                 <Separator className="my-4"/>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                    <ShieldCheck className="h-5 w-5" />
                    <span>{deliveryPartner.safetyStatus}. Our delivery partners are trained for safe & hygienic deliveries.</span>
                </div>
            </CardContent>
        </Card>


        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
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

    