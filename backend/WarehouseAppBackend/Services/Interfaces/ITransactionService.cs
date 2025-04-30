using System.Collections.Generic;
using System.Threading.Tasks;
using WarehouseAppBackend.Models;

namespace WarehouseAppBackend.Services.Interfaces
{
    public interface ITransactionService
    {
        Task<List<Transaction>> GetAllTransactionsAsync();
        Task<Transaction> GetTransactionByIdAsync(string id);
        Task<List<Transaction>> GetTransactionsByProductIdAsync(string productId);
        Task<Transaction> CreateTransactionAsync(Transaction transaction);
        Task<Transaction> UpdateTransactionAsync(Transaction transaction);
        Task<bool> DeleteTransactionAsync(string id);
        Task<List<Transaction>> SearchTransactionsAsync(string productId = null, string type = null, string status = null);
        
        Task<Transaction> RecordInventoryTransactionAsync(
            string type, 
            string productId, 
            string productName, 
            string productSku, 
            int quantity, 
            decimal price, 
            string partyName, 
            string status = "completed", 
            string notes = null);
            
        Task<int> GetTotalIncomingQuantityAsync();
        Task<int> GetTotalOutgoingQuantityAsync();
        Task<Dictionary<string, int>> GetStockSummaryAsync();
    }
}
