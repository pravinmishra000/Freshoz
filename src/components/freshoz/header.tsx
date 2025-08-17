
'use client';

import { Search, ShoppingCart, User, Mic, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '../ui/badge';
import { useCart } from '@/context/cart-context';
import { FreshozLogo } from './freshoz-logo';

export function Header() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // This header is being phased out in favor of the integrated header on the homepage.
  // We keep it for other pages that might still use it.
  // A better long-term solution would be a more robust layout system.

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex-1">
            <FreshozLogo />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-foreground" asChild>
            <Link href="#">
              <User />
              <span className="sr-only">Profile</span>
            </Link>
          </Button>
          <div className="relative">
            <Button variant="ghost" size="icon" className="text-foreground" asChild>
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
    </header>
  );
}

    