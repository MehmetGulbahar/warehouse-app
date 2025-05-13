using Microsoft.AspNetCore.Mvc;
using WarehouseAppBackend.Models.DTOs;
using WarehouseAppBackend.Services;
using Microsoft.AspNetCore.Identity;
using WarehouseAppBackend.Models;
using System.Web;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using WarehouseAppBackend.Services.Email;
using WarehouseAppBackend.Helper;

namespace WarehouseAppBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly UserManager<User> _userManager;
    private readonly IConfiguration _configuration;
    private readonly IEmailConfirmationService _emailConfirmationService;

    public AuthController(IAuthService authService, UserManager<User> userManager, IConfiguration configuration, IEmailConfirmationService emailConfirmationService
        )
    {
        _authService = authService;
        _userManager = userManager;
        _configuration = configuration;
        _emailConfirmationService = emailConfirmationService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDTO>> Register(RegisterDTO model)
    {
        var result = await _authService.RegisterAsync(model);
        if (!result.Success)
        {
            return BadRequest(result);
        }
        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDTO>> Login(LoginDTO model)
    {
        var result = await _authService.LoginAsync(model);
        if (!result.Success)
        {
            return BadRequest(result);
        }

        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Expires = DateTime.Now.AddDays(1)
        };

        Response.Cookies.Append("jwt", result.Token!, cookieOptions);

        result.Token = null;

        return Ok(result);
    }

    [HttpGet("confirm-email")]
    public async Task<ActionResult<AuthResponseDTO>> ConfirmEmail([FromQuery] string email, [FromQuery] string token)
    {
        var response = await _emailConfirmationService.ConfirmEmailAsync(email, token);
        return response.Success ? Ok(response) : BadRequest(response);
    }

    [HttpPost("resend-confirmation")]
    public async Task<ActionResult<AuthResponseDTO>> ResendConfirmation([FromBody] ResendConfirmationDTO model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null)
        {
            return BadRequest(new AuthResponseDTO
            {
                Success = false,
                Message = "User not found."
            });
        }

        if (await _userManager.IsEmailConfirmedAsync(user))
        {
            return BadRequest(new AuthResponseDTO
            {
                Success = false,
                Message = "Email address already verified."
            });
        }

        var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);

        var encodedToken = TokenHelper.Encode(token);

        var confirmationLink = $"{Request.Scheme}://{Request.Host}/api/auth/confirm-email?email={user.Email}&token={encodedToken}";

        Console.WriteLine($"Resending confirmation link: {confirmationLink}");

        await _authService.SendEmailConfirmationAsync(user.Email, confirmationLink);

        return Ok(new AuthResponseDTO
        {
            Success = true,
            Message = "Verification email resent."
        });
    }

    [HttpPost("logout")]
    public ActionResult<AuthResponseDTO> Logout()
    {
        Response.Cookies.Delete("jwt", new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None
        });

        return Ok(new AuthResponseDTO
        {
            Success = true,
            Message = "Successfully logged out."
        });
    }

    [HttpGet("check-email-status")]
    public async Task<ActionResult<AuthResponseDTO>> CheckEmailStatus([FromQuery] string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
        {
            return BadRequest(new AuthResponseDTO
            {
                Success = false,
                Message = "User not found."
            });
        }

        var isEmailConfirmed = await _userManager.IsEmailConfirmedAsync(user);

        return Ok(new AuthResponseDTO
        {
            Success = true,
            Message = isEmailConfirmed ? "Email is confirmed." : "Email is not confirmed."
        });
    }

    [HttpGet("user-info")]
    [Authorize]
    public async Task<ActionResult<object>> GetUserInfo()
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { success = false, message = "User not authenticated" });
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound(new { success = false, message = "User not found" });
            }

            return Ok(new
            {
                success = true,
                id = user.Id,
                email = user.Email,
                nameSurname = user.NameSurname,
                initials = NameHelper.GetInitials(user.NameSurname)
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, message = ex.Message });
        }
    }

    [HttpPost("change-password")]
    [Authorize]
    public async Task<ActionResult<AuthResponseDTO>> ChangePassword([FromBody] ChangePasswordDTO model)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new AuthResponseDTO { Success = false, Message = "User not authenticated" });
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound(new AuthResponseDTO { Success = false, Message = "User not found" });
            }

            var isCurrentPasswordValid = await _userManager.CheckPasswordAsync(user, model.CurrentPassword);
            if (!isCurrentPasswordValid)
            {
                return BadRequest(new AuthResponseDTO { Success = false, Message = "Current password is incorrect" });
            }

            if (model.NewPassword != model.ConfirmPassword)
            {
                return BadRequest(new AuthResponseDTO { Success = false, Message = "New password and confirmation password do not match" });
            }

            var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
            if (!result.Succeeded)
            {
                return BadRequest(new AuthResponseDTO
                {
                    Success = false,
                    Message = "Failed to change password",
                    Errors = result.Errors.Select(e => e.Description).ToList()
                });
            }

            return Ok(new AuthResponseDTO { Success = true, Message = "Password changed successfully" });
        }
        catch (Exception ex)
        {
            return BadRequest(new AuthResponseDTO { Success = false, Message = ex.Message });
        }
    }
}