using System.Collections.Generic;
using System.Threading.Tasks;
using WarehouseAppBackend.Models;

namespace WarehouseAppBackend.Data.Interfaces
{
    public interface ITransactionRepository
    {
        Task<List<Transaction>> GetAllAsync();
        Task<Transaction> GetByIdAsync(string id);
        Task<List<Transaction>> GetByProductIdAsync(string productId);
        Task<Transaction> CreateAsync(Transaction transaction);
        Task<Transaction> UpdateAsync(Transaction transaction);
        Task<bool> DeleteAsync(string id);
        Task<List<Transaction>> SearchAsync(string productId = null, string type = null, string status = null);
    }
}
