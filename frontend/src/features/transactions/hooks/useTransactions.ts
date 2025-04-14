import { useState, useEffect } from 'react';

export interface Transaction {
  id: string;
  type: 'incoming' | 'outgoing';
  productName: string;
  quantity: number;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
  supplier?: string;
  customer?: string;
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: API çağrısı yapılacak
    const fetchTransactions = async () => {
      try {
        const mockTransactions: Transaction[] = [
          {
            id: '1',
            type: 'incoming',
            productName: 'Laptop',
            quantity: 10,
            date: '2024-03-20',
            status: 'completed',
            supplier: 'ABC Electronics'
          },
          {
            id: '2',
            type: 'outgoing',
            productName: 'Mouse',
            quantity: 5,
            date: '2024-03-19',
            status: 'pending',
            customer: 'XYZ Company'
          },
          {
            id: '3',
            type: 'outgoing',
            productName: 'Keyboard',
            quantity: 3,
            date: '2024-03-18',
            status: 'completed',
            customer: 'Tech Solutions'
          },
          {
            id: '4',
            type: 'incoming',
            productName: 'Monitor',
            quantity: 8,
            date: '2024-03-17',
            status: 'completed',
            supplier: 'Display Pro'
          }
        ];
        setTransactions(mockTransactions);
      } catch (err) {
        setError(`Error loading transactions: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const filterTransactions = (type: 'incoming' | 'outgoing' | 'all') => {
    if (type === 'all') return transactions;
    return transactions.filter(transaction => transaction.type === type);
  };

  return {
    transactions,
    loading,
    error,
    filterTransactions
  };
}; 