import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

export interface Transaction {
  id: string;
  productName?: string;
  quantity: number;
  date: string;
  type: 'incoming' | 'outgoing';
  status: string;
}

export const useDashboard = () => {
  const [totalStock, setTotalStock] = useState<number | null>(null);
  const [incomingStock, setIncomingStock] = useState<number | null>(null);
  const [outgoingStock, setOutgoingStock] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSummaryLoading, setIsSummaryLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const [transactionsError, setTransactionsError] = useState<string | null>(null);

  const formatTransactionDate = (dateStr: string) => {
    try {
      return formatDistanceToNow(new Date(dateStr), { 
        addSuffix: true,
        locale: tr 
      });
    } catch {
      return dateStr;
    }
  };

  useEffect(() => {
    const fetchTotalStock = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5210/api/inventory/totalstock', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch total stock data');
        }
        
        const data = await response.json();
        
        const stockValue = typeof data === 'number' 
          ? data 
          : (data.totalStock || data.total || data.count || data.value || Object.values(data)[0]);
        
        setTotalStock(stockValue);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching total stock:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchTransactionSummary = async () => {
      try {
        setIsSummaryLoading(true);
        const response = await fetch('http://localhost:5210/api/Transaction/summary', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch transaction summary');
        }
        
        const data = await response.json();
        
        setIncomingStock(data.totalIncoming);
        setOutgoingStock(data.totalOutgoing);
      } catch (err) {
        setSummaryError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching transaction summary:', err);
      } finally {
        setIsSummaryLoading(false);
      }
    };

    const fetchTransactions = async () => {
      try {
        setTransactionsLoading(true);
        const response = await fetch('http://localhost:5210/api/transaction', {
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error('Failed to load transactions');
        }
        
        const data = await response.json();
        
        const sortedTransactions = [...data].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        ).slice(0, 6);
        
        setTransactions(sortedTransactions);
        setTransactionsError(null);
      } catch (err) {
        setTransactionsError(`Error loading transactions: ${err instanceof Error ? err.message : 'Unknown error'}`);
        console.error('Transaction loading error:', err);
      } finally {
        setTransactionsLoading(false);
      }
    };

    fetchTotalStock();
    fetchTransactionSummary();
    fetchTransactions();
  }, []);

  return {
    totalStock,
    incomingStock,
    outgoingStock,
    isLoading,
    isSummaryLoading,
    error,
    summaryError,
    
    transactions,
    transactionsLoading,
    transactionsError,
    formatTransactionDate,
  };
};