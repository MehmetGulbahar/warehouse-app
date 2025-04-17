using WarehouseAppBackend.Models;

namespace WarehouseAppBackend.Services
{
    public interface ISupplierService
    {
        Task<List<Supplier>> GetAllSuppliersAsync();
        Task<Supplier?> GetSupplierByIdAsync(Guid id);
        Task<Supplier> CreateSupplierAsync(Supplier supplier);
        Task<Supplier> UpdateSupplierAsync(Guid id, Supplier supplier);
        Task<bool> DeleteSupplierAsync(Guid id);
        Task<List<Supplier>> SearchSuppliersAsync(string searchTerm, string status);
    }
}