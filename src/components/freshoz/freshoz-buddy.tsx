
'use client';

import { useState } from 'react';
import { Bot, Loader2, SendHorizonal, Sparkles, X, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { getCheaperAlternatives } from '@/ai/flows/freshoz-buddy';
import { trackOrderStatus } from '@/ai/flows/freshoz-buddy-track-order';
import { checkProductAvailability } from '@/ai/flows/freshoz-buddy-product-availability';
import { manageCart } from '@/ai/flows/freshoz-buddy-manage-cart';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: React.ReactNode;
};

type AIFlow = 'alternatives' | 'track' | 'availability' | 'cart';

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
      inputKey: 'productName',
    },
    track: {
      prompt: 'Please enter your Order ID to track its status.',
      placeholder: 'e.g., "ORDER12345"',
      action: (input: any) => trackOrderStatus({ orderId: input.productName, userId: 'user123' }),
      inputKey: 'productName',
    },
    availability: {
      prompt: 'What product would you like to check the availability of?',
      placeholder: 'e.g., "Amul Gold Milk"',
      action: checkProductAvailability,
      inputKey: 'productName',
    },
    cart: {
      prompt: 'You can add, remove, or check items in your cart. For example: "Add 2kg tomatoes"',
      placeholder: 'e.g., "Add 2kg tomatoes"',
      action: (input: {query: string}) => manageCart({ query: input.query }),
      inputKey: 'query',
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
    

    try {
      const flowDetails = flowConfig[currentFlow];
      const flowAction = flowDetails.action;
      const inputKey = flowDetails.inputKey;
      
      const actionInput = { [inputKey]: inputValue };
      setInputValue('');
      const result = await flowAction(actionInput as any);
      
      let responseContent: React.ReactNode;

      if (currentFlow === 'cart' && 'action' in result) {
        responseContent = result.message;
      } else if ('alternatives' in result) {
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
  
  const supportPhoneNumber = '9097882555';

  return (
    <>
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-40 right-6 z-50 h-14 w-14 rounded-full border-2 border-primary bg-primary/10 p-0 text-primary shadow-lg backdrop-blur-sm hover:bg-primary/20 md:bottom-8 md:right-8"
          aria-label="Open AI Assistant"
        >
          <Sparkles className="h-7 w-7" />
        </Button>
      <Sheet open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) handleReset();
      }}>
        <SheetContent className="flex w-full flex-col sm:max-w-md">
          <SheetHeader className="pr-10">
            <SheetTitle>
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-yellow-400"/>
                <span className="font-headline">Help & Support</span>
              </div>
            </SheetTitle>
          </SheetHeader>
          
          {currentFlow ? (
            <>
              <ScrollArea className="flex-1 pr-4 -mr-4 my-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex items-end gap-2 ${message.role === 'user' ? 'justify-end' : ''}`}>
                      {message.role === 'assistant' && <Avatar className="h-8 w-8 bg-primary/20"><AvatarFallback><Bot size={20} className="text-primary" /></AvatarFallback></Avatar>}
                      <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
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
                  <Button type="button" size="icon" variant="ghost" onClick={handleReset}>
                    <X className="h-4 w-4" />
                  </Button>
                </form>
              </SheetFooter>
            </>
          ) : (
             <div className="flex-1 my-4">
                <Card className="bg-primary/5">
                  <CardContent className="p-4 space-y-3">
                    <p className="font-semibold text-center">How can we help you today?</p>
                    <p className="text-sm text-muted-foreground text-center">Get instant help with our AI assistant or connect with our support team.</p>
                     <Button variant="outline" className="w-full justify-start gap-2" onClick={() => startFlow('cart')}>
                        <Bot /> Manage my cart (AI)
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2" onClick={() => startFlow('track')}>
                       <Bot /> Track my order (AI)
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2" onClick={() => startFlow('alternatives')}>
                       <Bot /> Find cheaper alternatives (AI)
                    </Button>
                  </CardContent>
                </Card>

                <Card className="mt-4 bg-blue-50">
                    <CardContent className="p-4 space-y-3">
                        <p className="font-semibold text-center">Contact Support</p>
                        <a href={`tel:${supportPhoneNumber}`} className="w-full">
                             <Button variant="outline" className="w-full justify-start gap-2 bg-white">
                                <Phone /> Call Us
                            </Button>
                        </a>
                        <a href={`https://wa.me/${supportPhoneNumber}`} target="_blank" rel="noopener noreferrer" className="w-full">
                            <Button variant="outline" className="w-full justify-start gap-2 bg-white">
                                <MessageSquare /> Chat on WhatsApp
                            </Button>
                        </a>
                    </CardContent>
                </Card>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
