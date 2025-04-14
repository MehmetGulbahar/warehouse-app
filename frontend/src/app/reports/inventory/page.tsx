'use client';

import { useReports } from '@/features/reports/hooks/useReports';
import { ReportCard } from '@/features/reports/components/ReportCard';
import { ReportFilters } from '@/features/reports/components/ReportFilters';

export default function InventoryReportsPage() {
  const { filters, updateFilters, reportData, loading, error } = useReports();

  // Filter reports for inventory only
  const inventoryReports = reportData.filter(report => 
    report.title.includes('Stok') || report.title.includes('Envanter')
  );

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
    <div className="px-4 py-8 min-h-screen bg-gray-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Stok Raporları</h1>
          <p className="mt-2 text-sm text-gray-600">
            Stok durumunuzu ve değişimlerini buradan takip edebilirsiniz.
          </p>
        </div>

        <ReportFilters 
          filters={{ ...filters, type: 'inventory' }} 
          onFilterChange={updateFilters} 
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {inventoryReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>
    </div>
  );
} 