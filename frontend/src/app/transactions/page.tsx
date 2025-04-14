"use client";

import { useState } from 'react';
import { useTransactions } from '@/features/transactions/hooks/useTransactions';
import { TransactionList } from '@/features/transactions/components/TransactionList';
import { FiFilter } from 'react-icons/fi';

export default function TransactionsPage() {
  const { loading, error, filterTransactions } = useTransactions();
  const [selectedType, setSelectedType] = useState<'all' | 'incoming' | 'outgoing'>('all');

  const filteredTransactions = filterTransactions(selectedType);

  return (
    <div className="px-4 py-8 min-h-screen sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h1>
          <p className="mt-2 text-sm text-gray-600">
            You can manage your stock movements here.
          </p>
        </div>

        <div className="p-6 mb-8 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex justify-center items-center w-10 h-10 bg-blue-50 rounded-lg">
                <FiFilter className="w-5 h-5 text-blue-600" />
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as 'all' | 'incoming' | 'outgoing')}
                className="block w-full sm:w-64 px-4 py-2.5 text-base text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
              >
                <option value="all">All Transactions</option>
                <option value="incoming">Incoming Stock</option>
                <option value="outgoing">Outgoing Stock</option>
              </select>
            </div>
          </div>
        </div>

        <div className="w-full">
          <TransactionList
            transactions={filteredTransactions}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
} 