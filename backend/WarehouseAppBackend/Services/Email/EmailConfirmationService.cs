using WarehouseAppBackend.Models;
using WarehouseAppBackend.Models.DTOs;
using WarehouseAppBackend.Services.Token;
using Microsoft.AspNetCore.Identity;

namespace WarehouseAppBackend.Services.Email  
{
    public interface IEmailConfirmationService
    {
        Task<AuthResponseDTO> ConfirmEmailAsync(string email, string token);
    }

    public class EmailConfirmationService : IEmailConfirmationService
    {
        private readonly UserManager<User> _userManager;  

        public EmailConfirmationService(UserManager<User> userManager)  {
            _userManager = userManager;
        }

        public async Task<AuthResponseDTO> ConfirmEmailAsync(string email, string token)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(token))
                return Response(false, "Email and token are required.");

            var decodedToken = TokenHelper.Decode(token);
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return Response(false, "User not found.");

            if (await _userManager.IsEmailConfirmedAsync(user))
                return Response(true, "Email address already verified.");

            var result = await _userManager.ConfirmEmailAsync(user, decodedToken);
            if (result.Succeeded)
                return await ConfirmUserAndRespond(user, "Email verified successfully.");

            return await HandleTokenFailure(user, result);
        }

        private async Task<AuthResponseDTO> HandleTokenFailure(User user, IdentityResult result)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            if (errors.Contains("Invalid token"))
            {
                var newToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var retryResult = await _userManager.ConfirmEmailAsync(user, newToken);

                if (retryResult.Succeeded)
                    return await ConfirmUserAndRespond(user, "Email verified successfully with a new token.");

                errors = string.Join(", ", retryResult.Errors.Select(e => e.Description));
            }

            return Response(false, $"Email verification failed: {errors}");
        }

        private async Task<AuthResponseDTO> ConfirmUserAndRespond(User user, string message)  
        {
            user.EmailConfirmed = true;
            await _userManager.UpdateAsync(user);
            return Response(true, message);
        }

        private AuthResponseDTO Response(bool success, string message) => new()
        {
            Success = success,
            Message = message
        };
    }
}