import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Supplier, useSuppliers } from './useSuppliers';

export const useSupplierDetail = (initialSupplier?: Supplier) => {
  const router = useRouter();
  const { deleteSupplier } = useSuppliers();
  const [supplier] = useState<Supplier | undefined>(initialSupplier);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleBack = () => {
    router.push('/suppliers');
  };

  const handleEdit = (supplier: Supplier) => {
    router.push(`/suppliers/${supplier.id}/edit`);
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const confirmDelete = async (supplierId: string) => {
    try {
      setIsDeleting(true);
      setDeleteError(null);
      await deleteSupplier(supplierId);
      router.push('/suppliers');
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : 'Failed to delete supplier');
      console.error('Error deleting supplier:', error);
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    supplier,
    isDeleting,
    deleteError,
    showDeleteModal,
    handleBack,
    handleEdit,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  };
};