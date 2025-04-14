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
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft className="mr-2 w-5 h-5" />
            Back
          </button>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onEdit(supplier)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg transition-all duration-200 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiEdit2 className="mr-2 w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => onDelete(supplier)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg transition-all duration-200 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <FiTrash2 className="mr-2 w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-900">Supplier Information</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Supplier Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{supplier.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Tax Number</dt>
                <dd className="mt-1 text-sm text-gray-900">{supplier.taxNumber}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Durum</dt>
                <dd className="mt-1">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      supplier.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {supplier.status === 'active' ? 'Aktif' : 'Pasif'}
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-900">Contact Information</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Contact Person</dt>
                <dd className="mt-1 text-sm text-gray-900">{supplier.contactPerson}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{supplier.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900">{supplier.phone}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Adres </dt>
                <dd className="mt-1 text-sm text-gray-900">{supplier.address}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="pt-6 mt-8 border-t border-gray-100">
          <h3 className="mb-4 text-lg font-medium text-gray-900">System Information</h3>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Created Date</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(supplier.createdAt).toLocaleDateString('tr-TR')}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Last Update</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(supplier.updatedAt).toLocaleDateString('tr-TR')}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}; 