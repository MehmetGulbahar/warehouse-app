using Microsoft.AspNetCore.Identity;
using WarehouseAppBackend.Models;

namespace WarehouseAppBackend.Helper;

public static class UserHelper
{
    public static async Task<User> FindUserOrThrow(UserManager<User> userManager, string email)
    {
        var user = await userManager.FindByEmailAsync(email);
        if (user == null)
            throw new Exception("User not found");

        return user;
    }
}
