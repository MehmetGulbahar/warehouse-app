'use client';

import { useReports } from '@/features/reports/hooks/useReports';
import { ReportCard } from '@/features/reports/components/ReportCard';
import { ReportFilters } from '@/features/reports/components/ReportFilters';

export default function TransactionReportsPage() {
  const { filters, updateFilters, reportData, loading, error } = useReports();

  const transactionReports = reportData.filter(report => 
    report.title.includes('Product') || report.title.includes('Transaction')
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-800 border border-red-200 rounded-lg bg-red-50">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Transaction Reports</h1>
          <p className="mt-2 text-sm text-gray-600">
            You can track your transaction history and performance here.
          </p>
        </div>

        <ReportFilters 
          filters={{ ...filters, type: 'transactions' }} 
          onFilterChange={updateFilters} 
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {transactionReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>
    </div>
  );
} 