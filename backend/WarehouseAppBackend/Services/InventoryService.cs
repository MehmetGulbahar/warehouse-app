using System;
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
        private readonly ITransactionService _transactionService;

        public InventoryService(IInventoryRepository repository, ITransactionService transactionService)
        {
            _repository = repository;
            _transactionService = transactionService;
        }

        public async Task<List<InventoryItem>> GetAllItemsAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<InventoryItem> GetItemByIdAsync(string id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<InventoryItem> CreateItemAsync(InventoryItem item, string supplierName = null)
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

            UpdateStatusBasedOnQuantity(item);

            var createdItem = await _repository.CreateAsync(item);

            if (createdItem.Quantity > 0)
            {
                try
                {
                    var partyName = !string.IsNullOrEmpty(supplierName) ? supplierName : createdItem.Supplier;

                    await _transactionService.RecordInventoryTransactionAsync(
                        "incoming",
                        createdItem.Id,
                        createdItem.Name,
                        createdItem.Sku,
                        createdItem.Quantity,
                        createdItem.Price,
                        partyName,
                        "completed",
                        "Initial stock creation");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error recording transaction: {ex.Message}");
                }
            }

            return createdItem;
        }

        public async Task<InventoryItem> UpdateItemAsync(InventoryItem item, InventoryItem oldItem = null)
        {
            if (oldItem == null)
            {
                oldItem = await _repository.GetByIdAsync(item.Id);
                if (oldItem == null)
                {
                    throw new ArgumentException("Item not found");
                }
            }

            UpdateStatusBasedOnQuantity(item);
            
            var updatedItem = await _repository.UpdateAsync(item);

            int quantityDifference = updatedItem.Quantity - oldItem.Quantity;

            if (quantityDifference != 0)
            {
                try
                {
                    string transactionType = quantityDifference > 0 ? "incoming" : "outgoing";
                    string partyName = transactionType == "incoming" ? updatedItem.Supplier : "Stock Update";
                    int quantity = Math.Abs(quantityDifference);

                    await _transactionService.RecordInventoryTransactionAsync(
                        transactionType,
                        updatedItem.Id,
                        updatedItem.Name,
                        updatedItem.Sku,
                        quantity,
                        updatedItem.Price,
                        partyName,
                        "completed",
                        "Stock quantity update");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error recording transaction: {ex.Message}");
                }
            }

            return updatedItem;
        }

        public async Task<bool> DeleteItemAsync(string id)
        {
            return await _repository.DeleteAsync(id);
        }

        public async Task<List<InventoryItem>> SearchItemsAsync(string searchTerm, string category, string supplier, string status)
        {
            return await _repository.SearchAsync(searchTerm, category, supplier, status);
        }
        
        private void UpdateStatusBasedOnQuantity(InventoryItem item)
        {
            if (item.Quantity == 0)
            {
                item.Status = "out-of-stock";
            }
            else if (item.Quantity < 5)
            {
                item.Status = "low-stock";
            }
            else
            {
                item.Status = "in-stock";
            }
        }
    }
}