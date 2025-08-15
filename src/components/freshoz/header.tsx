
'use client';

import { Search, ShoppingCart, User, Phone, MessageSquare } from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full border-b bg-primary/95 text-primary-foreground backdrop-blur supports-[backdrop-filter]:bg-primary/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="hidden md:flex">
          <FreshozLogo />
        </div>

        <div className="flex flex-1 items-center justify-center px-4 md:px-8">
          <div className="w-full max-w-lg">
            <form>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for groceries..."
                  className="w-full rounded-full bg-background/80 pl-10 text-foreground"
                />
              </div>
            </form>
          </div>
        </div>

        <div className="flex items-center gap-2">
           <a href={`tel:${storePhoneNumber}`} className="hidden sm:inline-flex">
            <Button variant="ghost" className="hover:bg-primary-foreground/20">
              <Phone className="mr-2 h-4 w-4" />
              Call Us
            </Button>
          </a>
          <a href={`https://wa.me/${storePhoneNumber}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex">
            <Button variant="ghost" className="hover:bg-primary-foreground/20">
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat
            </Button>
          </a>
          <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/20">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative hover:bg-primary-foreground/20">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge variant="destructive" className="absolute -right-1 -top-1 h-4 w-4 justify-center rounded-full p-0">
                  {totalItems}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
