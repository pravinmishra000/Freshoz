import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/freshoz/header';
import { Footer } from '@/components/freshoz/footer';
import { categories, products } from '@/lib/data';
import { CategoryCard } from '@/components/freshoz/category-card';
import { ProductCard } from '@/components/freshoz/product-card';
import LocationGate from '@/components/freshoz/location-gate';
import FreshozBuddy from '@/components/freshoz/freshoz-buddy';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
  const quickCommerceProducts = products.filter(p => p.delivery_mode === 'quick');
  const eCommerceProducts = products.filter(p => p.delivery_mode === 'ecom');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="relative mb-12 h-64 w-full overflow-hidden rounded-lg bg-primary/10">
            <Image
              src="https://placehold.co/1200x400.png"
              alt="Fresh groceries"
              layout="fill"
              objectFit="cover"
              className="opacity-20"
              data-ai-hint="grocery store"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <h1 className="font-headline text-4xl font-bold text-primary-foreground md:text-5xl" style={{textShadow: '0 2px 4px rgba(0,0,0,0.3)'}}>
                Fresh & Fast, Right to Your Door
              </h1>
              <p className="mt-2 text-lg text-primary-foreground/90" style={{textShadow: '0 1px 3px rgba(0,0,0,0.2)'}}>
                Your daily essentials, delivered when you need them.
              </p>
            </div>
          </section>

          {/* Categories Section */}
          <section className="mb-12">
            <h2 className="mb-6 font-headline text-3xl font-bold">Shop by Category</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>

          {/* Products Section */}
          <section className="mb-12">
            <Tabs defaultValue="quick" className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-2">
                <TabsTrigger value="quick">
                  <div className="flex items-center gap-2">
                    <span role="img" aria-label="rocket">🚀</span>
                    <div>
                      <p className="font-bold">Quick Commerce</p>
                      <p className="text-xs text-muted-foreground">10-15 Mins</p>
                    </div>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="ecom">
                  <div className="flex items-center gap-2">
                    <span role="img" aria-label="package">📦</span>
                    <div>
                      <p className="font-bold">E-Commerce</p>
                      <p className="text-xs text-muted-foreground">1-2 Days</p>
                    </div>
                  </div>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="quick">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {quickCommerceProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="ecom">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {eCommerceProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </section>

          {/* Deals & Offers Banner */}
          <section className="mb-12">
            <Card className="overflow-hidden bg-gradient-to-r from-accent to-yellow-300 text-accent-foreground">
              <CardContent className="flex flex-col items-center justify-between p-6 sm:flex-row">
                <div>
                  <h3 className="font-headline text-2xl font-bold">Today's Offer!</h3>
                  <p className="mt-1">Get 20% off on fresh vegetables. Don't miss out!</p>
                </div>
                <Button className="mt-4 shrink-0 bg-primary text-primary-foreground sm:mt-0">Shop Now</Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
      <LocationGate />
      <FreshozBuddy />
    </div>
  );
}
