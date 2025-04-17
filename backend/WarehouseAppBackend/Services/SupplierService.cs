using Microsoft.EntityFrameworkCore;
using WarehouseAppBackend.Data;
using WarehouseAppBackend.Models;

namespace WarehouseAppBackend.Services
{
    public class SupplierService : ISupplierService
    {
        private readonly ApplicationDbContext _context;

        public SupplierService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Supplier>> GetAllSuppliersAsync()
        {
            return await _context.Suppliers.ToListAsync();
        }

        public async Task<Supplier?> GetSupplierByIdAsync(Guid id)
        {
            return await _context.Suppliers.FindAsync(id);
        }

        public async Task<Supplier> CreateSupplierAsync(Supplier supplier)
        {
            supplier.Id = Guid.NewGuid();
            supplier.CreatedAt = DateTime.UtcNow;
            supplier.UpdatedAt = DateTime.UtcNow;

            _context.Suppliers.Add(supplier);
            await _context.SaveChangesAsync();

            return supplier;
        }

        public async Task<Supplier> UpdateSupplierAsync(Guid id, Supplier supplier)
        {
            var existingSupplier = await _context.Suppliers.FindAsync(id);
            if (existingSupplier == null)
            {
                throw new KeyNotFoundException($"Supplier with ID {id} not found.");
            }

            existingSupplier.Name = supplier.Name;
            existingSupplier.ContactPerson = supplier.ContactPerson;
            existingSupplier.Email = supplier.Email;
            existingSupplier.Phone = supplier.Phone;
            existingSupplier.Address = supplier.Address;
            existingSupplier.TaxNumber = supplier.TaxNumber;
            existingSupplier.Status = supplier.Status;
            existingSupplier.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return existingSupplier;
        }

        public async Task<bool> DeleteSupplierAsync(Guid id)
        {
            var supplier = await _context.Suppliers.FindAsync(id);
            if (supplier == null)
            {
                return false;
            }

            _context.Suppliers.Remove(supplier);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<Supplier>> SearchSuppliersAsync(string searchTerm, string status)
        {
            var query = _context.Suppliers.AsQueryable();

            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                searchTerm = searchTerm.ToLower();
                query = query.Where(s =>
                    s.Name.ToLower().Contains(searchTerm) ||
                    s.ContactPerson.ToLower().Contains(searchTerm) ||
                    s.Email.ToLower().Contains(searchTerm) ||
                    s.Phone.Contains(searchTerm) ||
                    s.TaxNumber.Contains(searchTerm)
                );
            }

            if (!string.IsNullOrWhiteSpace(status) && status != "all")
            {
                query = query.Where(s => s.Status == status);
            }

            return await query.ToListAsync();
        }
    }
}