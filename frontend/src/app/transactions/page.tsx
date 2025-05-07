"use client";

import { useState } from 'react';
import { useTransactions } from '@/features/transactions/hooks/useTransactions';
import { TransactionList } from '@/features/transactions/components/TransactionList';
import { useTranslation } from 'react-i18next';
import { FiFilter } from 'react-icons/fi';

export default function TransactionsPage() {
  const { t } = useTranslation();
  const { loading, error, filterTransactions } = useTransactions();
  const [selectedType, setSelectedType] = useState<'all' | 'incoming' | 'outgoing'>('all');

  const filteredTransactions = filterTransactions(selectedType);

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('transactions.title', 'Transactions')}</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {t('transactions.description', 'You can manage your stock movements here.')}
          </p>
        </div>

        <div className="p-6 mb-8 border border-gray-100 shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                <FiFilter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as 'all' | 'incoming' | 'outgoing')}
                className="block w-full sm:w-64 px-4 py-2.5 text-base text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500"
              >
                <option value="all">{t('transactions.all')}</option>
                <option value="incoming">{t('transactions.incoming')}</option>
                <option value="outgoing">{t('transactions.outgoing')}</option>
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