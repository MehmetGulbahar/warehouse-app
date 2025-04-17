import { useState } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiPhone, FiMapPin, FiHash, FiCheckCircle } from 'react-icons/fi';
import { Supplier, useSuppliers } from '../hooks/useSuppliers';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SupplierFormProps {
  initialData?: Partial<Supplier>;
}

export const SupplierForm = ({ initialData }: SupplierFormProps) => {
  const router = useRouter();
  const { createSupplier, updateSupplier, loading, error: apiError } = useSuppliers();

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    contactPerson: initialData?.contactPerson || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    address: initialData?.address || '',
    taxNumber: initialData?.taxNumber || '',
    status: initialData?.status || 'active',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name) newErrors.name = 'Supplier name is required';
    if (!formData.contactPerson) newErrors.contactPerson = 'Contact person is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.taxNumber) newErrors.taxNumber = 'Tax number is required';
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (initialData?.id) {
        await updateSupplier(initialData.id, formData);
      } else {
        await createSupplier(formData);
      }
      router.push('/suppliers');
    } catch (err) {
      console.error('Error saving supplier:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center mb-6">
          <Link
            href="/suppliers"
            className="p-2 mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {initialData ? 'Edit Supplier' : 'Add New Supplier'}
          </h1>
        </div>

        {apiError && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded border border-red-400" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {apiError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Supplier Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <FiUser className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block py-2 pr-3 pl-10 w-full text-base text-gray-900 bg-white rounded-md border border-gray-300 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter supplier name"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="taxNumber" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Tax Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <FiHash className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="text"
                  id="taxNumber"
                  name="taxNumber"
                  required
                  value={formData.taxNumber}
                  onChange={handleChange}
                  className="block py-2 pr-3 pl-10 w-full text-base text-gray-900 bg-white rounded-md border border-gray-300 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter tax number"
                />
              </div>
              {errors.taxNumber && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.taxNumber}</p>}
            </div>

            <div>
              <label htmlFor="contactPerson" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Contact Person <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <FiUser className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  required
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="block py-2 pr-3 pl-10 w-full text-base text-gray-900 bg-white rounded-md border border-gray-300 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter contact person name"
                />
              </div>
              {errors.contactPerson && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.contactPerson}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <FiMail className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block py-2 pr-3 pl-10 w-full text-base text-gray-900 bg-white rounded-md border border-gray-300 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email address"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <FiPhone className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="block py-2 pr-3 pl-10 w-full text-base text-gray-900 bg-white rounded-md border border-gray-300 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter phone number"
                />
              </div>
              {errors.phone && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="status" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Status <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <FiCheckCircle className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
                <select
                  id="status"
                  name="status"
                  required
                  value={formData.status}
                  onChange={handleChange}
                  className="block py-2 pr-3 pl-10 w-full text-base text-gray-900 bg-white rounded-md border border-gray-300 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Address
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3">
                <FiMapPin className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>
              <textarea
                id="address"
                name="address"
                rows={4}
                value={formData.address}
                onChange={handleChange}
                className="block py-2 pr-3 pl-10 w-full text-base text-gray-900 bg-white rounded-md border border-gray-300 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter full address"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Link
              href="/suppliers"
              className="px-4 py-2 mr-3 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md border border-transparent shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="mr-2 -ml-1 w-4 h-4 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                initialData ? 'Update Supplier' : 'Save Supplier'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 