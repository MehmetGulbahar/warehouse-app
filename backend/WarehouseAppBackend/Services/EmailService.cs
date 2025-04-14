using System.Net.Mail;
using Microsoft.Extensions.Configuration;

namespace WarehouseAppBackend.Services;

public interface IEmailService
{
    Task SendEmailAsync(string to, string subject, string body);
}

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmailAsync(string to, string subject, string body)
    {
        var emailSettings = _configuration.GetSection("EmailSettings");
        var smtpServer = emailSettings["SmtpServer"];
        var port = int.Parse(emailSettings["Port"]);
        var username = emailSettings["Username"];
        var password = emailSettings["Password"];
        var from = emailSettings["From"];

        using var client = new SmtpClient(smtpServer, port)
        {
            EnableSsl = true,
            Credentials = new System.Net.NetworkCredential(username, password)
        };

        using var message = new MailMessage
        {
            From = new MailAddress(from, "Warehouse App"),
            Subject = subject,
            Body = body,
            IsBodyHtml = true
        };

        message.To.Add(to);

        await client.SendMailAsync(message);
    }
}