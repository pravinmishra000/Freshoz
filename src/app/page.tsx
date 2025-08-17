
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { products, categories } from '@/lib/data';
import type { Product, Category } from '@/lib/types';
import { ProductCard } from '@/components/freshoz/product-card';
import LocationGate from '@/components/freshoz/location-gate';
import FreshozBuddy from '@/components/freshoz/freshoz-buddy';
import SplashScreen from '@/components/freshoz/splash-screen';
import { BottomNav } from '@/components/freshoz/bottom-nav';
import { Footer } from '@/components/freshoz/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/cart-context';
import { Search, ShoppingCart, ArrowRight, RefreshCw, Zap, Carrot, Milk, Soup, Fish, Grip } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  const mainCategories = categories.filter(c => ['1', '3', '9', '4'].includes(c.id));
  const lastOrderItems = products.slice(0, 4); // Dummy data for last order

  const getProductsForCategory = (categoryId: string) => {
    return products.filter(p => p.category_id === categoryId).slice(0, 6);
  };
  
  const getSubCategories = (categoryId: string) => {
      const category = categories.find(c => c.id === categoryId);
      return category?.subCategories || [];
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 shadow-sm backdrop-blur-sm">
        <div className="container mx-auto flex items-center gap-4 px-4 py-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for atta, dal, milk..."
              className="w-full rounded-full border-2 border-primary/30 bg-secondary/50 pl-10 pr-4"
            />
          </div>
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
      </header>

      <main className="flex-1 bg-muted/20 pb-20">
        <LocationGate />
        
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="mb-4">
                <h1 className="text-xl font-bold">Good Morning, Pravin 👋</h1>
                <p className="text-sm text-muted-foreground">Order Fresh Today!</p>
            </div>
            
            <Card className="mb-6 bg-primary/10 border-primary/20">
                <CardContent className="p-4 flex justify-between items-center">
                    <div>
                        <h2 className="font-bold text-primary">Fresh & Fast</h2>
                        <p className="text-sm text-primary/80">Delivery in Sultanganj - 813213</p>
                    </div>
                    <Zap className="h-8 w-8 text-primary/80"/>
                </CardContent>
            </Card>

            <section className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="font-bold text-lg">Quick Reorder</h2>
                    <Button variant="outline" size="sm"><RefreshCw className="mr-2 h-4 w-4"/>Reorder</Button>
                </div>
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {lastOrderItems.map(item => (
                        <Card key={item.id} className="p-2 flex items-center gap-2">
                            <Image src={item.image} alt={item.name_en} width={40} height={40} className="rounded-md object-contain" data-ai-hint="product image" />
                            <p className="text-xs font-medium leading-tight flex-1">{item.name_en}</p>
                        </Card>
                    ))}
                </div>
            </section>
            

            <Tabs defaultValue={mainCategories[0].id} className="w-full">
              <TabsList className="grid w-full grid-cols-4 h-auto bg-transparent p-0 gap-2">
                {mainCategories.map(category => (
                  <TabsTrigger key={category.id} value={category.id} className="flex-col h-auto p-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-md border-2 border-transparent data-[state=active]:border-primary/50 rounded-lg">
                    <category.icon className="h-8 w-8 mb-1" />
                    <span className="text-[11px] text-center leading-tight">{category.name_en}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <div className="my-4 p-3 rounded-lg bg-green-50 border border-green-200 text-center">
                  <p className="font-semibold text-sm text-green-800">Free Delivery above ₹199</p>
              </div>

              {mainCategories.map(category => (
                <TabsContent key={category.id} value={category.id}>
                    <div className="mb-4">
                        <h3 className="font-bold mb-2">{category.name_en}</h3>
                        <div className="flex flex-wrap gap-2">
                            {getSubCategories(category.id).map(sub => (
                                <Badge key={sub} variant="outline" className="bg-white">{sub}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                       {getProductsForCategory(category.id).map(product => (
                           <ProductCard key={product.id} product={product} />
                       ))}
                    </div>
                     <Button variant="outline" className="w-full mt-6">
                        View All in {category.name_en} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </TabsContent>
              ))}
            </Tabs>
        </div>
      </main>
      <Footer />
      <BottomNav />
      <FreshozBuddy />
    </div>
  );
}
