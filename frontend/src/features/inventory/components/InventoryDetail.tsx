'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { FiEdit2, FiTrash2, FiArrowLeft } from 'react-icons/fi'
import { InventoryItem } from '../hooks/useInventory'

export default function InventoryDetail() {
  const params = useParams()
  const router = useRouter()
  const [item, setItem] = useState<InventoryItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  // Stok durumu için renk sınıfları
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'out-of-stock':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  // Stok durumu için Türkçe metin
  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'Stokta'
      case 'low-stock':
        return 'Az Stok'
      case 'out-of-stock':
        return 'Stok Yok'
      default:
        return status
    }
  }

  // Ürün verilerini yükle
  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true)
        // Gerçek uygulamada API çağrısı yapılacak
        // const response = await fetch(`/api/inventory/${params.id}`)
        // const data = await response.json()
        
        // Şimdilik mock veri kullanıyoruz
        await new Promise(resolve => setTimeout(resolve, 1000)) // Yükleme simülasyonu
        
        // Mock veri
        const mockItem: InventoryItem = {
          id: params.id as string,
          name: 'Laptop Dell XPS 13',
          sku: 'LAP-DEL-001',
          category: 'Elektronik',
          supplier: 'Dell',
          quantity: 15,
          unit: 'piece',
          price: 25000,
          status: 'in-stock',
          lastUpdated: '2024-02-20'
        }
        
        setItem(mockItem)
        setError(null)
      } catch (err) {
        setError('Ürün bilgileri yüklenirken bir hata oluştu.')
        console.error('Veri yükleme hatası:', err)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchItem()
    }
  }, [params.id])

  // Silme işlemi için onay
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true)
  }

  // Silme işlemini gerçekleştir
  const handleDeleteConfirm = async () => {
    try {
      // Gerçek uygulamada API çağrısı yapılacak
      // await fetch(`/api/inventory/${params.id}`, { method: 'DELETE' })
      
      // Başarılı silme işlemi sonrası listeye yönlendir
      router.push('/inventory')
    } catch (err) {
      setError('Ürün silinirken bir hata oluştu.')
      console.error('Silme hatası:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="relative px-4 py-3 text-red-700 bg-red-100 rounded border border-red-400" role="alert">
        <strong className="font-bold">Hata!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="py-10 text-center">
        <p className="text-gray-500 dark:text-gray-400">Ürün bulunamadı</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Başlık ve İşlem Butonları */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => router.push('/inventory')}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{item.name}</h1>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => router.push(`/inventory/edit/${item.id}`)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiEdit2 className="mr-2 w-4 h-4" />
            Düzenle
          </button>
          <button 
            onClick={handleDeleteClick}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <FiTrash2 className="mr-2 w-4 h-4" />
            Sil
          </button>
        </div>
      </div>

      {/* Ürün Detayları */}
      <div className="bg-white rounded-lg shadow-sm dark:bg-gray-800">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Ürün Bilgileri</h3>
              <div className="mt-5 border-t border-gray-200 dark:border-gray-700">
                <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Ürün Adı</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{item.name}</dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">SKU</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{item.sku}</dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Kategori</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{item.category}</dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Tedarikçi</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{item.supplier}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Stok Bilgileri</h3>
              <div className="mt-5 border-t border-gray-200 dark:border-gray-700">
                <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Miktar</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                      {item.quantity} {item.unit}
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Fiyat</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                      {item.price.toLocaleString('tr-TR')} ₺
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Durum</dt>
                    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Son Güncelleme</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{item.lastUpdated}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Silme Onay Modalı */}
      {isDeleteModalOpen && (
        <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
          <div className="p-6 w-full max-w-md bg-white rounded-lg dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Ürünü Sil</h3>
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              <span className="font-medium">{item.name}</span> ürününü silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                İptal
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 