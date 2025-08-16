
'use client';

import { Search, ShoppingCart, User, Phone, MessageSquare, Mic } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FreshozLogo } from './freshoz-logo';
import { Badge } from '../ui/badge';
import { useCart } from '@/context/cart-context';

export function Header() {
  const storePhoneNumber = '9097882555';
  const whatsappMessage = encodeURIComponent("Hello Freshoz! I have a query.");
  const { cart } = useCart();
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex-shrink-0">
          <FreshozLogo />
        </div>

        <div className="hidden flex-1 items-center justify-center px-4 md:flex">
          <div className="w-full max-w-2xl mx-auto">
            <form>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-foreground" />
                <Input
                  type="search"
                  placeholder="Search for groceries..."
                  className="w-full rounded-full border-2 border-primary-foreground/50 bg-primary/80 pl-10 pr-10 text-primary-foreground placeholder:text-primary-foreground/70"
                />
                <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full text-primary-foreground hover:bg-primary">
                    <Mic className="h-5 w-5" />
                    <span className="sr-only">Search by voice</span>
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative text-primary-foreground hover:text-white">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <Badge variant="destructive" className="absolute -right-1 -top-1 h-5 w-5 justify-center rounded-full p-0 text-xs">
                  {totalItems}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-white">
            <User className="h-6 w-6" />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
