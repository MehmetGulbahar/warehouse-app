using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WarehouseAppBackend.Models;

namespace WarehouseAppBackend.Data;

public class ApplicationDbContext : IdentityDbContext<User>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<InventoryItem> InventoryItems { get; set; }
    public DbSet<Supplier> Suppliers { get; set; }
    public DbSet<Transaction> Transactions { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Supplier>()
            .HasIndex(s => s.Email)
            .IsUnique();

        builder.Entity<Supplier>()
            .HasIndex(s => s.TaxNumber)
            .IsUnique();

        builder.Entity<InventoryItem>()
            .Property(i => i.Price)
            .HasPrecision(18, 2);
            
        builder.Entity<Transaction>()
            .Property(t => t.Price)
            .HasPrecision(18, 2);
    }
}