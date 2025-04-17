'use client';

import { SupplierForm } from '../../../features/suppliers/components/SupplierForm';

export default function NewSupplierPage() {
  return (
    <div className="px-4 py-8 min-h-screen sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">New Supplier</h1>
          <p className="mt-2 text-sm text-gray-600">
            Fill out the form below to add a new supplier.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm dark:bg-gray-800">
          <SupplierForm />
        </div>
      </div>
    </div>
  );
} 