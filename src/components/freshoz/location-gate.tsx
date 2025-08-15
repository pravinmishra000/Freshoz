'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { MapPin } from 'lucide-react';

const SUPPORTED_PINS = ['813213'];
const LOCAL_STORAGE_KEY = 'freshoz_pincode_verified';

export default function LocationGate() {
  const [isOpen, setIsOpen] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const isVerified = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!isVerified) {
      setIsOpen(true);
    }
  }, []);

  const handleCheckPin = () => {
    if (SUPPORTED_PINS.includes(pinCode)) {
      localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
      setIsOpen(false);
      toast({
        title: 'Location confirmed!',
        description: 'Welcome to Freshoz. We deliver in your area.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Service Unavailable',
        description: "Sorry, we don't deliver to your PIN code yet.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="text-primary"/>
            Where should we deliver?
          </DialogTitle>
          <DialogDescription>
            Enter your PIN code to check if we serve your area.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="pincode"
            placeholder="Enter your 6-digit PIN code"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            maxLength={6}
            className="text-center text-lg tracking-widest"
          />
        </div>
        <Button type="submit" onClick={handleCheckPin} className="w-full">
          Continue
        </Button>
        <p className="text-center text-sm text-muted-foreground">Currently serving: {SUPPORTED_PINS.join(', ')}</p>
      </DialogContent>
    </Dialog>
  );
}
