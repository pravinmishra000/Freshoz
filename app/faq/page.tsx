
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Phone, MessageSquare } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link';

export default function FaqPage() {
  const router = useRouter();
  const supportPhoneNumber = '9097882555';

  const faqs = [
    {
      question: "Q1. Where does Freshoz deliver?",
      answer: "Currently we deliver only in PIN 813213 (Sultanganj, Bihar)."
    },
    {
      question: "Q2. What is the delivery timing?",
      answer: (
        <p>
          Two slots are available:
          <br />
          - Morning: 8:00 AM – 1:00 PM
          <br />
          - Evening: 1:00 PM – 8:30 PM
        </p>
      )
    },
    {
      question: "Q3. What are the payment options?",
      answer: "We accept UPI and Cash on Delivery (COD). (Card payments not available yet)."
    },
    {
      question: "Q4. Is there a minimum order amount?",
      answer: "Yes, free delivery starts above ₹199. Below this, a small delivery charge applies."
    },
    {
      question: "Q5. What about refunds/returns?",
      answer: (
        <ul className="list-disc pl-5">
            <li>Perishable items (veggies, fruits, dairy) → No return.</li>
            <li>Packaged goods → Refund/return possible within 24 hours if sealed.</li>
        </ul>
      )
    },
    {
      question: "Q6. How do I contact support?",
      answer: (
        <div className="space-y-2">
            <p>You can reach us via:</p>
            <div className="flex flex-col sm:flex-row gap-2">
                <Button asChild variant="outline">
                    <a href={`tel:${supportPhoneNumber}`} className="flex items-center gap-2">
                        <Phone className="h-4 w-4" /> Call: {supportPhoneNumber}
                    </a>
                </Button>
                <Button asChild variant="outline">
                    <a href={`https://wa.me/${supportPhoneNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" /> WhatsApp Chat
                    </a>
                </Button>
            </div>
            <p>Or through the “Contact Us” page in the app.</p>
        </div>
      )
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/profile')}>
            <ChevronLeft />
          </Button>
          <h1 className="text-xl font-bold">FAQ (Frequently Asked Questions)</h1>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
        </div>
      </main>
    </div>
  );
}
