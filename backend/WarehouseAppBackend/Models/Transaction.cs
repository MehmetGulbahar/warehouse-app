using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WarehouseAppBackend.Models
{
    public class Transaction
    {
        public string Id { get; set; }

        [Required]
        public string Type { get; set; } 

        [Required]
        public string ProductId { get; set; }

        [Required]
        public string ProductName { get; set; }

        [Required]
        public string ProductSku { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1")]
        public int Quantity { get; set; }

        public decimal Price { get; set; }

        public string PartyName { get; set; } 

        [Required]
        public DateTime TransactionDate { get; set; }

        [Required]
        public string Status { get; set; }
        
        public string Notes { get; set; }
    }
}
