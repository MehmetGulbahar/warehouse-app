"use client";

import { useDashboard } from '@/features/dashboard/hooks/useDashboard';
import { StockChart } from '@/features/dashboard/components/StockChart';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  
  const {
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
  } = useDashboard();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('common.dashboard')}</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Stock */}
        <div className="card">
          <h3 className="mb-2 text-lg font-medium">{t('dashboard.totalStock')}</h3>
          {isLoading ? (
            <p className="text-3xl font-bold text-primary">{t('common.loading')}...</p>
          ) : error ? (
            <p className="text-sm text-danger">{t('common.error')}: {error}</p>
          ) : (
            <p className="text-3xl font-bold text-primary">{totalStock?.toLocaleString() || '0'}</p>
          )}
        </div>

        {/* Incoming Stock */}
        <div className="card">
          <h3 className="mb-2 text-lg font-medium">{t('transactions.incoming')}</h3>
          {isSummaryLoading ? (
            <p className="text-3xl font-bold text-success">{t('common.loading')}...</p>
          ) : summaryError ? (
            <p className="text-sm text-danger">{t('common.error')}: {summaryError}</p>
          ) : (
            <p className="text-3xl font-bold text-success">{incomingStock?.toLocaleString() || '0'}</p>
          )}
        </div>

        {/* Outgoing Stock */}
        <div className="card">
          <h3 className="mb-2 text-lg font-medium">{t('transactions.outgoing')}</h3>
          {isSummaryLoading ? (
            <p className="text-3xl font-bold text-warning">{t('common.loading')}...</p>
          ) : summaryError ? (
            <p className="text-sm text-danger">{t('common.error')}: {summaryError}</p>
          ) : (
            <p className="text-3xl font-bold text-warning">{outgoingStock?.toLocaleString() || '0'}</p>
          )}
        </div>

        {/* Critical Stock */}
        <div className="card">
          <h3 className="mb-2 text-lg font-medium">{t('dashboard.stockAlerts')}</h3>
          <p className="text-3xl font-bold text-danger">12</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Transactions */}
        <div className="card">
          <h3 className="mb-4 text-lg font-medium">{t('dashboard.recentTransactions')}</h3>
          {transactionsLoading ? (
            <div className="flex flex-col items-center justify-center w-full p-8 text-gray-500">
              <div className="w-8 h-8 mb-4 border-t-2 border-b-2 border-gray-300 rounded-full animate-spin"></div>
              <p>{t('common.loading')}...</p>
            </div>
          ) : transactionsError ? (
            <div className="p-4 text-sm text-white bg-red-500 rounded-md">
              {transactionsError}
            </div>
          ) : transactions.length === 0 ? (
            <p className="text-gray-500">{t('transactions.emptyMessage')}</p>
          ) : (
            <div className="space-y-3">
              {transactions.map(transaction => (
                <div 
                  key={transaction.id} 
                  className="flex items-center p-3 border border-gray-100 rounded-lg dark:border-gray-700"
                >
                  <div className={`flex items-center justify-center w-10 h-10 mr-4 rounded-full ${
                    transaction.type === 'incoming' 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                    {transaction.type === 'incoming' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{transaction.productName || `${t('transactions.productName')} #${transaction.id.substring(0, 8)}`}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className={transaction.type === 'incoming' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}>
                        {transaction.type === 'incoming' ? t('transactions.incoming') : t('transactions.outgoing')}
                      </span>
                      <span className="mx-1">•</span>
                      {transaction.quantity} {t('transactions.quantity')}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                      {formatTransactionDate(transaction.date)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stock Movements */}
        <div className="card">
          <h3 className="mb-4 text-lg font-medium">{t('dashboard.stockAlerts')}</h3>
          <div>
            <StockChart isLoading={isLoading || isSummaryLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
