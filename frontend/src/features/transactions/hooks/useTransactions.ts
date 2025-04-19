import { useState, useEffect } from 'react';

export interface Transaction {
  id: string;
  type: 'incoming' | 'outgoing';
  productId: string;
  productName: string;
  productSku: string;
  quantity: number;
  price: number;
  partyName: string;
  transactionDate: string;
  status: 'completed' | 'pending' | 'cancelled';
  notes?: string;
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5210/api/transaction', {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to load transactions');
      }
      
      const data = await response.json();
      setTransactions(data);
      setError(null);
    } catch (err) {
      setError(`Error loading transactions: ${err instanceof Error ? err.message : 'Unknown error'}`);
      console.error('Transaction loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const getTransactionsByProductId = async (productId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5210/api/transaction/product/${productId}`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to load product transactions');
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      setError(`Error loading product transactions: ${err instanceof Error ? err.message : 'Unknown error'}`);
      console.error('Product transaction loading error:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      const response = await fetch('http://localhost:5210/api/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(transaction)
      });
      
      if (!response.ok) {
        // Try to get detailed error message from response
        const errorData = await response.json().catch(() => ({}));
        const errorMsg = errorData.message || errorData.title || errorData.detail || 'Failed to create transaction';
        console.error('Transaction error response:', errorData);
        
        // Log the detailed validation errors if they exist
        if (errorData.errors) {
          console.error('Validation errors:', errorData.errors);
        }
        
        throw new Error(errorMsg);
      }
      
      const data = await response.json();
      setTransactions(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(`Error creating transaction: ${err instanceof Error ? err.message : 'Unknown error'}`);
      console.error('Transaction creation error:', err);
      throw err;
    }
  };

  const filterTransactions = (type: 'incoming' | 'outgoing' | 'all') => {
    if (type === 'all') return transactions;
    return transactions.filter(transaction => transaction.type === type);
  };

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    getTransactionsByProductId,
    createTransaction,
    filterTransactions
  };
};