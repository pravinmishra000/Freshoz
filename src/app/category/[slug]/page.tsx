
'use client';

import { useParams } from 'next/navigation';
import { products, categories } from '@/lib/data';
import { ProductCard } from '@/components/freshoz/product-card';
import { Header } from '@/components/freshoz/header';
import { Footer } from '@/components/freshoz/footer';

export default function CategoryPage() {
  const params = useParams();
  const { slug } = params;

  const currentCategory = categories.find((c) => c.slug === slug);

  const filteredProducts =
    currentCategory?.id === 'all'
      ? products
      : products.filter((p) => p.category_id === currentCategory?.id);

  const sortedProducts = filteredProducts.sort((a, b) => a.name_en.localeCompare(b.name_en));

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="mb-6 font-headline text-3xl font-bold">
            {currentCategory?.name_en || 'Category'}
          </h1>
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-md border border-dashed text-center">
              <p className="text-muted-foreground">No products found in this category.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
