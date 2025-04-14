import { useState } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiPhone, FiMapPin, FiHash, FiCheckCircle } from 'react-icons/fi';
import { Supplier } from '../hooks/useSuppliers';
import Link from 'next/link';

interface SupplierFormProps {
  onSubmit: (data: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: Partial<Supplier>;
}

export const SupplierForm = ({ onSubmit, initialData }: SupplierFormProps) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData as Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>);
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
    <form onSubmit={handleSubmit} className="p-10">
      <div className="mb-10">
        <Link
          href="/suppliers"
          className="inline-flex items-center text-gray-600 transition-colors duration-200 hover:text-gray-900"
        >
          <FiArrowLeft className="mr-2 w-5 h-5" />
          Back to Suppliers
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <div className="space-y-8">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
              Supplier Name
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <FiUser className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-3 text-base text-gray-900 bg-white border ${
                  errors.name ? 'border-red-300' : 'border-gray-200'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300`}
                placeholder="Enter supplier name"
              />
            </div>
            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="taxNumber" className="block mb-2 text-sm font-medium text-gray-700">
              Tax Number
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <FiHash className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="taxNumber"
                name="taxNumber"
                value={formData.taxNumber}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-3 text-base text-gray-900 bg-white border ${
                  errors.taxNumber ? 'border-red-300' : 'border-gray-200'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300`}
                placeholder="Enter tax number"
              />
            </div>
            {errors.taxNumber && <p className="mt-2 text-sm text-red-600">{errors.taxNumber}</p>}
          </div>

          <div>
            <label htmlFor="contactPerson" className="block mb-2 text-sm font-medium text-gray-700">
              Contact Person
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <FiUser className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-3 text-base text-gray-900 bg-white border ${
                  errors.contactPerson ? 'border-red-300' : 'border-gray-200'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300`}
                placeholder="Enter contact person name"
              />
            </div>
            {errors.contactPerson && <p className="mt-2 text-sm text-red-600">{errors.contactPerson}</p>}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <FiMail className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-3 text-base text-gray-900 bg-white border ${
                  errors.email ? 'border-red-300' : 'border-gray-200'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300`}
                placeholder="Enter email address"
              />
            </div>
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
              Phone
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <FiPhone className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-3 text-base text-gray-900 bg-white border ${
                  errors.phone ? 'border-red-300' : 'border-gray-200'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300`}
                placeholder="Enter phone number"
              />
            </div>
            {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-700">
              Status
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <FiCheckCircle className="w-5 h-5 text-gray-400" />
              </div>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="block py-3 pr-3 pl-10 w-full text-base text-gray-900 bg-white rounded-lg border border-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4 sm:col-span-2">
          <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-700">
            Address
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3">
              <FiMapPin className="w-5 h-5 text-gray-400" />
            </div>
            <textarea
              id="address"
              name="address"
              rows={4}
              value={formData.address}
              onChange={handleChange}
              className="block py-3 pr-3 pl-10 w-full text-base text-gray-900 bg-white rounded-lg border border-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300"
              placeholder="Enter full address"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-12 space-x-6">
        <Link
          href="/suppliers"
          className="inline-flex items-center px-6 py-3 text-base font-medium text-gray-700 bg-white rounded-lg border border-gray-200 transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg border border-transparent shadow-sm transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Supplier
        </button>
      </div>
    </form>
  );
}; 