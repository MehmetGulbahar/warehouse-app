using WarehouseAppBackend.Models;
using WarehouseAppBackend.Models.DTOs;
using WarehouseAppBackend.Services;
using WarehouseAppBackend.Services.Email;
using WarehouseAppBackend.Services.Token;


public interface IEmailConfirmationSender
{
    Task SendConfirmationAsync(User user, string confirmationLink);
}

public class EmailConfirmationSender : IEmailConfirmationSender
{
    private readonly IEmailService _emailService;
    private readonly IEmailTemplateService _templateService;

    public EmailConfirmationSender(IEmailService emailService, IEmailTemplateService templateService)
    {
        _emailService = emailService;
        _templateService = templateService;
    }

    public async Task SendConfirmationAsync(User user, string confirmationLink)
    {
        var htmlBody = _templateService.GetEmailConfirmationTemplate(user.NameSurname, confirmationLink);
        await _emailService.SendEmailAsync(user.Email, "Warehouse App - Email Verification", htmlBody);
    }
}
