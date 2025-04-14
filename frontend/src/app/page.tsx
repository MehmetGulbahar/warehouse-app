export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Stok Durumu */}
        <div className="card">
          <h3 className="mb-2 text-lg font-medium">Total Stock</h3>
          <p className="text-3xl font-bold text-primary">1,234</p>
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
