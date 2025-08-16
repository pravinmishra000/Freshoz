
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Header } from '@/components/freshoz/header';
import { products } from '@/lib/data';
import { ProductCard } from '@/components/freshoz/product-card';
import LocationGate from '@/components/freshoz/location-gate';
import FreshozBuddy from '@/components/freshoz/freshoz-buddy';
import SplashScreen from '@/components/freshoz/splash-screen';
import { BottomNav } from '@/components/freshoz/bottom-nav';
import { Footer } from '@/components/freshoz/footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [loading, setLoading] = useState(false);

  // Re-enable splash screen if needed
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2500);
  //   return () => clearTimeout(timer);
  // }, []);

  if (loading) {
    return <SplashScreen />;
  }

  const buyAgainProducts = products.slice(0, 5);

  return (
    <div className="flex min-h-screen flex-col bg-secondary">
      <Header />
      <main className="flex-1 bg-white pb-20">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          
          {/* Offer Banner Section */}
          <section className="mb-4">
            <Link href="#">
              <Image
                src="https://placehold.co/1200x200.png"
                alt="Freedom Sale Banner"
                width={1200}
                height={200}
                className="w-full rounded-lg"
                data-ai-hint="sale offer banner"
              />
            </Link>
          </section>

          {/* Buy Again Section */}
          <section className="mb-4">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="text-xl font-bold">Buy Again</h2>
                    <p className="text-sm text-muted-foreground">Based On Your Past Purchases</p>
                </div>
                <Button variant="ghost" size="icon">
                    <ArrowRight className="h-6 w-6"/>
                </Button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {buyAgainProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
          
           {/* Click here to view all offers */}
           <section className="mb-4">
                <div className="rounded-lg bg-purple-700 p-3 text-center text-white font-semibold">
                    <Link href="#">Click Here To View All Offers &rarr;</Link>
                </div>
           </section>
           
           {/* Add items worth... */}
           <section className="mb-4">
             <div className="relative rounded-lg bg-yellow-400 p-3 font-semibold">
                <p>Add items worth ₹556 more to get ₹150...</p>
                <div className="absolute top-1/2 right-2 -translate-y-1/2 text-lg font-bold">^</div>
             </div>
           </section>

        </div>
      </main>
      <Footer />
      <BottomNav />
      {/* <LocationGate /> */}
      {/* <FreshozBuddy /> */}
    </div>
  );
}
