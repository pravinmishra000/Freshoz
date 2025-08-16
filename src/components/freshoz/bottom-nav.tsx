
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Repeat, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import CategoryPopup from './category-popup';
import { useCart } from '@/context/cart-context';
import { Badge } from '@/components/ui/badge';

export function BottomNav() {
  const pathname = usePathname();
  const [isCategoryPopupOpen, setCategoryPopupOpen] = useState(false);
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/orders', label: 'My Orders', icon: Repeat },
  ];

  return (
    <>
      <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background shadow-[0_-1px_4px_rgba(0,0,0,0.05)] md:hidden">
        <div className="grid h-16 grid-cols-5 items-center">
          <Link
            href="/"
            className={cn(
              'inline-flex flex-col items-center justify-center gap-1 text-center text-xs font-medium',
              pathname === '/' ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <Home className="h-6 w-6" />
            <span>Home</span>
          </Link>
           <button
            onClick={() => setCategoryPopupOpen(true)}
            className={cn(
                'inline-flex flex-col items-center justify-center gap-1 text-center text-xs font-medium',
                 pathname.startsWith('/category') ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <LayoutGrid className="h-6 w-6" />
            <span>Categories</span>
          </button>
          <Link
            href="/orders"
            className={cn(
              'inline-flex flex-col items-center justify-center gap-1 text-center text-xs font-medium',
              pathname === '/orders' ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <Repeat className="h-6 w-6" />
            <span>Orders</span>
          </Link>
           <Link
              href="/cart"
               className={cn(
                  'relative inline-flex flex-col items-center justify-center gap-1 text-center text-xs font-medium',
                  pathname === '/cart' ? 'text-primary' : 'text-muted-foreground'
                )}
            >
              <ShoppingCart className="h-6 w-6" />
               {totalItems > 0 && (
                <Badge variant="destructive" className="absolute right-0 top-0 h-5 min-w-[1.25rem] justify-center rounded-full p-1 text-[10px]">
                  {totalItems}
                </Badge>
              )}
              <span>Cart</span>
            </Link>
            <Link
              href="#"
               className={cn(
                  'inline-flex flex-col items-center justify-center gap-1 text-center text-xs font-medium',
                  pathname === '/profile' ? 'text-primary' : 'text-muted-foreground'
                )}
            >
              <User className="h-6 w-6" />
              <span>Profile</span>
            </Link>
        </div>
      </div>
      <CategoryPopup isOpen={isCategoryPopupOpen} onOpenChange={setCategoryPopupOpen} />
    </>
  );
}
