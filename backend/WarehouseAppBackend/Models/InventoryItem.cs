using System;
using System.ComponentModel.DataAnnotations;

namespace WarehouseAppBackend.Models
{
    public class InventoryItem
    {
        public string? Id { get; set; }

        [Required(ErrorMessage = "Product name is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "SKU is required")]
        public string Sku { get; set; }

        [Required(ErrorMessage = "Category is required")]
        public string Category { get; set; }

        [Required(ErrorMessage = "Supplier is required")]
        public string Supplier { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Quantity cannot be negative")]
        public int Quantity { get; set; }

        [Required(ErrorMessage = "Unit is required")]
        public string Unit { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Price cannot be negative")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "Status is required")]
        public string Status { get; set; }

        public DateTime LastUpdated { get; set; }


    }
}