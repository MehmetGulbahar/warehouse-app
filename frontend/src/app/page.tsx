"use client";

import { useState, useEffect } from 'react';

export default function Home() {
const [totalStock, setTotalStock] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotalStock = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5210/api/inventory/totalstock', {
          method: 'GET',
          headers: {
          },
            credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch total stock data');
        }
        
        const data = await response.json();
        console.log('Total stock data:', data);
        
        const stockValue = typeof data === 'number' 
          ? data 
          : (data.totalStock || data.total || data.count || data.value || Object.values(data)[0]);
        
        setTotalStock(stockValue);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching total stock:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTotalStock();
  }, []);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
     {/* Stok Durumu */}
        <div className="card">
          <h3 className="mb-2 text-lg font-medium">Total Stock</h3>
          {isLoading ? (
            <p className="text-3xl font-bold text-primary">Loading...</p>
          ) : error ? (
            <p className="text-sm text-danger">Error: {error}</p>
          ) : (
            <p className="text-3xl font-bold text-primary">{totalStock?.toLocaleString() || '0'}</p>
          )}
        </div>


        {/* Gelen Stoklar */}
        <div className="card">
          <h3 className="mb-2 text-lg font-medium">Incoming Stock</h3>
          <p className="text-3xl font-bold text-success">56</p>
        </div>

        {/* Çıkan Stoklar */}
        <div className="card">
          <h3 className="mb-2 text-lg font-medium">Outgoing Stock</h3>
          <p className="text-3xl font-bold text-warning">43</p>
        </div>

        {/* Kritik Stoklar */}
        <div className="card">
          <h3 className="mb-2 text-lg font-medium">Critical Stock</h3>
          <p className="text-3xl font-bold text-danger">12</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Son İşlemler */}
        <div className="card">
          <h3 className="mb-4 text-lg font-medium">Last Transactions</h3>
          <div className="space-y-4">
            {/* İşlem listesi buraya gelecek */}
          </div>
        </div>

        {/* Stok Hareketleri */}
        <div className="card">
          <h3 className="mb-4 text-lg font-medium">Stock Movements</h3>
          <div className="space-y-4">
            {/* Grafik buraya gelecek */}
          </div>
        </div>
      </div>
    </div>
  );
}
