
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Header } from '@/components/freshoz/header';
import { products, categories } from '@/lib/data';
import { ProductCard } from '@/components/freshoz/product-card';
import LocationGate from '@/components/freshoz/location-gate';
import FreshozBuddy from '@/components/freshoz/freshoz-buddy';
import SplashScreen from '@/components/freshoz/splash-screen';
import { BottomNav } from '@/components/freshoz/bottom-nav';
import { Footer } from '@/components/freshoz/footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CategoryCard } from '@/components/freshoz/category-card';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  const featuredProducts = products.slice(0, 8);
  const topCategories = categories.slice(1, 5);

  return (
    <div className="flex min-h-screen flex-col bg-secondary/40">
      <Header />
      <main className="flex-1 bg-white pb-20">
        <LocationGate />
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          
          <section className="mb-8">
            <Link href="#">
              <Image
                src="https://placehold.co/1200x300"
                alt="Special Offer"
                width={1200}
                height={300}
                className="w-full rounded-lg object-cover"
                data-ai-hint="grocery offer banner"
              />
            </Link>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between pb-4">
              <h2 className="font-headline text-2xl font-bold">Shop by Category</h2>
              <Button variant="ghost" asChild>
                <Link href="/category/all">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {topCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between pb-4">
              <h2 className="font-headline text-2xl font-bold">Featured Products</h2>
               <Button variant="ghost" asChild>
                <Link href="/category/all">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <BottomNav />
      <FreshozBuddy />
    </div>
  );
}
