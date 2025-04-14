'use client'

import { useState, useEffect } from 'react'

export interface InventoryItem {
  id: string
  name: string
  sku: string
  category: string
  supplier: string
  quantity: number
  unit: string
  price: number
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
  lastUpdated: string
}

interface Filters {
  search: string
  category: string
  supplier: string
  status: string
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

// Örnek veri
const mockItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Laptop Dell XPS 13',
    sku: 'LAP-DEL-001',
    category: 'Elektronik',
    supplier: 'Dell',
    quantity: 15,
    unit: 'piece',
    price: 25000,
    status: 'in-stock',
    lastUpdated: '2024-02-20'
  },
  {
    id: '2',
    name: 'iPhone 15 Pro',
    sku: 'PHN-APP-001',
    category: 'Elektronik',
    supplier: 'Apple',
    quantity: 8,
    unit: 'piece',
    price: 45000,
    status: 'low-stock',
    lastUpdated: '2024-02-19'
  },
  {
    id: '3',
    name: 'Samsung 4K TV',
    sku: 'TV-SAM-001',
    category: 'Electronics',
    supplier: 'Samsung',
    quantity: 0,
    unit: 'piece',
    price: 35000,
    status: 'out-of-stock',
    lastUpdated: '2024-02-18'
  },
  {
    id: '4',
    name: 'Logitech MX Master 3',
    sku: 'MOU-LOG-001',
    category: 'Accessories',
    supplier: 'Logitech',
    quantity: 25,
    unit: 'piece',
    price: 2500,
    status: 'in-stock',
    lastUpdated: '2024-02-17'
  },
  {
    id: '5',
    name: 'Apple AirPods Pro',
    sku: 'AUD-APP-001',
    category: 'Accessories',
    supplier: 'Apple',
    quantity: 12,
    unit: 'piece',
    price: 7500,
    status: 'in-stock',
    lastUpdated: '2024-02-16'
  }
]

export function useInventory() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<Filters>({
    search: '',
    category: '',
    supplier: '',
    status: '',
    sortBy: 'name',
    sortOrder: 'asc'
  })

  // Verileri yükle
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Gerçek uygulamada API çağrısı yapılacak
        // const response = await fetch('/api/inventory')
        // const data = await response.json()
        
        // Şimdilik mock veri kullanıyoruz
        await new Promise(resolve => setTimeout(resolve, 1000)) // Yükleme simülasyonu
        setItems(mockItems)
        setError(null)
      } catch (err) {
        setError('Data loading error.')
        console.error('Data loading error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filtreleri güncelle
  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  // Ürün silme fonksiyonu
  const deleteItem = async (id: string) => {
    try {
      // Gerçek uygulamada API çağrısı yapılacak
      // await fetch(`/api/inventory/${id}`, { method: 'DELETE' })
      
      // Şimdilik mock silme işlemi
      setItems(prev => prev.filter(item => item.id !== id))
      return true
    } catch (err) {
      setError('Product deletion error.')
      console.error('Deletion error:', err)
      throw err
    }
  }

  // Filtrelenmiş ve sıralanmış ürünleri hesapla
  const filteredItems = items
    .filter(item => {
      const matchesSearch = !filters.search || 
        item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.sku.toLowerCase().includes(filters.search.toLowerCase())
      
      const matchesCategory = !filters.category || item.category === filters.category
      const matchesSupplier = !filters.supplier || item.supplier === filters.supplier
      const matchesStatus = !filters.status || item.status === filters.status

      return matchesSearch && matchesCategory && matchesSupplier && matchesStatus
    })
    .sort((a, b) => {
      const aValue = a[filters.sortBy as keyof InventoryItem]
      const bValue = b[filters.sortBy as keyof InventoryItem]

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return filters.sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return filters.sortOrder === 'asc' 
          ? aValue - bValue
          : bValue - aValue
      }

      return 0
    })

  return {
    items: filteredItems,
    loading,
    error,
    filters,
    updateFilters,
    deleteItem
  }
} 