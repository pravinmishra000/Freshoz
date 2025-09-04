'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ArrowUp, ArrowDown, Receipt, RefreshCw } from 'lucide-react';
import { getTransactions, getCurrentUserId, Transaction } from '@/lib/wallet';

export default function TransactionsPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTransactionsData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const userId = getCurrentUserId();

      if (!userId) {
        setError('User not authenticated');
        return;
      }

      const userTransactions = await getTransactions(userId);
      setTransactions(userTransactions);

    } catch (error: any) {
      console.error('Error loading transactions:', error);
      setError('Failed to load transactions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTransactionsData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount: number, type: 'credit' | 'debit') => {
    return `${type === 'credit' ? '+' : '-'}₹${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-300/80 to-yellow-50 text-slate-800">
      <header className="sticky top-0 z-40 w-full bg-transparent text-slate-800">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft />
          </Button>
          <h1 className="text-xl font-bold">Transaction History</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={loadTransactionsData}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </header>

      <main className="p-4">
        <div className="max-w-md mx-auto">
          {error ? (
            <Card className="bg-red-50 border-red-200 text-center py-8">
              <CardContent>
                <p className="text-red-600 mb-4">{error}</p>
                <Button
                  onClick={loadTransactionsData}
                  variant="outline"
                  size="sm"
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          ) : isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-white/80 backdrop-blur-sm animate-pulse">
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : transactions.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm text-center py-12">
              <CardContent>
                <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600">No transactions yet</h3>
                <p className="text-sm text-gray-500 mt-2">Your transactions will appear here</p>
                <Button
                  onClick={() => router.push('/wallet/add-money')}
                  className="mt-4"
                >
                  Add Money
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <Card key={transaction.id} className="bg-white/80 backdrop-blur-sm border-none shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'credit'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? (
                            <ArrowUp className="h-4 w-4" />
                          ) : (
                            <ArrowDown className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">
                            {formatAmount(transaction.amount, transaction.type)}
                          </p>
                          <p className="text-sm text-gray-600">{transaction.description}</p>
                          <p className="text-xs text-gray-500 capitalize">
                            {transaction.method} • {formatDate(transaction.timestamp)}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : transaction.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}