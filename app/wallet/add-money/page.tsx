'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, CreditCard, Smartphone, Eye, EyeOff } from 'lucide-react';
import { addToWallet, getCurrentUserId, addTransaction } from '@/lib/wallet';

export default function AddMoneyPage() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [upiId, setUpiId] = useState('');
  const [showCardForm, setShowCardForm] = useState(false);
  const [showCvv, setShowCvv] = useState(false);

  const handleAddMoney = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    // Validate payment details
    if (paymentMethod === 'card') {
      if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
        alert("Please enter complete card details");
        return;
      }

      if (cardDetails.number.replace(/\s+/g, '').length !== 16) {
        alert("Please enter a valid 16-digit card number");
        return;
      }
    }

    if (paymentMethod === 'upi' && !upiId) {
      alert("Please enter UPI ID");
      return;
    }

    setIsProcessing(true);

    try {
      const userId = getCurrentUserId();
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const amountValue = parseFloat(amount);

      // Simulate payment processing
      console.log(`Processing ₹${amountValue} via ${paymentMethod}`);
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Actual Firebase calls
      await addToWallet(userId, amountValue);

      // Add transaction record
      await addTransaction(userId, {
        amount: amountValue,
        type: 'credit',
        method: paymentMethod,
        description: `Money added via ${paymentMethod.toUpperCase()}`,
        timestamp: new Date().toISOString(),
        status: 'completed'
      });

      alert(`₹${amountValue} added successfully to your wallet!`);
      router.push('/wallet');

    } catch (error: any) {
      console.error('Payment error:', error);

      // Better error handling
      const errorMessage = error.message.includes('network')
        ? 'Network error. Please check your internet connection and try again.'
        : error.message.includes('permission')
        ? 'Authentication failed. Please login again.'
        : 'Payment failed. Please try again or use a different payment method.';

      alert(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCardInputChange = (field: string, value: string) => {
    setCardDetails(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
    setShowCardForm(method === 'card');
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    return parts.length ? parts.join(' ') : value;
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-yellow-300/80 to-yellow-50 text-slate-800">
      <header className="sticky top-0 z-40 w-full bg-transparent text-slate-800">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft />
          </Button>
          <h1 className="text-xl font-bold">Add Money</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="flex-1 flex flex-col px-4">
        <div className="max-w-md mx-auto w-full py-6">
          {/* Amount Input */}
          <div className="mb-6">
            <Label htmlFor="amount" className="text-lg font-medium mb-2 block">Enter Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="₹100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-2xl text-center py-6"
              min="1"
            />
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
            
            <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange} className="space-y-4">
              {/* Credit/Debit Card */}
              <Card className="bg-white/80 backdrop-blur-sm border-none shadow-sm">
                <CardContent className="p-4 flex items-center">
                  <RadioGroupItem value="card" id="card" className="mr-4" />
                  <div className="flex-1">
                    <Label htmlFor="card" className="text-lg font-medium">Credit/Debit Card</Label>
                    <p className="text-sm text-muted-foreground">Pay using your card securely</p>
                  </div>
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </CardContent>
              </Card>

              {/* Card Form */}
              {showCardForm && (
                <div className="ml-8 p-4 bg-white rounded-lg border border-gray-200 space-y-4">
                  <div>
                    <Label htmlFor="cardNumber" className="text-sm font-medium">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formatCardNumber(cardDetails.number)}
                      onChange={(e) => handleCardInputChange('number', e.target.value)}
                      maxLength={19}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cardName" className="text-sm font-medium">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      value={cardDetails.name}
                      onChange={(e) => handleCardInputChange('name', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cardExpiry" className="text-sm font-medium">Expiry Date</Label>
                      <Input
                        id="cardExpiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                        maxLength={5}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cardCvv" className="text-sm font-medium">CVV</Label>
                      <div className="relative">
                        <Input
                          id="cardCvv"
                          type={showCvv ? "text" : "password"}
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                          maxLength={4}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowCvv(!showCvv)}
                        >
                          {showCvv ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* UPI */}
              <Card className="bg-white/80 backdrop-blur-sm border-none shadow-sm">
                <CardContent className="p-4 flex items-center">
                  <RadioGroupItem value="upi" id="upi" className="mr-4" />
                  <div className="flex-1">
                    <Label htmlFor="upi" className="text-lg font-medium">UPI</Label>
                    <p className="text-sm text-muted-foreground">Pay using any UPI app</p>
                  </div>
                  <Smartphone className="h-6 w-6 text-green-600" />
                </CardContent>
              </Card>

              {/* UPI Form */}
              {paymentMethod === 'upi' && (
                <div className="ml-8 p-4 bg-white rounded-lg border border-gray-200">
                  <Label htmlFor="upiId" className="text-sm font-medium">UPI ID</Label>
                  <Input
                    id="upiId"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Enter your UPI ID or we'll redirect you to your UPI app
                  </p>
                </div>
              )}
            </RadioGroup>
          </div>

          {/* Add Money Button */}
          <Button 
            onClick={handleAddMoney}
            className="w-full h-14 bg-green-600 hover:bg-green-700 text-lg rounded-xl shadow-lg"
            disabled={!amount || parseFloat(amount) <= 0 || isProcessing}
          >
            {isProcessing ? 'Processing...' : `Add ₹${amount || '0'}`}
          </Button>

          {/* Security Note */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800 text-center">
              <strong>Secure Payment:</strong> Your card details are encrypted and secure
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}