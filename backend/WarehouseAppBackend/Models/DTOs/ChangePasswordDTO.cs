using System.ComponentModel.DataAnnotations;

namespace WarehouseAppBackend.Models.DTOs
{
    public class ChangePasswordDTO
    {
        [Required(ErrorMessage = "Current password is required")]
        public string CurrentPassword { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "New password is required")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long", MinimumLength = 8)]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$", 
            ErrorMessage = "Password must be at least 8 characters and contain at least one lowercase letter, one uppercase letter, one digit, and one special character")]
        public string NewPassword { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "Confirm password is required")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}