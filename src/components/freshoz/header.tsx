
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FreshozLogo } from './freshoz-logo';
import { User, Wallet, Phone, MessageSquare } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <FreshozLogo />
        <div className="flex items-center gap-2">
            <a href="tel:9097882555">
                <Button variant="ghost" size="icon"><Phone /></Button>
            </a>
            <a href="https://wa.me/9097882555" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon"><MessageSquare /></Button>
            </a>
            <Button asChild variant="ghost" size="icon"><Link href="/wallet"><Wallet /></Link></Button>
            <Button asChild variant="ghost" size="icon"><Link href="/profile"><User /></Link></Button>
        </div>
      </div>
    </header>
  );
}
