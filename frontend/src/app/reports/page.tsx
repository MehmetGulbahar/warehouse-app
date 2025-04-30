'use client';

import { useReports } from '@/features/reports/hooks/useReports';
import { ReportCard } from '@/features/reports/components/ReportCard';
import { ReportFilters } from '@/features/reports/components/ReportFilters';

export default function ReportsPage() {
  const { filters, updateFilters, reportData, loading, error } = useReports();

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <ReportFilters filters={filters} onChange={updateFilters} />
      </div>

      {error && (
        <div className="p-4 mb-4 text-sm text-white bg-red-500 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {reportData.map(report => (
          <ReportCard key={report.id} report={report} isLoading={loading} />
        ))}
      </div>

      <div className="p-6 bg-white border border-gray-100 shadow dark:bg-gray-800 dark:border-gray-700 rounded-xl">
        <h2 className="mb-4 text-xl font-semibold">Analytics Insights</h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg dark:bg-blue-900/30 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-400">
              <span className="font-medium">Trend Analysis:</span> Stock levels have increased by 12.5% compared to last month, indicating growing inventory.
            </p>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg dark:bg-amber-900/30 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-400">
              <span className="font-medium">Recommendation:</span> Consider evaluating stock turnover rates to optimize inventory levels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}