'use client'

import { useState, useEffect } from 'react'
import { FiFilter, FiX, FiArrowUp, FiArrowDown } from 'react-icons/fi'

interface FiltersProps {
  filters: {
    search: string
    category: string
    supplier: string
    status: string
    sortBy: string
    sortOrder: 'asc' | 'desc'
  }
  categories: string[]
  suppliers: string[]
  onUpdateFilters: (filters: { search?: string; category?: string; supplier?: string; status?: string; sortBy?: string; sortOrder?: 'asc' | 'desc' }) => void
}

export default function InventoryFilters({ filters, categories, suppliers, onUpdateFilters }: FiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  // Aktif filtre sayısını hesapla
  useEffect(() => {
    const count = [
      filters.category,
      filters.supplier,
      filters.status
    ].filter(Boolean).length
    setActiveFiltersCount(count)
  }, [filters.category, filters.supplier, filters.status])

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'in-stock', label: 'In Stock' },
    { value: 'low-stock', label: 'Low Stock' },
    { value: 'out-of-stock', label: 'Out of Stock' }
  ]

  const sortOptions = [
    { value: 'name', label: 'Product Name' },
    { value: 'sku', label: 'SKU' },
    { value: 'category', label: 'Category' },
    { value: 'supplier', label: 'Supplier' },
    { value: 'quantity', label: 'Quantity' },
    { value: 'price', label: 'Price' },
    { value: 'status', label: 'Status' }
  ]

  // Filtreleri temizle
  const clearFilters = () => {
    onUpdateFilters({
      category: '',
      supplier: '',
      status: ''
    })
  }

  return (
    <div className="mb-8">
      {/* Arama ve Filtre Butonları */}
      <div className="flex flex-wrap gap-3 items-center p-2 mb-4 bg-white rounded-xl border border-gray-100 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="relative flex-1 min-w-[240px]">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onUpdateFilters({ search: e.target.value })}
            placeholder="Search by product name or SKU..."
            className="w-full px-10 py-2.5 bg-gray-50 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          />
          {filters.search && (
            <button
              onClick={() => onUpdateFilters({ search: '' })}
              className="absolute right-3 top-1/2 text-gray-400 -translate-y-1/2 hover:text-gray-600"
              aria-label="Clear search"
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-shrink-0 gap-2 items-center">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className={`px-4 py-2.5 flex items-center justify-center gap-2 rounded-lg transition-all duration-200 ${
              isFiltersOpen
                ? 'text-blue-700 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400'
                : 'text-gray-700 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <FiFilter className="w-4 h-4" />
            <span className="font-medium">Filters</span>

            {activeFiltersCount > 0 && (
              <span className="flex justify-center items-center w-5 h-5 text-xs font-medium text-white bg-blue-500 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <select
            value={filters.sortBy}
            onChange={(e) => onUpdateFilters({ sortBy: e.target.value })}
            className="py-2.5 px-4 text-gray-700 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-200 dark:bg-gray-700/50 dark:text-gray-300 dark:focus:ring-blue-800 transition-all duration-200"
          >
            <option value="" disabled>Sorting</option>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => onUpdateFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}
            className="p-2.5 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
            title={filters.sortOrder === 'asc' ? 'Ascending Sorting' : 'Descending Sorting'}
          >
            {filters.sortOrder === 'asc' ? <FiArrowUp className="w-4 h-4" /> : <FiArrowDown className="w-4 h-4" />}
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-3 py-2.5 text-sm text-red-600 transition-colors duration-200 bg-red-50 rounded-lg hover:bg-red-100 dark:bg-red-900/10 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <FiX className="w-3.5 h-3.5" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Filtreler Paneli */}
      {isFiltersOpen && (
        <div className="grid grid-cols-1 gap-6 p-6 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 md:grid-cols-2 lg:grid-cols-4 dark:bg-gray-800 dark:border-gray-700">
          {/* Kategori Filtresi */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => onUpdateFilters({ category: e.target.value })}
              className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-800 transition-all duration-200 py-2.5"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Tedarikçi Filtresi */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Supplier
            </label>
            <select
              value={filters.supplier}
              onChange={(e) => onUpdateFilters({ supplier: e.target.value })}
              className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-800 transition-all duration-200 py-2.5"
            >
              <option value="">All Suppliers</option>
              {suppliers.map((supplier) => (
                <option key={supplier} value={supplier}>
                  {supplier}
                </option>
              ))}
            </select>
          </div>

          {/* Durum Filtresi */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => onUpdateFilters({ status: e.target.value })}
              className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-800 transition-all duration-200 py-2.5"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sıralama Seçenekleri */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Sorting
            </label>
            <div className="flex gap-2">
              <select
                value={filters.sortBy}
                onChange={(e) => onUpdateFilters({ sortBy: e.target.value })}
                className="flex-1 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-800 transition-all duration-200 py-2.5"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() =>
                  onUpdateFilters({
                    sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc'
                  })
                }
                className="px-4 py-2.5 rounded-lg border border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 transition-all duration-200 flex items-center justify-center"
                title={filters.sortOrder === 'asc' ? 'Ascending Sorting' : 'Descending Sorting'}
              >
                {filters.sortOrder === 'asc' ? <FiArrowUp className="w-4 h-4" /> : <FiArrowDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Filtreleri Temizle */}
          {activeFiltersCount > 0 && (
            <div className="flex col-span-full justify-end pt-2 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={clearFilters}
                className="flex gap-2 items-center text-sm text-gray-500 transition-colors duration-200 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <FiX className="w-4 h-4" />
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
