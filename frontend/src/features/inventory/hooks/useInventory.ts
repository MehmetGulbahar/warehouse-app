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
        const response = await fetch('http://localhost:5210/api/inventory', {
          credentials: 'include'
        })
        
        if (!response.ok) {
          throw new Error('Products loading error Please login')
        }
        
        const data = await response.json()
        setItems(data)
        setError(null)
      } catch (err) {
        setError('Products loading error Please login')
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
      const response = await fetch(`http://localhost:5210/api/inventory/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      
      if (!response.ok) {
        throw new Error('Product deletion error Please login')
      }
      
      setItems(prev => prev.filter(item => item.id !== id))
      return true
    } catch (err) {
      setError('Product deletion error Please login')
      console.error('Deletion error:', err)
      throw err
    }
  }

  // Ürün güncelleme fonksiyonu
  const updateItem = async (id: string, updatedItem: Partial<InventoryItem>) => {
    try {
      const response = await fetch(`http://localhost:5210/api/inventory/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(updatedItem)
      })
      
      if (!response.ok) {
        throw new Error('Product update error Please login')
      }
      
      const data = await response.json()
      setItems(prev => prev.map(item => item.id === id ? data : item))
      return data
    } catch (err) {
      setError('Product update error Please login')
      console.error('Update error:', err)
      throw err
    }
  }

  // Yeni ürün ekleme fonksiyonu
  const addItem = async (newItem: Omit<InventoryItem, 'id' | 'lastUpdated'>) => {
    try {
      const response = await fetch('http://localhost:5210/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(newItem)
      })
      
      if (!response.ok) {
        throw new Error('Product add error Please login')
      }
      
      const data = await response.json()
      setItems(prev => [...prev, data])
      return data
    } catch (err) {
      setError('Product add error Please login')
      console.error('Add error:', err)
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
    deleteItem,
    updateItem,
    addItem
  }
}