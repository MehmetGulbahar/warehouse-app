using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WarehouseAppBackend.Models;
using WarehouseAppBackend.Models.DTOs;
using WarehouseAppBackend.Services.Email;
using WarehouseAppBackend.Services.Token;


namespace WarehouseAppBackend.Services;

public interface IAuthService
{
    Task<AuthResponseDTO> RegisterAsync(RegisterDTO model);
    Task<AuthResponseDTO> LoginAsync(LoginDTO model);
    Task<AuthResponseDTO> ConfirmEmailAsync(string email, string token);
    Task SendEmailConfirmationAsync(string email, string confirmationLink);
}

public class AuthService : IAuthService
{
    private readonly UserManager<User> _userManager;
    private readonly IConfiguration _configuration;
    private readonly ITokenService _tokenService;
    private readonly IEmailService _emailService;
    private readonly IEmailTemplateService _emailTemplateService;
    private readonly AuthHelperService _authHelper;


    public AuthService(
        UserManager<User> userManager,
        IConfiguration configuration,
        ITokenService tokenService,
        IEmailService emailService,
        IEmailTemplateService emailTemplateService,
        AuthHelperService authHelper)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _configuration = configuration;
        _emailService = emailService;
        _emailTemplateService = emailTemplateService;
        _authHelper = authHelper;
    }

    public async Task<AuthResponseDTO> RegisterAsync(RegisterDTO model)
    {
        var validationResult = _authHelper.ValidateRegistrationInput(model);
        if (!validationResult.Success)
            return validationResult;

        var (user, result) = await _authHelper.CreateUserAsync(model);
        if (!result.Succeeded)
        {
            return new AuthResponseDTO
            {
                Success = false,
                Message = string.Join(", ", result.Errors.Select(e => e.Description))
            };
        }

        await _authHelper.SendEmailConfirmationForRegistrationAsync(user);

        return new AuthResponseDTO
        {
            Success = true,
            Message = "Registration successful. Please verify your email address."
        };
    }
    public async Task<AuthResponseDTO> LoginAsync(LoginDTO model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null)
        {
            return new AuthResponseDTO
            {
                Success = false,
                Message = "User not found."
            };
        }

        var result = await _userManager.CheckPasswordAsync(user, model.Password);
        if (!result)
        {
            return new AuthResponseDTO
            {
                Success = false,
                Message = "Invalid password."
            };
        }

        var isEmailConfirmed = await _userManager.IsEmailConfirmedAsync(user);


        if (!isEmailConfirmed && !user.EmailConfirmed)
        {
            return new AuthResponseDTO
            {
                Success = false,
                Message = "Please confirm your email address before logging in."
            };
        }

        var token = _tokenService.GenerateJwtToken(user);


        var handler = new JwtSecurityTokenHandler();
        var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

        return new AuthResponseDTO
        {
            Success = true,
            Message = "Login successful.",
            Token = token
        };
    }

    public async Task<AuthResponseDTO> ConfirmEmailAsync(string email, string token)
    {
        try
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return new AuthResponseDTO
                {
                    Success = false,
                    Message = "User not found."
                };
            }

            if (await _userManager.IsEmailConfirmedAsync(user))
            {
                return new AuthResponseDTO
                {
                    Success = true,
                    Message = "Email address already verified."
                };
            }


            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));

                return new AuthResponseDTO
                {
                    Success = false,
                    Message = $"Email verification failed: {errors}"
                };
            }

            return new AuthResponseDTO
            {
                Success = true,
                Message = "Email verified successfully."
            };
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Exception in ConfirmEmailAsync: {ex.Message}");
            Console.WriteLine($"Stack trace: {ex.StackTrace}");

            return new AuthResponseDTO
            {
                Success = false,
                Message = $"Error occurred during email verification: {ex.Message}"
            };
        }
    }

    public async Task SendEmailConfirmationAsync(string email, string confirmationLink)
    {
        var user = await _userManager.FindByEmailAsync(email);
        var userName = user?.NameSurname ?? "Dear User";
        var htmlBody = _emailTemplateService.GetEmailConfirmationTemplate(user.NameSurname, confirmationLink);
        await _emailService.SendEmailAsync(email, "Warehouse App - Email Verification", htmlBody);

    }
}