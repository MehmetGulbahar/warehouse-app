"use client";

import { useTransactions } from '@/features/transactions/hooks/useTransactions';
import { TransactionList } from '@/features/transactions/components/TransactionList';

export default function IncomingTransactionsPage() {
  const {loading, error, filterTransactions } = useTransactions();

  const incomingTransactions = filterTransactions('incoming');

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Incoming Stocks</h1>
          <p className="mt-2 text-sm text-gray-600">
            You can manage all your incoming stock transactions here.
          </p>
        </div>

        <div className="lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TransactionList
              transactions={incomingTransactions}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 