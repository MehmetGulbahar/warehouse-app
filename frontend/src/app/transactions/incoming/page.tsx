"use client";

import { useTransactions } from '@/features/transactions/hooks/useTransactions';
import { TransactionList } from '@/features/transactions/components/TransactionList';

export default function IncomingTransactionsPage() {
  const {loading, error, filterTransactions } = useTransactions();

  const incomingTransactions = filterTransactions('incoming');

  return (
    <div className="px-4 py-8 min-h-screen bg-gray-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Gelen Stoklar</h1>
          <p className="mt-2 text-sm text-gray-600">
            Tüm gelen stok işlemlerinizi buradan yönetebilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
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