import { database } from '@/lib/firebase';
import { ref, get, set } from 'firebase/database';
import { auth } from '@/lib/firebase';

// Get user's wallet balance from Realtime Database
export async function getWalletBalance(userId: string): Promise<number> {
  try {
    const balanceRef = ref(database, `users/${userId}/walletBalance`);
    const snapshot = await get(balanceRef);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      // Initialize balance if it doesn't exist
      await set(balanceRef, 0);
      return 0;
    }
  } catch (error) {
    console.error('Error getting wallet balance:', error);
    throw new Error('Failed to fetch balance. Please try again.');
  }
}

// Add money to wallet in Realtime Database
export async function addToWallet(userId: string, amount: number): Promise<void> {
  try {
    const balanceRef = ref(database, `users/${userId}/walletBalance`);
    const snapshot = await get(balanceRef);

    let currentBalance = 0;
    if (snapshot.exists()) {
      currentBalance = snapshot.val();
    }

    const newBalance = currentBalance + amount;
    await set(balanceRef, newBalance);
  } catch (error) {
    console.error('Error adding to wallet:', error);
    throw new Error('Failed to add money. Please try again.');
  }
}

// Get user ID from Firebase Authentication
export function getCurrentUserId(): string | null {
  try {
    // Return actual user ID if authenticated
    if (auth.currentUser) {
      return auth.currentUser.uid;
    }

    // Fallback for development/demo
    console.warn('No authenticated user, using demo ID');
    return "demo-user-123";

  } catch (error) {
    console.error('Error getting user ID:', error);
    return "demo-user-123"; // Fallback
  }
}

// Transaction interface
export interface Transaction {
  id: string;
  amount: number;
  type: 'credit' | 'debit';
  method: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

// Add transaction to history
export async function addTransaction(userId: string, transaction: Omit<Transaction, 'id'>): Promise<void> {
  try {
    const transactionRef = ref(database, `users/${userId}/transactions/${Date.now()}`);
    await set(transactionRef, {
      ...transaction,
      id: `TXN${Date.now()}`
    });
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw new Error('Failed to record transaction.');
  }
}

// Get transaction history
export async function getTransactions(userId: string): Promise<Transaction[]> {
  try {
    const transactionsRef = ref(database, `users/${userId}/transactions`);
    const snapshot = await get(transactionsRef);

    if (snapshot.exists()) {
      const transactionsData = snapshot.val();
      // Convert object to array and filter out null values
      const transactions = Object.values(transactionsData).filter(tx => tx !== null) as Transaction[];
      // Sort by timestamp descending
      return transactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }

    return [];
  } catch (error) {
    console.error('Error getting transactions:', error);
    throw new Error('Failed to load transactions.');
  }
}

// Firebase connection test function
export async function testFirebaseConnection(): Promise<string> {
  try {
    const testRef = ref(database, 'connectionTest');
    const testData = {
      test: true,
      timestamp: new Date().toISOString(),
      message: 'Firebase connection test successful'
    };

    await set(testRef, testData);
    return 'Firebase connection successful! Data written to database.';
  } catch (error: any) {
    return `Firebase connection failed: ${error.message}`;
  }
}

// Test data read function
export async function testFirebaseRead(): Promise<string> {
  try {
    const testRef = ref(database, 'connectionTest');
    const snapshot = await get(testRef);

    if (snapshot.exists()) {
      return `Data read successfully: ${JSON.stringify(snapshot.val())}`;
    } else {
      return 'No test data found in database';
    }
  } catch (error: any) {
    return `Data read failed: ${error.message}`;
  }
}

// Error types
export type WalletErrorType = 'network' | 'auth' | 'validation' | 'database' | 'unknown';

export interface WalletError {
  type: WalletErrorType;
  message: string;
  originalError?: any;
}

// Error messages mapping
const errorMessages: Record<WalletErrorType, string> = {
  network: 'Network error. Please check your internet connection.',
  auth: 'Authentication failed. Please login again.',
  validation: 'Invalid input. Please check your details.',
  database: 'Database error. Please try again.',
  unknown: 'An unexpected error occurred. Please try again.'
};

// Enhanced error handler
export function handleWalletError(error: any): WalletError {
  console.error('Wallet error:', error);

  if (error?.code?.includes('network') || error?.message?.includes('network')) {
    return { type: 'network', message: errorMessages.network, originalError: error };
  }

  if (error?.code?.includes('permission') || error?.message?.includes('auth')) {
    return { type: 'auth', message: errorMessages.auth, originalError: error };
  }

  if (error?.code?.includes('invalid') || error?.message?.includes('valid')) {
    return { type: 'validation', message: errorMessages.validation, originalError: error };
  }

  if (error?.code?.includes('database') || error?.message?.includes('firebase')) {
    return { type: 'database', message: errorMessages.database, originalError: error };
  }

  return { type: 'unknown', message: errorMessages.unknown, originalError: error };
}