'use client'

import { useState } from 'react'
import { useInventory } from '../hooks/useInventory'
import { FiEdit2, FiTrash2, FiEye, FiPackage, FiBox, FiTruck, FiDollarSign, FiAlertCircle } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import InventoryFilters from './InventoryFilters'

export default function InventoryList() {
  const router = useRouter()
  const { items, loading, error, filters, updateFilters, deleteItem } = useInventory()
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)

  const categories = Array.from(new Set(items.map(item => item.category)))
  const suppliers = Array.from(new Set(items.map(item => item.supplier)))

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'In Stock'
      case 'low-stock':
        return 'Low Stock'
      case 'out-of-stock':
        return 'Out of Stock'
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
      console.error('Silme işlemi başarısız:  ', err)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 rounded-full border-b-2 border-blue-500 animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>An error occurred: {error}</p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="p-8 text-center">
        <svg
          className="mx-auto w-12 h-12 text-gray-400"
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
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">Product Not Found</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {error ? 'An error occurred.' : 'No product found for the search criteria.'}
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl">
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
            className="rounded-xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-gray-800 dark:shadow-gray-800/30 dark:border-gray-700"
          >
            <div className="flex flex-col">
              {/* Üst Kısım: Başlık, SKU ve Durum */}
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="pr-2 text-xl font-medium text-gray-900 truncate dark:text-white">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                      SKU: {item.sku}
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

              {/* Orta Kısım: Ürün Detayları */}
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="flex items-center text-base">
                    <FiBox className="mr-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">Category:</span>
                    <span className="ml-3 font-medium text-gray-900 dark:text-white">{item.category}</span>
                  </div>
                  
                  <div className="flex items-center text-base">
                    <FiTruck className="mr-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">Supplier:</span>
                    <span className="ml-3 font-medium text-gray-900 dark:text-white">{item.supplier}</span>
                  </div>
                  
                  <div className="flex items-center text-base">
                    <FiPackage className="mr-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">Quantity:</span>
                    <span className="ml-3 font-medium text-gray-900 dark:text-white">{item.quantity} {item.unit}</span>
                  </div>
                  
                  <div className="flex items-center text-base">
                    <FiDollarSign className="mr-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">Price:</span>
                    <span className="ml-3 font-medium text-gray-900 dark:text-white">
                      {item.price.toLocaleString('tr-TR', {
                        style: 'currency',
                        currency: 'TRY'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Alt Kısım: İşlem Butonları ve Son Güncelleme */}
              <div className="flex justify-between items-center p-6">
                <div className="text-sm text-gray-400 dark:text-gray-500">
                  Last updated: {item.lastUpdated}
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => router.push(`/inventory/edit/${item.id}`)}
                    className="p-3 text-blue-500 rounded-lg transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                    title="View Details"
                  >
                    <FiEye className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => router.push(`/inventory/${item.id}`)}
                    className="p-3 text-gray-500 rounded-lg transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                    title="Edit"   
                  >
                    <FiEdit2 className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setItemToDelete(item.id)}
                    className="p-3 text-red-500 rounded-lg transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                    title="Delete"
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
        <div className="flex fixed inset-0 z-50 justify-center items-center p-4 bg-black bg-opacity-50">
          <div className="p-6 w-full max-w-md bg-white rounded-xl shadow-xl dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              Delete Product
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg transition-colors dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg transition-colors hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}