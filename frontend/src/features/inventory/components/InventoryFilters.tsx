'use client'

import { useState, useEffect } from 'react'
import { FiFilter, FiX, FiArrowUp, FiArrowDown } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  useEffect(() => {
    const count = [
      filters.category,
      filters.supplier,
      filters.status
    ].filter(Boolean).length
    setActiveFiltersCount(count)
  }, [filters.category, filters.supplier, filters.status])

  const statusOptions = [
    { value: '', label: t('common.all') + ' ' + t('common.status') },
    { value: 'in-stock', label: t('inventory.inStock') },
    { value: 'low-stock', label: t('inventory.lowStockAlert') },
    { value: 'out-of-stock', label: t('inventory.outOfStock') }
  ]

  const sortOptions = [
    { value: 'name', label: t('inventory.name') },
    { value: 'sku', label: t('inventory.sku') },
    { value: 'category', label: t('inventory.category') },
    { value: 'supplier', label: t('suppliers.title') },
    { value: 'quantity', label: t('inventory.quantity') },
    { value: 'price', label: t('inventory.price') },
    { value: 'status', label: t('common.status') }
  ]

  const clearFilters = () => {
    onUpdateFilters({
      category: '',
      supplier: '',
      status: ''
    })
  }

  return (
    <div className="mb-8">
      {/* Search and Filter Buttons */}
      <div className="flex flex-wrap items-center gap-3 p-2 mb-4 bg-white border border-gray-100 shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700">
        <div className="relative flex-1 min-w-[240px]">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onUpdateFilters({ search: e.target.value })}
            placeholder={t('common.search')}
            className="w-full px-10 py-2.5 bg-gray-50 focus:ring-2 focus:ring-blue-200 dark:bg-gray-800 transition-all duration-200"
          />
          {filters.search && (
            <button
              onClick={() => onUpdateFilters({ search: '' })}
              className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-gray-600 "
              aria-label={t('common.clear')}
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center flex-shrink-0 gap-2">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className={`px-4 py-2.5 flex items-center justify-center gap-2 rounded-lg transition-all duration-200 dark:bg-gray-800 ${
              isFiltersOpen
                ? 'text-blue-700 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400'
                : 'text-gray-700 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <FiFilter className="w-4 h-4 " />
            <span className="font-medium">{t('reports.filters')}</span>

            {activeFiltersCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-500 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <select
            value={filters.sortBy}
            onChange={(e) => onUpdateFilters({ sortBy: e.target.value })}
            className="py-2.5 px-4 text-gray-700 bg-gray-50 border-none rounded-lg focus:ring-2 dark:bg-gray-800 focus:ring-blue-200 dark:bg-gray-700/50 dark:text-gray-300 dark:focus:ring-blue-800 transition-all duration-200"
          >
            <option value="" disabled>{t('common.sort')}</option>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => onUpdateFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}
            className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 hover:bg-gray-100 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
            title={filters.sortOrder === 'asc' ? t('common.ascending') : t('common.descending')}
          >
            {filters.sortOrder === 'asc' ? <FiArrowUp className="w-4 h-4" /> : <FiArrowDown className="w-4 h-4" />}
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-3 py-2.5 text-sm text-red-600 transition-colors duration-200 bg-red-50 rounded-lg hover:bg-red-100 dark:bg-red-900/10 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <FiX className="w-3.5 h-3.5" />
              {t('common.clear')}
            </button>
          )}
        </div>
      </div>

      {/* Filters Panel */}
      {isFiltersOpen && (
        <div className="grid grid-cols-1 gap-6 p-6 transition-all duration-300 border border-gray-200 shadow-sm rounded-xl md:grid-cols-2 lg:grid-cols-4 dark:bg-gray-800 dark:border-gray-700">
          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('inventory.category')}
            </label>
            <select
              value={filters.category}
              onChange={(e) => onUpdateFilters({ category: e.target.value })}
              className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-800 transition-all duration-200 py-2.5"
            >
              <option value="">{t('common.all')} {t('inventory.category')}</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Supplier Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('suppliers.title')}
            </label>
            <select
              value={filters.supplier}
              onChange={(e) => onUpdateFilters({ supplier: e.target.value })}
              className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-800 transition-all duration-200 py-2.5"
            >
              <option value="">{t('common.all')} {t('suppliers.title')}</option>
              {suppliers.map((supplier) => (
                <option key={supplier} value={supplier}>
                  {supplier}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('common.status')}
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

          {/* Sort Options */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('common.sort')}
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
                title={filters.sortOrder === 'asc' ? t('common.ascending') : t('common.descending')}
              >
                {filters.sortOrder === 'asc' ? <FiArrowUp className="w-4 h-4" /> : <FiArrowDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex justify-end pt-2 border-t border-gray-100 col-span-full dark:border-gray-700">
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 text-sm text-gray-500 transition-colors duration-200 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <FiX className="w-4 h-4" />
                {t('common.clear')} {t('reports.filters')}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
