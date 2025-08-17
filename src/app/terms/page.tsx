
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function TermsPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft />
          </Button>
          <h1 className="text-xl font-bold">Terms & Conditions</h1>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
           <div className="prose dark:prose-invert text-base space-y-6">
                <div>
                    <h2 className="font-bold text-lg">1. Service Area</h2>
                    <p>Our services are exclusively available for the PIN code <strong>813213</strong> (Sultanganj, Bihar). We reserve the right to refuse orders outside this area.</p>
                </div>
                <div>
                    <h2 className="font-bold text-lg">2. Pricing</h2>
                    <p>All prices listed on the app are inclusive of applicable taxes. Prices for products may change based on market rates and supplier costs without prior notice.</p>
                </div>
                <div>
                    <h2 className="font-bold text-lg">3. Returns & Refunds</h2>
                    <p><strong>Perishable Items:</strong> No returns will be accepted for perishable items like fruits, vegetables, and dairy products once the order is delivered.</p>
                    <p><strong>Packaged Goods:</strong> Returns for sealed, unopened packaged goods are accepted within 24 hours of delivery. A refund will be processed to your wallet or original payment method upon verification.</p>
                </div>
                <div>
                    <h2 className="font-bold text-lg">4. Order Cancellation</h2>
                    <p>Orders can be cancelled before they are dispatched for delivery. Once an order is out for delivery, it cannot be cancelled.</p>
                </div>
                <div>
                    <h2 className="font-bold text-lg">5. Liability</h2>
                    <p>Freshoz is not liable for delays in delivery due to unforeseen circumstances such as traffic, weather conditions, or other external factors beyond our control.</p>
                </div>
                 <div>
                    <h2 className="font-bold text-lg">6. User Conduct</h2>
                    <p>Users are expected to provide accurate information for delivery. Any misuse of the app or fraudulent activity will result in account suspension and potential legal action.</p>
                </div>
                 <p className="text-sm text-muted-foreground mt-8">Last Updated: 29 July 2024</p>
           </div>
        </div>
      </main>
    </div>
  );
}
