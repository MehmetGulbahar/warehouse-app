'use client';

import React from 'react';
import { useSuppliers } from '@/features/suppliers/hooks/useSuppliers';
import { useSupplierDetail } from '@/features/suppliers/hooks/useSupplierDetail';
import { SupplierDetail } from '@/features/suppliers/components/SupplierDetail';
import DeleteConfirmationModal from '@/components/ui/DeleteConfirmationModal';

type PageParams = {
  id: string;
};

export default function SupplierDetailPage({ params }: { params: Promise<PageParams> }) {
  const { suppliers } = useSuppliers();
  const unwrappedParams = React.use(params);
  const supplierId = unwrappedParams.id;
  
  const supplier = suppliers.find((s) => s.id === supplierId);
  
  const {
    isDeleting,
    deleteError,
    showDeleteModal,
    handleBack,
    handleEdit,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  } = useSupplierDetail(supplier);

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
      {deleteError && (
        <div className="p-4 mb-4 text-sm text-white bg-red-500 rounded-md">
          {deleteError}
        </div>
      )}
      
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        title="Delete Supplier"
        message="Are you sure you want to delete the supplier:"
        itemName={supplier.name}
        isDeleting={isDeleting}
        onConfirm={() => confirmDelete(supplier.id)}
        onCancel={closeDeleteModal}
      />
      
      <SupplierDetail
        supplier={supplier}
        onBack={handleBack}
        onEdit={() => handleEdit(supplier)}
        onDelete={() => openDeleteModal()}
      />
    </div>
  );
}