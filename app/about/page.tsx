
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft />
          </Button>
          <h1 className="text-xl font-bold">About Us</h1>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="prose dark:prose-invert text-base space-y-4">
            <h2 className="text-2xl font-bold">Your Trusted Local Partner for Daily Needs.</h2>
            <p>Welcome to Freshoz, your trusted local partner for fresh and fast grocery delivery right here in Sultanganj, Bihar.</p>
            <p>We are a team of passionate individuals dedicated to bringing you the best quality products at fair prices, sourced directly from local farms and trusted suppliers. Our mission is to make your grocery shopping experience convenient, affordable, and reliable.</p>
            
            <h3 className="text-xl font-bold mt-6">What We Offer</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Farm-Fresh Produce:</strong> We provide a wide range of farm-fresh vegetables, seasonal fruits, and other essentials, ensuring you get the best in quality and taste.</li>
              <li><strong>Quality Staples:</strong> From dairy products to essential staples, we have everything you need for your kitchen.</li>
              <li><strong>Convenient Delivery:</strong> We offer flexible delivery slots to fit your schedule (8 AM–1 PM & 1 PM–8:30 PM), so you can get your groceries when you need them.</li>
            </ul>

            <h3 className="text-xl font-bold mt-6">Our Commitment</h3>
            <ul className="list-disc pl-5 space-y-2">
               <li><strong>Fair Prices:</strong> We believe in transparent pricing and work hard to keep our prices competitive without compromising on quality.</li>
               <li><strong>Easy Payments:</strong> We support multiple payment options including UPI and Cash on Delivery for your convenience.</li>
               <li><strong>Customer Satisfaction:</strong> Your satisfaction is our top priority. We are always here to help and ensure you have a great shopping experience with us.</li>
            </ul>
            <p className="mt-6">Thank you for choosing Freshoz. We look forward to serving you!</p>
          </div>
        </div>
      </main>
    </div>
  );
}
