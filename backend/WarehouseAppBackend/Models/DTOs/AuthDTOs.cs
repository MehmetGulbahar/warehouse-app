namespace WarehouseAppBackend.Models.DTOs;

public class RegisterDTO
{
    public string NameSurname { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string PasswordConfirm { get; set; } = string.Empty;
}

public class LoginDTO
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class AuthResponseDTO
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public string? Token { get; set; }
    public List<string>? Errors { get; set; }
}

public class ResendConfirmationDTO
{
    public string Email { get; set; } = string.Empty;
}