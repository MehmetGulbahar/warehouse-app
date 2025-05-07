'use client'

import { useState } from 'react'
import { useInventory } from '../hooks/useInventory'
import { FiEdit2, FiTrash2, FiPackage, FiBox, FiTruck, FiDollarSign, FiAlertCircle } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import InventoryFilters from './InventoryFilters'

export default function InventoryList() {
  const router = useRouter()
  const { t } = useTranslation()
  const { items, loading, error, filters, updateFilters, deleteItem } = useInventory()
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)

  const categories = Array.from(new Set(items.map(item => item.category)))
  const suppliers = Array.from(new Set(items.map(item => item.supplier)))

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-stock':
        return t('inventory.inStock')
      case 'low-stock':
        return t('inventory.lowStockAlert')
      case 'out-of-stock':
        return t('inventory.outOfStock')
      default:
        return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-stock':
        return <FiPackage className="w-4 h-4" />
      case 'low-stock':
        return <FiAlertCircle className="w-4 h-4" />
      case 'out-of-stock':
        return <FiBox className="w-4 h-4" />
      default:
        return <FiPackage className="w-4 h-4" />
    }
  }

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return

    try {
      await deleteItem(itemToDelete)
      setItemToDelete(null)
    } catch (err) {
      console.error('Deletion failed: ', err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>{t('common.error')}: {error}</p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="p-8 text-center">
        <svg
          className="w-12 h-12 mx-auto text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">{t('inventory.emptyMessage')}</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {error ? t('common.error') : t('inventory.emptyMessage')}
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <InventoryFilters
        filters={filters}
        categories={categories}
        suppliers={suppliers}
        onUpdateFilters={updateFilters}
      />

      <div className="space-y-4">
        {items.map((item) => (
          <div 
            key={item.id}
            className="transition-all duration-300 border border-gray-100 shadow-sm rounded-xl hover:shadow-md dark:bg-gray-800 dark:shadow-gray-800/30 dark:border-gray-700"
          >
            <div className="flex flex-col">
              {/* Top Section: Title, SKU and Status */}
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="pr-2 text-xl font-medium text-gray-900 truncate dark:text-white">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                      {t('inventory.sku')}: {item.sku}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                    item.status === 'in-stock'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : item.status === 'low-stock'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {getStatusIcon(item.status)}
                    <span className="ml-1">{getStatusText(item.status)}</span>
                  </span>
                </div>
              </div>

              {/* Middle Section: Product Details */}
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="flex items-center text-base">
                    <FiBox className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">{t('inventory.category')}:</span>
                    <span className="ml-3 font-medium text-gray-900 dark:text-white">{item.category}</span>
                  </div>
                  
                  <div className="flex items-center text-base">
                    <FiTruck className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">{t('suppliers.title')}:</span>
                    <span className="ml-3 font-medium text-gray-900 dark:text-white">{item.supplier}</span>
                  </div>
                  
                  <div className="flex items-center text-base">
                    <FiPackage className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">{t('inventory.quantity')}:</span>
                    <span className="ml-3 font-medium text-gray-900 dark:text-white">{item.quantity} {item.unit}</span>
                  </div>
                  
                  <div className="flex items-center text-base">
                    <FiDollarSign className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">{t('inventory.price')}:</span>
                    <span className="ml-3 font-medium text-gray-900 dark:text-white">
                      {item.price.toLocaleString('tr-TR', {
                        style: 'currency',
                        currency: 'TRY'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Section: Action Buttons and Last Update */}
              <div className="flex items-center justify-between p-6">
                <div className="text-sm text-gray-400 dark:text-gray-500">
                  {t('common.date')}: {new Date(item.lastUpdated).toLocaleDateString('tr-TR')}
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => router.push(`/inventory/${item.id}`)}
                    className="p-3 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                    title={t('common.edit')}   
                  >
                    <FiEdit2 className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setItemToDelete(item.id)}
                    className="p-3 text-red-500 transition-colors rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                    title={t('common.delete')}
                  >
                    <FiTrash2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-xl dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              {t('common.delete')} {t('inventory.title')}
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              {t('common.confirm')}
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
              >
                {t('common.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}