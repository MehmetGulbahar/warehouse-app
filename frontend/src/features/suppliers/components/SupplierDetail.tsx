import { Supplier } from '../hooks/useSuppliers';
import { FiEdit2, FiTrash2, FiArrowLeft } from 'react-icons/fi';

interface SupplierDetailProps {
  supplier: Supplier;
  onBack: () => void;
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplier: Supplier) => void;
}

export const SupplierDetail = ({
  supplier,
  onBack,
  onEdit,
  onDelete,
}: SupplierDetailProps) => {
  return (
    <div className="border border-gray-100 shadow-sm  dark:bg-gray-800 rounded-xl dark:border-gray-700">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onEdit(supplier)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 transition-all duration-200 rounded-lg dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiEdit2 className="w-4 h-4 mr-2" />
              Edit
            </button>
            <button
              onClick={() => onDelete(supplier)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 transition-all duration-200 rounded-lg dark:text-red-400 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <FiTrash2 className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Supplier Information</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Supplier Name</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{supplier.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Tax Number</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{supplier.taxNumber}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Durum</dt>
                <dd className="mt-1">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      supplier.status === 'active'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                    }`}
                  >
                    {supplier.status === 'active' ? 'Aktif' : 'Pasif'}
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Contact Information</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact Person</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{supplier.contactPerson}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{supplier.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{supplier.phone}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Adres</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{supplier.address}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="pt-6 mt-8 border-t border-gray-100 dark:border-gray-700">
          <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">System Information</h3>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created Date</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {new Date(supplier.createdAt).toLocaleDateString('tr-TR')}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Update</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {new Date(supplier.updatedAt).toLocaleDateString('tr-TR')}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}; 