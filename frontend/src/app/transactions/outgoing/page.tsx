"use client";

import { useState, useCallback } from 'react';
import { useTransactions } from '@/features/transactions/hooks/useTransactions';
import { TransactionList } from '@/features/transactions/components/TransactionList';
import { OutgoingTransactionForm } from '@/features/transactions/components/OutgoingTransactionForm';
import { Button } from '@/components/ui/button';
import { RefreshCw, PlusCircle, ListFilter } from 'lucide-react';

export default function OutgoingTransactionsPage() {
  const { loading, error, filterTransactions, fetchTransactions } = useTransactions();
  const outgoingTransactions = filterTransactions('outgoing');
  const [refreshKey, setRefreshKey] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const handleRefresh = useCallback(() => {
    fetchTransactions();
    setRefreshKey(prev => prev + 1);
  }, [fetchTransactions]);

  const handleTransactionSuccess = useCallback(() => {
    handleRefresh();
    setShowForm(false);
  }, [handleRefresh]);

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Outgoing Stock</h1>
            <p className="mt-2 text-sm text-gray-600">
              Tüm çıkan stok işlemlerinizi buradan yönetebilirsiniz.
            </p>
          </div>
          <div className="flex mt-4 space-x-2 sm:mt-0">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefresh}
              className="flex items-center gap-1"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            <Button 
              variant={showForm ? "secondary" : "default"} 
              size="sm"
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-1"
            >
              {showForm ? (
                <>
                  <ListFilter className="w-4 h-4" />
                  View Transactions
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  Record Outgoing Stock
                </>
              )}
            </Button>
          </div>
        </div>

        {showForm ? (
          <OutgoingTransactionForm onSuccess={handleTransactionSuccess} />
        ) : (
          <TransactionList
            key={refreshKey}
            transactions={outgoingTransactions}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </div>
  );
}