import { Supplier, SupplierFilters } from '@/features/suppliers/hooks/useSuppliers';
import { FiSearch } from 'react-icons/fi';
import Link from 'next/link';

interface SupplierListProps {
  suppliers: Supplier[];
  filters: SupplierFilters;
  onFilterChange: (filters: Partial<SupplierFilters>) => void;
  onSupplierClick: (supplier: Supplier) => void;
}

export const SupplierList = ({
  suppliers,
  filters,
  onFilterChange,
  onSupplierClick,
}: SupplierListProps) => {

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <FiSearch className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => onFilterChange({ search: e.target.value })}
                placeholder="Supplier search..."
                className="block w-full pl-10 pr-3 py-2.5 text-base text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={filters.status}
              onChange={(e) => onFilterChange({ status: e.target.value as 'all' | 'active' | 'inactive' })}
              className="block w-full sm:w-48 bg-white px-4 py-2.5 text-base text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <Link 
              href="/suppliers/new"
              className="inline-flex items-center justify-center px-4 py-2.5 min-w-[120px] text-base text-white bg-blue-600 rounded-lg border border-transparent shadow-sm transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 whitespace-nowrap"
            >
                  Add
            </Link>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-b-xl">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Supplier Name
              </th>
              <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Contact
              </th>
              <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {suppliers.map((supplier) => (
              <tr
                key={supplier.id}
                onClick={() => onSupplierClick(supplier)}
                className="text-center transition-colors duration-150 cursor-pointer hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                  <div className="text-sm text-gray-500">{supplier.taxNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{supplier.contactPerson}</div>
                  <div className="text-sm text-gray-500">{supplier.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      supplier.status === 'active'
                        ? ' text-green-800'
                        : ' text-red-800'
                    }`}
                  >
                    {supplier.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {new Date(supplier.createdAt).toLocaleDateString('tr-TR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 