'use client';

import { useReports } from '@/features/reports/hooks/useReports';
import { ReportCard } from '@/features/reports/components/ReportCard';
import { ReportFilters } from '@/features/reports/components/ReportFilters';
import { useTranslation } from 'react-i18next';

export default function ReportsPage() {
  const { t } = useTranslation();
  const { filters, updateFilters, reportData, loading, error } = useReports();

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">{t('reports.title')}</h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">{t('reports.description')}</p>
        </div>
        <ReportFilters filters={filters} onFilterChange={updateFilters} />
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
        <h2 className="mb-4 text-xl font-semibold">{t('reports.insights')}</h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg dark:bg-blue-900/30 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-400">
              <span className="font-medium">{t('reports.trendAnalysis')}:</span> {t('reports.stockTrend')}
            </p>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg dark:bg-amber-900/30 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-400">
              <span className="font-medium">{t('reports.recommendation')}:</span> {t('reports.stockRecommendation')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}