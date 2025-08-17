
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
       <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft />
          </Button>
          <h1 className="text-xl font-bold">Privacy Policy</h1>
        </div>
      </header>
       <main className="flex-1">
        <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="prose dark:prose-invert text-base space-y-6">
                <div>
                    <h2 className="font-bold text-lg">1. Information We Collect</h2>
                    <p>We collect the following personal information to provide and improve our services:</p>
                    <ul className="list-disc pl-5">
                        <li><strong>Personal Identifiers:</strong> Name, delivery address, and contact number.</li>
                        <li><strong>Order History:</strong> Details of products you have purchased through our app.</li>
                    </ul>
                </div>
                <div>
                    <h2 className="font-bold text-lg">2. How We Use Your Information</h2>
                    <p>Your data is used solely for the following purposes:</p>
                    <ul className="list-disc pl-5">
                        <li>To process and deliver your orders.</li>
                        <li>To communicate with you regarding your orders and provide customer support.</li>
                        <li>To send you promotional offers and updates, but only with your explicit consent.</li>
                    </ul>
                </div>
                <div>
                    <h2 className="font-bold text-lg">3. Data Security & Storage</h2>
                    <p>We take your privacy seriously. Your data is stored securely on Firebase servers. We do not store any sensitive financial data like credit/debit card numbers. We will never sell or share your personal information with third-party marketers.</p>
                </div>
                <div>
                    <h2 className="font-bold text-lg">4. Your Rights</h2>
                    <p>You have the right to access, update, or delete your personal information at any time through the app's profile section or by contacting our support team.</p>
                </div>
                <div>
                    <h2 className="font-bold text-lg">5. Cookies & Tracking</h2>
                    <p>We use minimal tracking technologies, primarily to ensure the app functions correctly and to analyze app performance for improvements. We do not use third-party advertising trackers.</p>
                </div>
                 <p className="text-sm text-muted-foreground mt-8">Last Updated: 29 July 2024</p>
           </div>
        </div>
      </main>
    </div>
  );
}
