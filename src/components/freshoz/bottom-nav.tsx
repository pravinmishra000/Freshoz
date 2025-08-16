
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import CategoryPopup from './category-popup';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/orders', label: 'Orders', icon: List },
];

export function BottomNav() {
  const pathname = usePathname();
  const [isCategoryPopupOpen, setCategoryPopupOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden">
        <div className="grid h-16 grid-cols-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'inline-flex flex-col items-center justify-center px-5 hover:bg-primary-foreground/20',
                  isActive ? 'text-accent' : 'text-primary-foreground'
                )}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
           <button
              onClick={() => setCategoryPopupOpen(true)}
              className={cn(
                'inline-flex flex-col items-center justify-center px-5 hover:bg-primary-foreground/20',
                 pathname.startsWith('/category') ? 'text-accent' : 'text-primary-foreground'
              )}
            >
              <LayoutGrid className="h-6 w-6" />
              <span className="text-xs font-medium">Categories</span>
            </button>
        </div>
      </div>
      <CategoryPopup isOpen={isCategoryPopupOpen} onOpenChange={setCategoryPopupOpen} />
    </>
  );
}
