
'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { getDatabase, ref, onValue } from 'firebase/database';
import { firebaseApp } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Phone, MessageSquare, CheckCircle, Package, Bike, ChevronRight, Info, ShieldCheck, MessageCircleQuestion } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/freshoz/header';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

const containerStyle = {
  width: '100%',
  height: '100%'
};

// Replace with your user's location (can be fetched from browser or stored profile)
const userLocation = { lat: 25.26, lng: 86.78 }; // Sultanganj approximate location

export default function TrackOrderPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id as string;
  
  const [deliveryBoyLocation, setDeliveryBoyLocation] = useState(null);
  const [eta, setEta] = useState('4 minutes');
  const [orderStatus, setOrderStatus] = useState<'Order Confirmed' | 'Out for Delivery' | 'Delivered'>('Out for Delivery');
  const [tipAmount, setTipAmount] = useState(0);


  useEffect(() => {
    if (!orderId) return;

    const db = getDatabase(firebaseApp);
    const deliveryBoyRef = ref(db, `delivery_locations/${orderId}`);

    const unsubscribe = onValue(deliveryBoyRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDeliveryBoyLocation({ lat: data.latitude, lng: data.longitude });
      }
    });

    // Dummy data for delivery boy - in a real app, this would come from your backend
    // For demonstration, we'll set a starting location for the delivery boy
    if (!deliveryBoyLocation) {
        setDeliveryBoyLocation({ lat: 25.27, lng: 86.79 });
    }

    return () => unsubscribe();
  }, [orderId]);


  const deliveryBoy = {
    name: 'Kundan',
    phone: '9876543210',
  };

  const statusSteps = [
    { name: 'Order Confirmed', icon: CheckCircle },
    { name: 'Out for Delivery', icon: Bike },
    { name: 'Delivered', icon: Package },
  ];

  const currentStatusIndex = statusSteps.findIndex(s => s.name === orderStatus);
  
  const handleTipSelect = (amount: number) => {
    setTipAmount(prev => prev === amount ? 0 : amount);
  }

  return (
    <div className="flex h-screen flex-col bg-muted/20">
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

      <main className="relative flex-1 bg-gray-200">
        <div style={containerStyle} className="relative">
          <Image
            src="https://placehold.co/800x600.png"
            alt="Map placeholder"
            layout="fill"
            objectFit="cover"
            data-ai-hint="map location"
          />
           <div className="absolute inset-0 flex items-center justify-center">
                <p className="rounded-md bg-background/80 p-4 font-semibold text-foreground">
                    Live map will be enabled soon.
                </p>
            </div>
        </div>
      </main>
      
      <footer className="w-full bg-background p-4 rounded-t-2xl shadow-[0_-4px_12px_rgba(0,0,0,0.1)] space-y-4 overflow-y-auto">
            {/* Delivery boy info */}
             <Card className="shadow-none border-0">
                 <CardContent className="p-0 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14 border-2 border-primary bg-yellow-100">
                             <span className="text-3xl">🧑‍🚀</span>
                        </Avatar>
                        <div>
                            <p className="font-bold text-lg">I'm {deliveryBoy.name}, your</p>
                            <p className="font-bold text-lg">delivery partner</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button asChild size="icon" className="h-10 w-10 bg-green-100 text-green-600 hover:bg-green-200">
                             <a href={`tel:${deliveryBoy.phone}`}>
                                <Phone className="h-5 w-5" />
                            </a>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Alert variant="destructive" className="bg-orange-100 border-orange-200 text-orange-800">
                <p className="font-semibold">We're sorry, it's taking us longer than planned to deliver your order</p>
            </Alert>
            
            {/* Tip your delivery partner */}
             <Card>
                <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                        <div>
                             <h3 className="font-bold">Delivering happiness at your doorstep!</h3>
                             <p className="text-sm text-muted-foreground">Thank them by leaving a tip</p>
                        </div>
                        <Image src="https://placehold.co/100x70.png" width={100} height={70} alt="Delivery partner" data-ai-hint="delivery person celebration" />
                    </div>
                     <div className="flex flex-wrap gap-2 mt-4">
                        {[
                            { amount: 20, emoji: '😊' },
                            { amount: 30, emoji: '😄' },
                            { amount: 50, emoji: '🥰' }
                        ].map(tip => (
                            <Button 
                                key={tip.amount} 
                                variant={tipAmount === tip.amount ? "default" : "outline"} 
                                onClick={() => handleTipSelect(tip.amount)}
                                className={cn("rounded-full", tipAmount === tip.amount && "bg-primary hover:bg-primary/90")}
                            >
                                {tip.emoji} ₹{tip.amount}
                            </Button>
                        ))}
                         <Button 
                            variant={tipAmount > 50 || (tipAmount > 0 && ![20,30,50].includes(tipAmount)) ? "default" : "outline"} 
                            onClick={() => handleTipSelect(100)} // Dummy value for 'Other'
                            className="rounded-full"
                         >
                            <span role="img" aria-label="gift">🎁</span> Other
                        </Button>
                    </div>
                </CardContent>
            </Card>

             <Card className="shadow-none border-0">
                <CardContent className="p-0 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="h-6 w-6 text-green-600"/>
                        <div>
                            <p className="font-semibold">Your store is 1 km away.</p>
                            <p className="text-sm text-blue-600 font-semibold">Learn about delivery partner safety</p>
                        </div>
                    </div>
                     <ChevronRight className="h-5 w-5 text-muted-foreground"/>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <MessageCircleQuestion className="h-6 w-6 text-primary"/>
                        Add delivery instructions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Input placeholder="e.g. Please ring the bell twice" />
                </CardContent>
            </Card>
      </footer>
    </div>
  );
}
