'use client';

import { useReports } from '@/features/reports/hooks/useReports';
import { ReportCard } from '@/features/reports/components/ReportCard';
import { ReportFilters } from '@/features/reports/components/ReportFilters';

export default function ReportsPage() {
  const { filters, updateFilters, reportData, loading, error } = useReports();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 rounded-full border-b-2 border-blue-500 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-800 bg-red-50 rounded-lg border border-red-200">
        {error}
      </div>
    );
  }

  return (
    <div className="px-4 py-8 min-h-screen sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="mt-2 text-sm text-gray-600">
            You can view your stock and transaction reports here.
          </p>
        </div>

        <ReportFilters filters={filters} onFilterChange={updateFilters} />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reportData.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>
    </div>
  );
} 