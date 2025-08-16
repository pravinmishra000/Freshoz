
'use client';

import { Search, ShoppingCart, User, Home, ChevronRight, Briefcase, Plane, Milk, Mic } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '../ui/badge';
import { useCart } from '@/context/cart-context';

export function Header() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const quickLinks = [
    { name: 'Flipkart', icon: Briefcase, href: '#' },
    { name: 'Loans', icon: User, href: '#' },
    { name: 'Travel', icon: Plane, href: '#' },
    { name: 'Grocery', icon: Milk, href: '/', active: true },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-secondary">
      {/* Quick Links Section */}
      <div className="container mx-auto flex items-center justify-around px-4 py-2 sm:px-6 lg:px-8">
        {quickLinks.map((link) => (
          <Link href={link.href} key={link.name}>
            <div
              className={`flex flex-col items-center gap-1 rounded-lg p-2 text-center ${
                link.active ? 'bg-primary text-primary-foreground' : 'bg-white'
              }`}
            >
              <link.icon className={`h-6 w-6 ${link.active ? 'text-white' : 'text-blue-600'}`} />
              <span className={`text-xs font-medium ${link.active ? 'text-white' : 'text-black'}`}>{link.name}</span>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Address and Delivery Slot */}
      <div className="container mx-auto my-2 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between rounded-lg bg-primary/20 p-2 text-sm">
            <div className="flex items-center gap-2">
                <Home className="h-5 w-5 text-primary" />
                <span className="font-semibold">HOME L-146, Ladali Bh...</span>
                <ChevronRight className="h-5 w-5" />
            </div>
            <div className="rounded-lg bg-primary p-2 text-primary-foreground text-center text-xs">
                <div>5 Aug</div>
                <div>8 AM - 8 PM</div>
            </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-4 pb-2 sm:px-6 lg:px-8">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search grocery products"
              className="w-full rounded-md border-2 border-primary/30 bg-white pl-10 pr-10"
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
