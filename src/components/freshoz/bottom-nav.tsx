
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Repeat, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import CategoryPopup from './category-popup';
import { useCart } from '@/context/cart-context';
import { Badge } from '@/components/ui/badge';

export function BottomNav() {
  const pathname = usePathname();
  const [isCategoryPopupOpen, setCategoryPopupOpen] = useState(false);
  const { cart } = useCart();
  const totalCartValue = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(0);

  const navItems = [
    { href: '/', label: 'Kilos', icon: Home },
    { href: '/orders', label: 'Buy again', icon: Repeat },
  ];

  return (
    <>
      <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-white shadow-[0_-1px_4px_rgba(0,0,0,0.1)] md:hidden">
        <div className="grid h-16 grid-cols-4 items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'inline-flex flex-col items-center justify-center text-center text-xs font-medium',
                  isActive ? 'text-blue-600' : 'text-gray-600'
                )}
              >
                <item.icon className="mb-1 h-6 w-6" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setCategoryPopupOpen(true)}
            className="inline-flex flex-col items-center justify-center text-center text-xs font-medium text-gray-600"
          >
            <LayoutGrid className="mb-1 h-6 w-6" />
            <span>Categories</span>
          </button>
           <Link
              href="/cart"
              className="relative inline-flex flex-col items-center justify-center text-center text-xs font-medium text-gray-600"
            >
              <ShoppingCart className="mb-1 h-6 w-6" />
              {cart.length > 0 && (
                <Badge variant="destructive" className="absolute -right-0 top-0 h-4 min-w-[1rem] justify-center rounded-full p-1 text-[10px]">
                  {cart.length}
                </Badge>
              )}
              <span>₹{totalCartValue}</span>
            </Link>
        </div>
      </div>
      <CategoryPopup isOpen={isCategoryPopupOpen} onOpenChange={setCategoryPopupOpen} />
    </>
  );
}
