
'use client';

import { Search, ShoppingCart, User, Home, ChevronRight, Briefcase, Plane, Milk, Mic, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '../ui/badge';
import { useCart } from '@/context/cart-context';
import { FreshozLogo } from './freshoz-logo';

export function Header() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const storePhoneNumber = '9097882555';

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <FreshozLogo />
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
             <MapPin className="h-5 w-5 text-primary" />
             <div>
                <p className="font-bold">Deliver to</p>
                <p className="text-muted-foreground">Sultanganj, 813213</p>
             </div>
          </div>
        </div>
        
        <div className="hidden lg:flex w-full max-w-md items-center">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="w-full rounded-full border-2 border-primary/30 bg-secondary/50 pl-10 pr-4"
              />
          </div>
        </div>

        <div className="flex items-center gap-4">
           <Button variant="ghost" size="icon" className="hidden lg:inline-flex" asChild>
             <a href={`tel:${storePhoneNumber}`}>
              <Phone />
              <span className="sr-only">Call us</span>
             </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#">
              <User />
              <span className="sr-only">Profile</span>
            </Link>
          </Button>
          <div className="relative">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart">
                <ShoppingCart />
                <span className="sr-only">Cart</span>
              </Link>
            </Button>
            {totalItems > 0 && (
              <Badge variant="destructive" className="absolute -right-2 -top-2 h-6 w-6 justify-center rounded-full p-1 text-xs">
                {totalItems}
              </Badge>
            )}
          </div>
        </div>
      </div>
       <div className="container mx-auto px-4 pb-3 lg:hidden">
         <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for products..."
              className="w-full rounded-full border-2 border-primary/30 bg-secondary/50 pl-10 pr-10"
            />
             <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full text-muted-foreground hover:bg-gray-200">
                <Mic className="h-5 w-5" />
                <span className="sr-only">Search by voice</span>
            </Button>
        </div>
      </div>
    </header>
  );
}
