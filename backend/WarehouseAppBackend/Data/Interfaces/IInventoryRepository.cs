using System.Collections.Generic;
using System.Threading.Tasks;
using WarehouseAppBackend.Models;

namespace WarehouseAppBackend.Data.Interfaces
{
    public interface IInventoryRepository
    {
        Task<List<InventoryItem>> GetAllAsync();
        Task<InventoryItem> GetByIdAsync(string id);
        Task<InventoryItem> CreateAsync(InventoryItem item);
        Task<InventoryItem> UpdateAsync(InventoryItem item);
        Task<bool> DeleteAsync(string id);
        Task<List<InventoryItem>> SearchAsync(string searchTerm, string category, string supplier, string status);
    }
} 