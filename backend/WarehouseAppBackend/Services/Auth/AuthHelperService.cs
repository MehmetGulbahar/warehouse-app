using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using WarehouseAppBackend.Models;
using WarehouseAppBackend.Models.DTOs;
using WarehouseAppBackend.Services;
using WarehouseAppBackend.Services.Email;



public class AuthHelperService
{
    private readonly UserManager<User> _userManager;
    private readonly IConfiguration _configuration;
    private readonly IEmailService _emailService;
    private readonly IEmailTemplateService _emailTemplateService;

    public AuthHelperService(
        UserManager<User> userManager,
        IConfiguration configuration,
        IEmailService emailService,
        IEmailTemplateService emailTemplateService)
    {
        _userManager = userManager;
        _configuration = configuration;
        _emailService = emailService;
        _emailTemplateService = emailTemplateService;
    }

    public AuthResponseDTO ValidateRegistrationInput(RegisterDTO model)
    {
        if (model.Password != model.PasswordConfirm)
        {
            return new AuthResponseDTO
            {
                Success = false,
                Message = "Passwords do not match."
            };
        }

        return new AuthResponseDTO { Success = true };
    }

    public async Task<(User user, IdentityResult result)> CreateUserAsync(RegisterDTO model)
    {
        var user = new User
        {
            UserName = model.Email,
            Email = model.Email,
            NameSurname = model.NameSurname
        };

        var result = await _userManager.CreateAsync(user, model.Password);
        return (user, result);
    }

    public async Task SendEmailConfirmationForRegistrationAsync(User user)
    {
        var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        var encodedToken = TokenHelper.Encode(token);
        var confirmationLink = $"{_configuration["AppUrl"]}/api/auth/confirm-email?email={user.Email}&token={encodedToken}";
        var htmlBody = _emailTemplateService.GetEmailConfirmationTemplate(user.NameSurname, confirmationLink);

        await _emailService.SendEmailAsync(
            user.Email,
            "Warehouse App - Email Verification",
            htmlBody
        );
    }
}
