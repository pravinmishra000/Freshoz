'use client';

import { useState } from 'react';
import { Bot, Loader2, SendHorizonal, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { getCheaperAlternatives } from '@/ai/flows/freshoz-buddy';
import { trackOrderStatus } from '@/ai/flows/freshoz-buddy-track-order';
import { checkProductAvailability } from '@/ai/flows/freshoz-buddy-product-availability';
import { FreshozLogo } from './freshoz-logo';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: React.ReactNode;
};

type AIFlow = 'alternatives' | 'track' | 'availability';

export default function FreshozBuddy() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentFlow, setCurrentFlow] = useState<AIFlow | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showInitial, setShowInitial] = useState(true);

  const flowConfig = {
    alternatives: {
      prompt: 'What product are you looking for cheaper alternatives for?',
      placeholder: 'e.g., "Aashirvaad Atta"',
      action: getCheaperAlternatives,
    },
    track: {
      prompt: 'Please enter your Order ID to track its status.',
      placeholder: 'e.g., "ORDER12345"',
      action: (input: string) => trackOrderStatus({ orderId: input, userId: 'user123' }),
    },
    availability: {
      prompt: 'What product would you like to check the availability of?',
      placeholder: 'e.g., "Amul Gold Milk"',
      action: checkProductAvailability,
    },
  };

  const startFlow = (flow: AIFlow) => {
    setCurrentFlow(flow);
    setMessages([{ id: 'start', role: 'assistant', content: flowConfig[flow].prompt }]);
    setShowInitial(false);
  };
  
  const handleReset = () => {
    setMessages([]);
    setCurrentFlow(null);
    setInputValue('');
    setIsLoading(false);
    setShowInitial(true);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !currentFlow) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
    };
    const loadingMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: <Loader2 className="h-5 w-5 animate-spin" />,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setIsLoading(true);
    setInputValue('');

    try {
      const flowAction = flowConfig[currentFlow].action;
      const result = await flowAction({ productName: inputValue });
      
      let responseContent: React.ReactNode;
      if ('alternatives' in result) {
         responseContent = (
            <div>
              <p>{result.reasoning}</p>
              <ul className="mt-2 list-disc pl-5">
                {result.alternatives.map((alt, i) => <li key={i}>{alt}</li>)}
              </ul>
            </div>
          );
      } else if ('orderStatus' in result) {
        responseContent = `Order Status: ${result.orderStatus}. ${result.deliveryETA ? `ETA: ${result.deliveryETA}.` : ''}`;
      } else if ('isAvailable' in result) {
        responseContent = result.availabilityMessage;
      } else {
        responseContent = "Sorry, I couldn't process that.";
      }

       const assistantMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: responseContent,
      };
      setMessages((prev) => [...prev.slice(0, -1), assistantMessage]);

    } catch (error) {
      console.error('AI Flow Error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: "Sorry, something went wrong. Please try again later.",
      };
      setMessages((prev) => [...prev.slice(0, -1), errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) handleReset();
      }}>
        <SheetTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full shadow-lg"
            aria-label="Open AI Assistant"
          >
            <Bot className="h-8 w-8" />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex w-full flex-col sm:max-w-md">
          <SheetHeader className="pr-10">
            <SheetTitle>
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-accent"/>
                <span className="font-headline">Freshoz Buddy</span>
              </div>
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-1 pr-4 -mr-4 my-4">
            <div className="space-y-4">
              {showInitial && (
                <Card className="bg-primary/5">
                  <CardContent className="p-4 space-y-3">
                    <p className="font-semibold text-center">How can I help you today?</p>
                    <Button variant="outline" className="w-full justify-start" onClick={() => startFlow('alternatives')}>Find cheaper alternatives</Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => startFlow('track')}>Track my order</Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => startFlow('availability')}>Check product availability</Button>
                  </CardContent>
                </Card>
              )}
              {messages.map((message) => (
                <div key={message.id} className={`flex items-end gap-2 ${message.role === 'user' ? 'justify-end' : ''}`}>
                  {message.role === 'assistant' && <Avatar className="h-8 w-8"><AvatarFallback><Bot size={20} /></AvatarFallback></Avatar>}
                  <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          {currentFlow && (
            <SheetFooter>
               <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={flowConfig[currentFlow].placeholder}
                  disabled={isLoading}
                  autoFocus
                />
                <Button type="submit" size="icon" disabled={isLoading}>
                  <SendHorizonal className="h-4 w-4" />
                </Button>
              </form>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
