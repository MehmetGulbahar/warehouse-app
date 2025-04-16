'use client';

import { useSuppliers, Supplier } from '@/features/suppliers/hooks/useSuppliers';
import { SupplierList } from '@/features/suppliers/components/SupplierList';
import { useRouter } from 'next/navigation';

export default function SuppliersPage() {
  const { filters, updateFilters, suppliers, loading, error } = useSuppliers();
  const router = useRouter();

  const handleSupplierClick = (supplier: Supplier) => {
    router.push(`/suppliers/${supplier.id}`);
  };

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
    <div className="px-4 py-8 min-h-screen bg-gray-50 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Suppliers</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Supplier information can be managed here.
          </p>
        </div>

        <SupplierList
          suppliers={suppliers}
          filters={filters}
          onFilterChange={updateFilters}
          onSupplierClick={handleSupplierClick}
        />
      </div>
    </div>
  );
} 