
'use client';

import { useEffect, useState, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';
import { getDatabase, ref, onValue } from 'firebase/database';
import { firebaseApp } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Phone, MessageSquare, CheckCircle, Package, Bike } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/freshoz/header';

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
  const [eta, setEta] = useState('15 mins');
  const [orderStatus, setOrderStatus] = useState<'Order Confirmed' | 'Out for Delivery' | 'Delivered'>('Out for Delivery');

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

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

  const mapCenter = useMemo(() => {
    return deliveryBoyLocation || userLocation;
  }, [deliveryBoyLocation]);
  
  const path = useMemo(() => {
      if (deliveryBoyLocation) {
          return [userLocation, deliveryBoyLocation];
      }
      return [];
  }, [deliveryBoyLocation]);

  const deliveryBoy = {
    name: 'Raju Kumar',
    phone: '9876543210',
  };

  const statusSteps = [
    { name: 'Order Confirmed', icon: CheckCircle },
    { name: 'Out for Delivery', icon: Bike },
    { name: 'Delivered', icon: Package },
  ];

  const currentStatusIndex = statusSteps.findIndex(s => s.name === orderStatus);


  if (loadError) {
    return <div>Error loading maps. Please ensure you have enabled the Maps JavaScript API and your API key is correctly configured in your Google Cloud project.</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen flex-col">
       <Header />
      <main className="relative flex-1">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={14}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
          }}
        >
          <Marker position={userLocation} label={{ text: 'You', color: 'white' }} />
          {deliveryBoyLocation && (
             <Marker 
                position={deliveryBoyLocation} 
                icon={{
                    path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    scale: 7,
                    fillColor: "#4285F4",
                    fillOpacity: 1,
                    strokeWeight: 2,
                    strokeColor: "#ffffff",
                    rotation: 0, // In a real app, calculate bearing between points
                }}
             />
          )}
          {path.length > 0 && <Polyline path={path} options={{ strokeColor: '#4285F4' }} />}
        </GoogleMap>
      </main>
      
      <footer className="fixed bottom-0 left-0 right-0 z-10 w-full bg-background p-4 rounded-t-2xl shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
        <div className="space-y-4">
             {/* Status bar */}
            <div className="w-full">
                <div className="flex justify-between items-end relative">
                   {statusSteps.map((step, index) => (
                    <div key={step.name} className="z-10 flex flex-col items-center text-center">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${index <= currentStatusIndex ? 'bg-primary border-primary text-white' : 'bg-muted border-gray-300'}`}>
                           <step.icon className="h-6 w-6" />
                        </div>
                        <p className={`mt-1 text-xs font-semibold ${index <= currentStatusIndex ? 'text-primary' : 'text-muted-foreground'}`}>{step.name}</p>
                    </div>
                   ))}
                    <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
                        <div 
                            className="absolute top-0 left-0 h-full bg-primary transition-all duration-500"
                            style={{ width: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            <Separator />
            
            {/* Delivery boy info */}
            <Card>
                 <CardContent className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14 border-2 border-primary">
                            <AvatarImage src="https://placehold.co/100x100.png" alt={deliveryBoy.name} data-ai-hint="delivery person portrait" />
                            <AvatarFallback>{deliveryBoy.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold text-lg">{deliveryBoy.name}</p>
                            <p className="text-sm text-muted-foreground">Arriving in <span className="font-bold text-primary">{eta}</span></p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button asChild size="icon" className="h-10 w-10 bg-green-500 hover:bg-green-600">
                            <a href={`https://wa.me/${deliveryBoy.phone}`} target="_blank" rel="noopener noreferrer">
                                <MessageSquare className="h-5 w-5" />
                            </a>
                        </Button>
                        <Button asChild size="icon" className="h-10 w-10">
                             <a href={`tel:${deliveryBoy.phone}`}>
                                <Phone className="h-5 w-5" />
                            </a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </footer>
    </div>
  );
}
