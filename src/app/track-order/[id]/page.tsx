
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Phone, ChevronRight, MapPin, MessageSquare, ShoppingBasket, Copy, Star, ShieldCheck, PhoneCall, Package, Info, Check } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { CartItem } from '@/context/cart-context';

interface Order {
    items: CartItem[];
    total: number;
    orderId: string;
    orderDate: string;
    status?: 'Pending' | 'Shipped' | 'Delivered' | 'Out for Delivery';
}

const statusSteps = ['Order Confirmed', 'Out for Delivery', 'Delivered'];

export default function TrackOrderPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id as string;
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [etaMinutes, setEtaMinutes] = useState(15); // Start with a more realistic ETA
  const [currentStatusIndex, setCurrentStatusIndex] = useState(1); // 'Out for Delivery'

  const deliveryPartnerPhoneNumber = '9097882555';

  useEffect(() => {
    if (orderId) {
      const savedOrders = localStorage.getItem('freshoz_orders');
      if (savedOrders) {
        const orders: Order[] = JSON.parse(savedOrders);
        const currentOrder = orders.find(o => o.orderId === orderId);
        setOrder(currentOrder || null);
      }
    }
    setLoading(false);
  }, [orderId]);

  useEffect(() => {
    // Simulate ETA countdown
    const timer = setInterval(() => {
      setEtaMinutes(prev => (prev > 1 ? prev - 1 : 0));
    }, 60000); // Update every minute

    // Simulate order progress
    const statusTimer = setTimeout(() => {
        if(etaMinutes <= 0) {
            setCurrentStatusIndex(2); // 'Delivered'
        }
    }, etaMinutes * 60000);


    return () => {
        clearInterval(timer)
        clearTimeout(statusTimer);
    };
  }, [etaMinutes]);

  const getEtaMessage = () => {
    if (currentStatusIndex === 2) {
        return 'Delivered';
    }
    if (etaMinutes <= 0) {
      return 'Arriving now';
    }
    return `in ${etaMinutes} min`;
  };
  
  const deliveryPartner = {
      name: 'Rakesh Kumar',
      photo: 'https://placehold.co/80x80.png',
      rating: 4.8,
      safetyStatus: 'Vaccinated & Safe'
  }

  if (loading) {
      return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }
  
  if (!order) {
      return (
        <div className="flex items-center justify-center min-h-screen text-center p-4">
            <div>
                <Package className="h-20 w-20 mx-auto text-destructive"/>
                <h1 className="text-2xl font-bold mt-4">Order Not Found</h1>
                <p className="text-muted-foreground">We couldn't find an order with the ID: {orderId}</p>
                 <Button onClick={() => router.push('/orders')} className="mt-6">Back to My Orders</Button>
            </div>
        </div>
      )
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
       <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
        <div className="container mx-auto flex h-auto flex-col gap-2 px-4 py-3">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="-ml-4" onClick={() => router.push('/orders')}>
              <ChevronRight className="h-5 w-5 rotate-180" />
            </Button>
            <div className="flex-1 text-center">
                <p className="text-sm text-muted-foreground">{currentStatusIndex === 2 ? "Order has been" : "Order is on the way"}</p>
                <h1 className="text-2xl font-bold"> <span className="text-primary">{getEtaMessage()}</span></h1>
            </div>
             <div className="w-10"></div>
          </div>
        </div>
      </header>

      <main className="flex-1 space-y-4 p-2 pb-40">
        
        {/* Status Bar */}
        <Card>
            <CardContent className="p-4">
                <div className="flex justify-between items-end relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2">
                         <div className="h-full bg-green-500 transition-all duration-500" style={{width: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%`}}></div>
                    </div>
                    {statusSteps.map((status, index) => (
                        <div key={status} className="relative flex flex-col items-center z-10 w-1/3">
                            <div className={`h-6 w-6 rounded-full flex items-center justify-center transition-colors duration-500 ${index <= currentStatusIndex ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                                {index <= currentStatusIndex && <Check className="h-4 w-4"/>}
                            </div>
                            <p className={`mt-2 text-xs text-center font-semibold transition-colors duration-500 ${index <= currentStatusIndex ? 'text-green-600' : 'text-muted-foreground'}`}>{status}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>


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
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                        <MapPin className="h-6 w-6 text-muted-foreground mt-1"/>
                        <div>
                            <p className="font-bold">Delivery at Home</p>
                            <p className="text-sm text-muted-foreground">Pravin Mishra, L-146, Sultanganj...</p>
                            <Button variant="link" className="p-0 h-auto text-primary font-bold">Change address</Button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Phone className="h-6 w-6 text-muted-foreground"/>
                         <div>
                            <p className="text-sm">Pravin, 90978XXXXX</p>
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
                <CardTitle className="flex items-center justify-between text-lg">
                    <div className="flex items-center gap-3">
                        <ShoppingBasket className="h-6 w-6 text-primary"/>
                        Order Summary
                    </div>
                    <span className="font-bold">₹{order.total.toFixed(2)}</span>
                </CardTitle>
                 <div className="flex items-center gap-2 pt-1">
                    <p className="text-sm text-muted-foreground">Order ID: {order.id}</p>
                    <Copy className="h-4 w-4 text-muted-foreground cursor-pointer" onClick={() => navigator.clipboard.writeText(order.id)}/>
                </div>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {order.items.map(item => (
                        <li key={item.id} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-12 h-12 relative border rounded-md">
                                    <Image src={item.image || 'https://placehold.co/100x100.png'} alt={item.name_en} layout="fill" objectFit="contain" className="p-1" data-ai-hint="product image"/>
                                </div>
                                <span>{item.name_en} x {item.quantity}</span>
                            </div>
                             <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <Separator className="my-4"/>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <p>Total Item Price</p>
                        <p>₹{order.total.toFixed(2)}</p>
                    </div>
                     <div className="flex justify-between">
                        <p>Delivery Fee</p>
                        <p className="text-green-600">FREE</p>
                    </div>
                    <div className="flex justify-between font-bold">
                        <p>To Pay</p>
                        <p>₹{order.total.toFixed(2)}</p>
                    </div>
                </div>
                <Alert variant="default" className="mt-4 bg-blue-50 border-blue-200">
                    <Info className="text-blue-600"/>
                    <AlertDescription className="text-blue-800">
                        Payment: Cash on Delivery
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>

      </main>

       {/* Bottom Floating Bar */}
       <div className="fixed bottom-0 left-0 z-50 w-full p-2 bg-background/80 backdrop-blur-sm border-t md:hidden">
          <Button className="w-full h-12 text-lg">
                View My Orders
            </Button>
      </div>
    </div>
  );
}
