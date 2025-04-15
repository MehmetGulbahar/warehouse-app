using System.Collections.Generic;
using System.Threading.Tasks;
using WarehouseAppBackend.Data.Interfaces;
using WarehouseAppBackend.Models;
using WarehouseAppBackend.Services.Interfaces;

namespace WarehouseAppBackend.Services
{
    public class InventoryService : IInventoryService
    {
        private readonly IInventoryRepository _repository;

        public InventoryService(IInventoryRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<InventoryItem>> GetAllItemsAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<InventoryItem> GetItemByIdAsync(string id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<InventoryItem> CreateItemAsync(InventoryItem item)
        {
            if (string.IsNullOrEmpty(item.Name))
            {
                throw new ArgumentException("Product name cannot be empty");
            }

            if (string.IsNullOrEmpty(item.Sku))
            {
                throw new ArgumentException("SKU cannot be empty");
            }

            if (item.Quantity < 0)
            {
                throw new ArgumentException("Quantity cannot be negative");
            }

            if (item.Price < 0)
            {
                throw new ArgumentException("Price cannot be negative");
            }

            Console.WriteLine($"Creating item: {System.Text.Json.JsonSerializer.Serialize(item)}");

            return await _repository.CreateAsync(item);
        }

        public async Task<InventoryItem> UpdateItemAsync(InventoryItem item)
        {
            var existingItem = await _repository.GetByIdAsync(item.Id);
            if (existingItem == null)
            {
                throw new System.ArgumentException("Item not found");
            }

            return await _repository.UpdateAsync(item);
        }

        public async Task<bool> DeleteItemAsync(string id)
        {
            return await _repository.DeleteAsync(id);
        }

        public async Task<List<InventoryItem>> SearchItemsAsync(string searchTerm, string category, string supplier, string status)
        {
            return await _repository.SearchAsync(searchTerm, category, supplier, status);
        }
    }
}