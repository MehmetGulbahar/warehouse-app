using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WarehouseAppBackend.Data;

namespace WarehouseAppBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DbController : ControllerBase
{
    private readonly IServiceProvider _serviceProvider;

    public DbController(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    [HttpPost("clear")]
    [Authorize(Roles = "Admin")] 
    public async Task<IActionResult> ClearDatabase()
    {
        await DbInitializer.ClearAllData(_serviceProvider);
        return Ok("Database cleared successfully.");
    }   
}