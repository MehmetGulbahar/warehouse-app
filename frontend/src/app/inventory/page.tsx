'use client'

import Link from 'next/link'
import { FiPlus } from 'react-icons/fi'
import InventoryList from '@/features/inventory/components/InventoryList'
import { useTranslation } from 'react-i18next'

export default function InventoryPage() {
  // Add translation hook
  const { t } = useTranslation();

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('inventory.title')}</h1>
        <Link 
          href="/inventory/add" 
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md border border-transparent shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiPlus className="mr-2 w-4 h-4" />
          {t('inventory.addItem')}
        </Link>
      </div>
      <InventoryList />
    </div>
  )
}