'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { Supplier } from '@/features/suppliers/hooks/useSuppliers';

export default function EditSupplierPage() {
  const params = useParams();
  const router = useRouter();
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

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        setLoading(true);
       
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock supplier data
        const mockSupplier: Supplier = {
          id: params.id as string,
          name: 'ABC Electronics',
          contactPerson: 'John Doe',
          email: 'john@abcelectronics.com',
          phone: '+90 533 123 45 67',
          address: 'Levent, İstanbul',
          taxNumber: '1234567890',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        // Extract only the fields we need for the form
        const { name, contactPerson, email, phone, address, taxNumber, status } = mockSupplier;
        setFormData({ name, contactPerson, email, phone, address, taxNumber, status });
        setError(null);
      } catch (err) {
        setError('Failed to load supplier data.');
        console.error('Data loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchSupplier();
    }
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Gerçek uygulamada API çağrısı yapılacak
      // const response = await fetch(`/api/suppliers/${params.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // if (!response.ok) throw new Error('Failed to update supplier');
      
      // Şimdilik başarılı kabul ediyoruz
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Başarılı güncelleme sonrası detay sayfasına yönlendir
      router.push(`/suppliers/${params.id}`);
    } catch (err) {
      setError('Failed to update supplier.');
      console.error('Update error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 rounded-full border-b-2 border-blue-500 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => router.push(`/suppliers/${params.id}`)}
            className="p-2 mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Supplier</h1>
        </div>

        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded border border-red-400" role="alert">
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
                className="block px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                className="block px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                className="block px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                className="block px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                className="block px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                className="block px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                className="block px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={() => router.push(`/suppliers/${params.id}`)}
              className="px-4 py-2 mr-3 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md border border-transparent shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <svg className="mr-2 -ml-1 w-4 h-4 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="mr-2 w-4 h-4" />
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