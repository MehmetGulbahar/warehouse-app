using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WarehouseAppBackend.Data.Interfaces;
using WarehouseAppBackend.Models;

namespace WarehouseAppBackend.Data.Repositories
{
    public class InventoryRepository : IInventoryRepository
    {
        private readonly ApplicationDbContext _context;

        public InventoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<InventoryItem>> GetAllAsync()
        {
            return await _context.InventoryItems.ToListAsync();
        }

        public async Task<InventoryItem> GetByIdAsync(string id)
        {
            return await _context.InventoryItems.FindAsync(id);
        }

        public async Task<InventoryItem> CreateAsync(InventoryItem item)
        {
            item.Id = Guid.NewGuid().ToString();
            item.LastUpdated = DateTime.UtcNow;
            _context.InventoryItems.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<InventoryItem> UpdateAsync(InventoryItem item)
        {
            var existingItem = await _context.InventoryItems.FindAsync(item.Id);
            if (existingItem != null)
            {
                existingItem.Name = item.Name;
                existingItem.Sku = item.Sku;
                existingItem.Category = item.Category;
                existingItem.Supplier = item.Supplier;
                existingItem.Quantity = item.Quantity;
                existingItem.Unit = item.Unit;
                existingItem.Price = item.Price;
                existingItem.Status = item.Status;
                existingItem.LastUpdated = DateTime.UtcNow;
                await _context.SaveChangesAsync();
            }
            return existingItem;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var item = await _context.InventoryItems.FindAsync(id);
            if (item != null)
            {
                _context.InventoryItems.Remove(item);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<List<InventoryItem>> SearchAsync(string searchTerm, string category, string supplier, string status)
        {
            var query = _context.InventoryItems.AsQueryable();

            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(i => i.Name.Contains(searchTerm) || i.Sku.Contains(searchTerm));
            }

            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(i => i.Category == category);
            }

            if (!string.IsNullOrEmpty(supplier))
            {
                query = query.Where(i => i.Supplier == supplier);
            }

            if (!string.IsNullOrEmpty(status))
            {
                query = query.Where(i => i.Status == status);
            }

            return await query.ToListAsync();
        }
    }
}