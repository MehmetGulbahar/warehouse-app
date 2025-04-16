import { useState, useMemo } from 'react';

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  taxNumber: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface SupplierFilters {
  search: string;
  status: 'all' | 'active' | 'inactive';
  sortBy: 'name' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

export const useSuppliers = () => {
  const [filters, setFilters] = useState<SupplierFilters>({
    search: '',
    status: 'all',
    sortBy: 'name',
    sortOrder: 'asc',
  });

  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const updateFilters = (newFilters: Partial<SupplierFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const mockSuppliers: Supplier[] = [
    {
      id: '1',
      name: 'ABC Tedarik Ltd.',
      contactPerson: 'Ahmet Yılmaz',
      email: 'ahmet@abctedarik.com',
      phone: '+90 555 123 4567',
      address: 'İstanbul, Türkiye',
      taxNumber: '1234567890',
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '2',
      name: 'XYZ Malzeme A.Ş.',
      contactPerson: 'Mehmet Demir',
      email: 'mehmet@xyzm.com',
      phone: '+90 555 987 6543',
      address: 'Ankara, Türkiye',
      taxNumber: '0987654321',
      status: 'active',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
    },
    {
      id: '3',
      name: 'Pasif Tedarik Ltd.',
      contactPerson: 'Ayşe Kaya',
      email: 'ayse@pasiftedarik.com',
      phone: '+90 555 111 2222',
      address: 'İzmir, Türkiye',
      taxNumber: '1122334455',
      status: 'inactive',
      createdAt: '2024-02-01',
      updatedAt: '2024-02-01',
    },
  ];

  const filteredSuppliers = useMemo(() => {
    let result = [...mockSuppliers];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(supplier => 
        supplier.name.toLowerCase().includes(searchLower) ||
        supplier.contactPerson.toLowerCase().includes(searchLower) ||
        supplier.email.toLowerCase().includes(searchLower)
      );
    }

    if (filters.status !== 'all') {
      result = result.filter(supplier => supplier.status === filters.status);
    }

    result.sort((a, b) => {
      const order = filters.sortOrder === 'asc' ? 1 : -1;
      if (filters.sortBy === 'name') {
        return a.name.localeCompare(b.name) * order;
      } else {
        return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * order;
      }
    });

    return result;
  }, [filters]);

  return {
    filters,
    updateFilters,
    suppliers: filteredSuppliers,
    loading,
    error,
  };
}; 
