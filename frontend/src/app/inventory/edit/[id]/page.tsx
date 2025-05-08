'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { FiArrowLeft, FiSave } from 'react-icons/fi'
import { InventoryItem } from '@/features/inventory/hooks/useInventory'
import { useTranslation } from 'react-i18next'

export default function EditInventoryPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { t } = useTranslation()
  const [formData, setFormData] = useState<Omit<InventoryItem, 'id' | 'lastUpdated'>>({
    name: '',
    sku: '',
    category: '',
    supplier: '',
    quantity: 0,
    unit: 'piece',
    price: 0,
    status: 'in-stock'
  })

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:5210/api/inventory/${params.id}`, {
          credentials: 'include'
        })
        
        if (!response.ok) {
          throw new Error('Product information loading error.')
        }
        
        const data = await response.json()
              
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, lastUpdated, ...itemData } = data
        setFormData(itemData)
        setError(null)
      } catch (err) {
        setError('Product information loading error.')
        console.error('Data loading error:', err)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchItem()
    }
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name === 'quantity' || name === 'price') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const requestData = {
        ...formData,
        id: params.id
      }
      
      
      const response = await fetch(`http://localhost:5210/api/inventory/${params.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json' 
        },
        credentials: 'include',
        body: JSON.stringify(requestData)
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Product update error.')
      }
      
      router.push(`/inventory/${params.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Product update error.')
      console.error('Update error:', err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
          <div className="mt-4">
            <button
              onClick={() => router.push('/inventory')}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              <FiArrowLeft className="w-4 h-4 mr-2" />
              {t('common.back')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => router.push(`/inventory/${params.id}`)}
            className="p-2 mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('inventory.editItem')}</h1>
        </div>

        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 border border-red-400 rounded" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Ürün Adı */}
            <div>
              <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('inventory.name')} <span className="text-red-500">*</span>
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

            {/* SKU */}
            <div>
              <label htmlFor="sku" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('inventory.sku')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="sku"
                name="sku"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={formData.sku}
                onChange={handleChange}
              />
            </div>

            {/* Kategori */}
            <div>
              <label htmlFor="category" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('inventory.category')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="category"
                name="category"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={formData.category}
                onChange={handleChange}
              />
            </div>

            {/* Tedarikçi */}
            <div>
              <label htmlFor="supplier" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('suppliers.title')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="supplier"
                name="supplier"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={formData.supplier}
                onChange={handleChange}
              />
            </div>

            {/* Miktar */}
            <div>
              <label htmlFor="quantity" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('inventory.quantity')} <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="0"
                  required
                  className="block w-full px-3 py-2 border border-gray-300 shadow-sm rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={formData.quantity}
                  onChange={handleChange}
                />
                <select
                  id="unit"
                  name="unit"
                  className="block w-24 px-3 py-2 border border-l-0 border-gray-300 shadow-sm rounded-r-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={formData.unit}
                  onChange={handleChange}
                >
                  <option value="piece">Piece</option>
                  <option value="kg">Kg</option>
                  <option value="lt">Lt</option>
                  <option value="mt">Mt</option>
                </select>
              </div>
            </div>

            {/* Fiyat */}
            <div>
              <label htmlFor="price" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('inventory.price')} (₺) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                min="0"
                step="0.01"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            {/* Durum */}
            <div>
              <label htmlFor="status" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('common.status')} <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="in-stock">{t('inventory.inStock')}</option>
                <option value="low-stock">{t('inventory.lowStockAlert')}</option>
                <option value="out-of-stock">{t('inventory.outOfStock')}</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={() => router.push(`/inventory/${params.id}`)}
              className="px-4 py-2 mr-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              {t('common.cancel')}
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
                  {t('common.save')}...
                </>
              ) : (
                <>
                  <FiSave className="w-4 h-4 mr-2" />
                  {t('common.save')}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}