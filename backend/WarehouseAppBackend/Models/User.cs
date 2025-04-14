using Microsoft.AspNetCore.Identity;

namespace WarehouseAppBackend.Models;

public class User : IdentityUser
{
    public string NameSurname { get; set; } = string.Empty;
    public new bool EmailConfirmed { get; set; }
    public string? EmailConfirmationToken { get; set; }
    public DateTime? EmailConfirmationTokenExpiry { get; set; }
}