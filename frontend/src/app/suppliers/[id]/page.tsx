'use client';

import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useSuppliers, Supplier } from '@/features/suppliers/hooks/useSuppliers';
import React from 'react';

type PageParams = {
  id: string;
};

export default function SupplierDetailPage({ params }: { params: Promise<PageParams> }) {
  const router = useRouter();
  const { suppliers } = useSuppliers();
  const unwrappedParams = React.use(params);
  const supplierId = unwrappedParams.id;
  
  const supplier = suppliers.find((s) => s.id === supplierId);

  const handleBack = () => {
    router.push('/suppliers');
  };

  const handleEdit = (supplier: Supplier) => {
    router.push(`/suppliers/${supplier.id}/edit`);
  };

  const handleDelete = (supplier: Supplier) => {
    // TODO: Implement delete functionality
    console.log('Delete supplier:', supplier);
  };

  if (!supplier) {
    return (
      <div className="p-4">
        <div className="text-red-600">Supplier not found</div>
        <button
          onClick={handleBack}
          className="px-4 py-2 mt-4 bg-gray-200 rounded hover:bg-gray-300"
        >
          Back to Suppliers
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <button
          onClick={handleBack}
          className="p-2 mr-4 rounded-full hover:bg-gray-100"
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{supplier.name}</h1>
        <div className="flex ml-auto space-x-2">
          <button
            onClick={() => handleEdit(supplier)}
            className="p-2 text-blue-600 rounded-full hover:bg-blue-50"
          >
            <FiEdit className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDelete(supplier)}
            className="p-2 text-red-600 rounded-full hover:bg-red-50"
          >
            <FiTrash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6 rounded-lg shadow dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-lg font-semibold">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Contact Person</label>
                <p className="font-medium">{supplier.contactPerson}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="font-medium">{supplier.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Phone</label>
                <p className="font-medium">{supplier.phone}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold">Company Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Tax Number</label>
                <p className="font-medium">{supplier.taxNumber}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Status</label>
                <p className="font-medium">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      supplier.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {supplier.status}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 ">
            <h2 className="mb-4 text-sm text-gray-500">Address</h2>
            <p className="font-medium text-black text-gray-700 dark:text-white">{supplier.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 