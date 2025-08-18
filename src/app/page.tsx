
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { products, categories } from '@/lib/data';
import type { Product } from '@/lib/types';
import { ProductCard } from '@/components/freshoz/product-card';
import LocationGate from '@/components/freshoz/location-gate';
import FreshozBuddy from '@/components/freshoz/freshoz-buddy';
import SplashScreen from '@/components/freshoz/splash-screen';
import { BottomNav } from '@/components/freshoz/bottom-nav';
import { Footer } from '@/components/freshoz/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/cart-context';
import { Search, ChevronRight, User, Wallet, Mic, CheckCircle, X, Phone, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from '@/components/ui/card';
import { FreshozLogo } from '@/components/freshoz/freshoz-logo';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isDeliveryBannerVisible, setIsDeliveryBannerVisible] = useState(true);

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
  const frequentlyBought = [
      { name: 'Milk, Curd & Paneer', images: ['p4', 'p24'] },
      { name: 'Oil, Ghee & Masala', images: ['p14', 'p17'] },
      { name: 'Bread, Butter & E...', images: ['p27', 'p25'] },
  ]
  const featuredItems = [
      { title: 'Newly Launched', subtitle: 'For You', image: 'https://placehold.co/200x200.png', hint: 'new product' },
      { title: 'Ganesh Chaturthi Specials', subtitle: 'Featured', image: 'https://placehold.co/200x200.png', hint: 'festival sweets' },
      { title: 'Derma Store', subtitle: 'Featured', image: 'https://placehold.co/200x200.png', hint: 'skincare products' },
      { title: 'Monsoon Essentials', subtitle: 'Featured', image: 'https://placehold.co/200x200.png', hint: 'umbrella raincoat' },
  ]

  const getProductsForCategory = (categoryId: string) => {
    return products.filter(p => p.category_id === categoryId).slice(0, 6);
  };
  
  const getSubCategories = (categoryId: string) => {
      const category = categories.find(c => c.id === categoryId);
      return category?.subCategories || [];
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-orange-400 to-background text-foreground">
       <header className="sticky top-0 z-40 w-full border-b border-white/20 text-white shadow-sm">
         <div className="container mx-auto flex h-auto flex-col gap-2 px-4 py-3">
           <div className="flex items-center justify-between">
              <div className="flex flex-col">
                 <a href="/" className="flex items-center gap-2">
                  <div className="flex-shrink-0">
                    <h1 className="font-headline text-2xl font-bold text-white">FRESHOZ</h1>
                    <p className="text-xs font-semibold uppercase tracking-wider text-green-100">Fresh & Fast</p>
                  </div>
                </a>
              </div>
              <div className="flex items-center gap-2">
                  <a href="tel:9097882555">
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20"><Phone /></Button>
                  </a>
                   <a href="https://wa.me/9097882555" target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20"><MessageSquare /></Button>
                  </a>
                  <Button asChild variant="ghost" size="icon" className="text-white hover:bg-white/20"><Link href="/wallet"><Wallet /></Link></Button>
                  <Button asChild variant="ghost" size="icon" className="text-white hover:bg-white/20"><Link href="/profile"><User /></Link></Button>
              </div>
           </div>
            <p className="text-sm font-medium text-white">HOME - Pravin Mishra ▼</p>
           <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for atta, dal, milk..."
              className="w-full rounded-lg border-2 border-primary/30 bg-background text-foreground pl-10 pr-10"
            />
            <Mic className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
         </div>
      </header>

      <main className="flex-1 pb-40">
        <LocationGate />
        
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
            
             {/* Featured Section */}
            <section className="mb-8">
                <div className="flex space-x-4 overflow-x-auto pb-4">
                    {featuredItems.map((item, index) => (
                         <Card key={index} className="w-40 flex-shrink-0 rounded-xl border-2 border-primary/20 hover:border-primary/50 transition-all">
                            <CardContent className="p-2">
                                <div className="relative aspect-square w-full">
                                    <Image src={item.image} alt={item.title} fill className="rounded-lg object-cover" data-ai-hint={item.hint}/>
                                </div>
                                <p className="mt-2 text-center font-semibold leading-tight">{item.title}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Frequently Bought */}
            <section className="mb-8">
                <h2 className="font-bold text-xl mb-4">Frequently bought</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                   {frequentlyBought.map((item, index) => (
                        <Card key={index} className="p-2">
                           <div className="flex justify-between items-center mb-2">
                               {item.images.map(imgId => {
                                   const product = products.find(p => p.id === imgId);
                                   return product ? <Image key={product.id} src={product.image} alt={product.name_en} width={40} height={40} className="object-contain" data-ai-hint="product image"/> : null;
                               })}
                               <div className="text-xs bg-muted p-1 rounded-md">+1 more</div>
                           </div>
                           <p className="font-semibold">{item.name}</p>
                        </Card>
                   ))}
                </div>
            </section>

            <Tabs defaultValue={mainCategories[0].id} className="w-full">
              <TabsList className="grid w-full grid-cols-4 h-auto bg-transparent p-0 gap-2">
                {mainCategories.map(category => (
                  <TabsTrigger key={category.id} value={category.id} className="flex-col h-auto p-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-md border-2 border-transparent data-[state=active]:border-primary/50 rounded-lg bg-white/70 backdrop-blur-sm">
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
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                       {getProductsForCategory(category.id).map(product => (
                           <ProductCard key={product.id} product={product} />
                       ))}
                    </div>
                     <Button variant="outline" className="w-full mt-6 bg-white/70 backdrop-blur-sm">
                        View All in {category.name_en} <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </TabsContent>
              ))}
            </Tabs>
        </div>
      </main>

      {/* Floating View Cart & Free Delivery Banner */}
      {cart.length > 0 && (
         <div className="fixed bottom-16 left-0 z-50 w-full px-4 pb-2 md:bottom-4">
            <div className="mx-auto max-w-md">
                {isDeliveryBannerVisible && (
                    <div className="mb-2 flex items-center justify-between rounded-lg bg-blue-100 p-2 text-sm text-blue-800 shadow-lg">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-blue-600"/>
                            <p><span className="font-bold">Yay! You got FREE Delivery</span> No coupon needed</p>
                        </div>
                        <button onClick={() => setIsDeliveryBannerVisible(false)}><X className="h-5 w-5"/></button>
                    </div>
                )}
                 <Link href="/cart">
                    <div className="flex h-16 items-center justify-between rounded-lg bg-primary p-4 text-primary-foreground shadow-lg">
                        <div className="flex items-center gap-2">
                             <div className="relative flex">
                                {cart.slice(0, 2).map((item, index) => (
                                    <div key={item.id} className="relative h-10 w-10 rounded-full border-2 border-primary-foreground" style={{ zIndex: 2 - index, marginLeft: index > 0 ? '-16px' : 0 }}>
                                        <Image src={item.image} alt={item.name_en} fill className="object-contain rounded-full bg-white p-1" data-ai-hint="product image"/>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold">View cart</span>
                                <span className="text-xs">{totalItems} Items</span>
                            </div>
                        </div>
                        <ChevronRight className="h-6 w-6"/>
                    </div>
                </Link>
            </div>
        </div>
      )}

      <Footer />
      <BottomNav />
      <FreshozBuddy />
    </div>
  );
}
