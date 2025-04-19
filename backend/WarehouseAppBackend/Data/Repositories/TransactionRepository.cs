using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WarehouseAppBackend.Data.Interfaces;
using WarehouseAppBackend.Models;

namespace WarehouseAppBackend.Data.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly ApplicationDbContext _context;

        public TransactionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Transaction>> GetAllAsync()
        {
            return await _context.Transactions
                .OrderByDescending(t => t.TransactionDate)
                .ToListAsync();
        }

        public async Task<Transaction> GetByIdAsync(string id)
        {
            return await _context.Transactions.FindAsync(id);
        }

        public async Task<List<Transaction>> GetByProductIdAsync(string productId)
        {
            return await _context.Transactions
                .Where(t => t.ProductId == productId)
                .OrderByDescending(t => t.TransactionDate)
                .ToListAsync();
        }

        public async Task<Transaction> CreateAsync(Transaction transaction)
        {
            transaction.Id = Guid.NewGuid().ToString();
            
            if (transaction.TransactionDate == default)
            {
                transaction.TransactionDate = DateTime.UtcNow;
            }
            
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();
            return transaction;
        }

        public async Task<Transaction> UpdateAsync(Transaction transaction)
        {
            var existingTransaction = await _context.Transactions.FindAsync(transaction.Id);
            if (existingTransaction != null)
            {
                existingTransaction.Type = transaction.Type;
                existingTransaction.ProductName = transaction.ProductName;
                existingTransaction.ProductSku = transaction.ProductSku;
                existingTransaction.Quantity = transaction.Quantity;
                existingTransaction.Price = transaction.Price;
                existingTransaction.PartyName = transaction.PartyName;
                existingTransaction.Status = transaction.Status;
                existingTransaction.Notes = transaction.Notes;
                
                
                await _context.SaveChangesAsync();
            }
            return existingTransaction;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction != null)
            {
                _context.Transactions.Remove(transaction);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<List<Transaction>> SearchAsync(string productId = null, string type = null, string status = null)
        {
            var query = _context.Transactions.AsQueryable();

            if (!string.IsNullOrEmpty(productId))
            {
                query = query.Where(t => t.ProductId == productId);
            }

            if (!string.IsNullOrEmpty(type))
            {
                query = query.Where(t => t.Type == type);
            }

            if (!string.IsNullOrEmpty(status))
            {
                query = query.Where(t => t.Status == status);
            }

            return await query
                .OrderByDescending(t => t.TransactionDate)
                .ToListAsync();
        }
    }
}
