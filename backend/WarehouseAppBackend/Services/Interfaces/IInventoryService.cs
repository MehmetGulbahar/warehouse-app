using System.Collections.Generic;
using System.Threading.Tasks;
using WarehouseAppBackend.Models;

namespace WarehouseAppBackend.Services.Interfaces
{
    public interface IInventoryService
    {
        Task<List<InventoryItem>> GetAllItemsAsync();
        Task<InventoryItem> GetItemByIdAsync(string id);
        Task<InventoryItem> CreateItemAsync(InventoryItem item);
        Task<InventoryItem> UpdateItemAsync(InventoryItem item);
        Task<bool> DeleteItemAsync(string id);
        Task<List<InventoryItem>> SearchItemsAsync(string searchTerm, string category, string supplier, string status);
    }
}