'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { Supplier, useSuppliers } from '@/features/suppliers/hooks/useSuppliers';

export default function EditSupplierPage() {
  const params = useParams();
  const router = useRouter();
  const { suppliers, updateSupplier } = useSuppliers();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>>({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    taxNumber: '',
    status: 'active'
  });
  
  // Find supplier by ID - outside of useEffect to avoid causing loops
  const supplierId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const supplier = suppliers.find(s => s.id === supplierId);

  // Load form data from supplier when supplier changes
  useEffect(() => {
    if (supplier) {
      const { name, contactPerson, email, phone, address, taxNumber, status } = supplier;
      setFormData({ name, contactPerson, email, phone, address, taxNumber, status });
      setError(null);
      setLoading(false);
    } else if (suppliers.length > 0) {
      // If we have suppliers data but didn't find this ID
      setError('Supplier not found');
      setLoading(false);
    }
    // Only run this when the supplier or suppliers array changes
  }, [supplier, suppliers.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await updateSupplier(supplierId, formData);
      router.push(`/suppliers/${supplierId}`);
    } catch (err) {
      setError('Failed to update supplier.');
      console.error('Update error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Show error if supplier not found
  if (!supplier && !loading) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => router.push('/suppliers')}
              className="p-2 mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Supplier</h1>
          </div>
          
          <div className="p-6 bg-red-100 border border-red-400 rounded-md dark:bg-red-900/30 dark:border-red-800">
            <h2 className="text-lg font-medium text-red-700 dark:text-red-400">Supplier not found</h2>
            <p className="mt-2 text-red-600 dark:text-red-300">
              The supplier you are trying to edit could not be found.
            </p>
            <button
              onClick={() => router.push('/suppliers')}
              className="px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 rounded-md"
            >
              Back to Suppliers
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => router.push(`/suppliers/${supplierId}`)}
            className="p-2 mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Supplier</h1>
        </div>

        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 border border-red-400 rounded dark:bg-red-900/30 dark:text-red-400 dark:border-red-800" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Supplier Name */}
            <div>
              <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Supplier Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Tax Number */}
            <div>
              <label htmlFor="taxNumber" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Tax Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="taxNumber"
                name="taxNumber"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={formData.taxNumber}
                onChange={handleChange}
              />
            </div>

            {/* Contact Person */}
            <div>
              <label htmlFor="contactPerson" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Contact Person <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={formData.contactPerson}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Address - Spans 2 columns */}
            <div className="md:col-span-2">
              <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                rows={3}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={() => router.push(`/suppliers/${supplierId}`)}
              className="px-4 py-2 mr-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <svg className="w-4 h-4 mr-2 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="w-4 h-4 mr-2" />
                  Save
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}