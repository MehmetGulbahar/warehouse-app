using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using WarehouseAppBackend.Data.Interfaces;
using WarehouseAppBackend.Models;
using WarehouseAppBackend.Services.Interfaces;

namespace WarehouseAppBackend.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _repository;

        public TransactionService(ITransactionRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Transaction>> GetAllTransactionsAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Transaction> GetTransactionByIdAsync(string id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<List<Transaction>> GetTransactionsByProductIdAsync(string productId)
        {
            return await _repository.GetByProductIdAsync(productId);
        }

        public async Task<Transaction> CreateTransactionAsync(Transaction transaction)
        {
            ValidateTransaction(transaction);
            return await _repository.CreateAsync(transaction);
        }

        public async Task<Transaction> UpdateTransactionAsync(Transaction transaction)
        {
            ValidateTransaction(transaction);
            return await _repository.UpdateAsync(transaction);
        }

        public async Task<bool> DeleteTransactionAsync(string id)
        {
            return await _repository.DeleteAsync(id);
        }

        public async Task<List<Transaction>> SearchTransactionsAsync(string productId = null, string type = null, string status = null)
        {
            return await _repository.SearchAsync(productId, type, status);
        }

        public async Task<Transaction> RecordInventoryTransactionAsync(
            string type,
            string productId,
            string productName,
            string productSku,
            int quantity,
            decimal price,
            string partyName,
            string status = "completed",
            string notes = null)
        {
            if (type != "incoming" && type != "outgoing")
            {
                throw new ArgumentException("Transaction type must be either 'incoming' or 'outgoing'");
            }

            var transaction = new Transaction
            {
                Type = type,
                ProductId = productId,
                ProductName = productName,
                ProductSku = productSku,
                Quantity = quantity,
                Price = price,
                PartyName = partyName,
                Status = status,
                TransactionDate = DateTime.UtcNow,
                Notes = notes
            };

            ValidateTransaction(transaction);

            return await _repository.CreateAsync(transaction);
        }

        public async Task<int> GetTotalIncomingQuantityAsync()
        {
            var incomingTransactions = await _repository.SearchAsync(null, "incoming", null);
            return incomingTransactions.Sum(t => t.Quantity);
        }

        public async Task<int> GetTotalOutgoingQuantityAsync()
        {
            var outgoingTransactions = await _repository.SearchAsync(null, "outgoing", null);
            return outgoingTransactions.Sum(t => t.Quantity);
        }

        public async Task<Dictionary<string, int>> GetStockSummaryAsync()
        {
            var summary = new Dictionary<string, int>();

            summary["totalIncoming"] = await GetTotalIncomingQuantityAsync();
            summary["totalOutgoing"] = await GetTotalOutgoingQuantityAsync();
            summary["currentStock"] = summary["totalIncoming"] - summary["totalOutgoing"];

            return summary;
        }

        public async Task<TransactionStats> GetTransactionStatsAsync(
            DateTime currentStartDate,
            DateTime currentEndDate,
            DateTime prevStartDate,
            DateTime prevEndDate)
        {
            var allTransactions = await _repository.GetAllAsync();

            var currentPeriodTransactions = allTransactions
                .Where(t => t.TransactionDate >= currentStartDate && t.TransactionDate <= currentEndDate)
                .ToList();

            var prevPeriodTransactions = allTransactions
                .Where(t => t.TransactionDate >= prevStartDate && t.TransactionDate <= prevEndDate)
                .ToList();

            var stats = new TransactionStats
            {
                CurrentPeriod = new PeriodStats
                {
                    StartDate = currentStartDate,
                    EndDate = currentEndDate,
                    TransactionCount = currentPeriodTransactions.Count,
                    TotalValue = currentPeriodTransactions.Sum(t => t.Price * t.Quantity)
                },

                PreviousPeriod = new PeriodStats
                {
                    StartDate = prevStartDate,
                    EndDate = prevEndDate,
                    TransactionCount = prevPeriodTransactions.Count,
                    TotalValue = prevPeriodTransactions.Sum(t => t.Price * t.Quantity)
                }
            };

            if (stats.PreviousPeriod.TotalValue == 0)
            {
                stats.ChangePercentage = stats.CurrentPeriod.TotalValue > 0 ? 100 : 0;
            }
            else
            {
                stats.ChangePercentage = ((stats.CurrentPeriod.TotalValue - stats.PreviousPeriod.TotalValue) /
                                         stats.PreviousPeriod.TotalValue) * 100;
            }

            return stats;
        }

        private void ValidateTransaction(Transaction transaction)
        {
            if (string.IsNullOrEmpty(transaction.ProductId))
            {
                throw new ArgumentException("Product ID is required");
            }

            if (string.IsNullOrEmpty(transaction.ProductName))
            {
                throw new ArgumentException("Product name is required");
            }

            if (string.IsNullOrEmpty(transaction.ProductSku))
            {
                throw new ArgumentException("Product SKU is required");
            }

            if (transaction.Quantity <= 0)
            {
                throw new ArgumentException("Quantity must be greater than zero");
            }

            if (transaction.Price < 0)
            {
                throw new ArgumentException("Price cannot be negative");
            }

            if (transaction.Type != "incoming" && transaction.Type != "outgoing")
            {
                throw new ArgumentException("Transaction type must be either 'incoming' or 'outgoing'");
            }

            if (string.IsNullOrEmpty(transaction.Status))
            {
                throw new ArgumentException("Transaction status is required");
            }
        }
    }
}
