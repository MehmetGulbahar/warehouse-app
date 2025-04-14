'use client';

import { useRouter } from 'next/navigation';
import { SupplierForm } from '../../../features/suppliers/components/SupplierForm';
import { Supplier } from '../../../features/suppliers/hooks/useSuppliers';

export default function NewSupplierPage() {
  const router = useRouter();

  const handleSubmit = async (formData: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>) => {
    // TODO: API'ye gönder
    console.log('Form data:', formData);
    router.push('/suppliers');
  };

  return (
    <div className="px-4 py-8 min-h-screen sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">New Supplier</h1>
          <p className="mt-2 text-sm text-gray-600">
            Fill out the form below to add a new supplier.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <SupplierForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
} 