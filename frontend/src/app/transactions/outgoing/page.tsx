"use client";

import { useTransactions } from '@/features/transactions/hooks/useTransactions';
import { TransactionList } from '@/features/transactions/components/TransactionList';

export default function OutgoingTransactionsPage() {
  const {loading, error, filterTransactions } = useTransactions();
  const outgoingTransactions = filterTransactions('outgoing');

  return (
    <div className="px-4 py-8 min-h-screen bg-gray-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Çıkan Stoklar</h1>
          <p className="mt-2 text-sm text-gray-600">
            Tüm çıkan stok işlemlerinizi buradan yönetebilirsiniz.
          </p>
        </div>

        <TransactionList
          transactions={outgoingTransactions}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
} 