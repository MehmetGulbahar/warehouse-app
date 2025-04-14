using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WarehouseAppBackend.Models;

namespace WarehouseAppBackend.Data;

public static class DbInitializer
{
    public static async Task ClearAllData(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();

        var users = await userManager.Users.ToListAsync();
        foreach (var user in users)
        {
            await userManager.DeleteAsync(user);
        }

        var tables = context.Model.GetEntityTypes()
            .Select(t => t.GetTableName())
            .Where(t => t != null && !t.Contains("AspNet"))
            .ToList();

        foreach (var table in tables)
        {
            await context.Database.ExecuteSqlRawAsync($"DELETE FROM [{table}]");
        }

        await context.SaveChangesAsync();
    }
}