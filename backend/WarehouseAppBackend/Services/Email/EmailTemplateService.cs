namespace WarehouseAppBackend.Services.Email;

public interface IEmailTemplateService
{
    string GetEmailConfirmationTemplate(string nameSurname, string confirmationLink);
}

public class EmailTemplateService : IEmailTemplateService
{
    public string GetEmailConfirmationTemplate(string nameSurname, string confirmationLink)
    {
        return $@"
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Email Verification</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }}
        .container {{
            background-color: #f9f9f9;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            text-align: center;
        }}
        .header {{
            color: #2c3e50;
            margin-bottom: 20px;
        }}
        .button {{
            display: inline-block;
            background-color: #3498db;
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
            transition: background-color 0.3s;
        }}
        .button:hover {{
            background-color: #2980b9;
        }}
        .footer {{
            margin-top: 30px;
            font-size: 12px;
            color: #7f8c8d;
        }}
        .logo {{
            margin-bottom: 20px;
        }}
        .divider {{
            border-top: 1px solid #eee;
            margin: 20px 0;
        }}
    </style>
</head>
<body>
    <div class='container'>
        <div class='logo'>
            <h1 style='color: #2c3e50;'>Warehouse App</h1>
        </div>
        <div class='header'>
            <h2>Verify Your Email Address</h2>
        </div>
       <p>Hello {nameSurname},</p>
       <p>Welcome to Warehouse App! To activate your account, please click the button below.</p>
       <a href='{confirmationLink}' class='button'>Verify My Email Address</a>
       <div class='divider'></div>
       <p>If the button doesn't work, you can copy and paste the link below into your browser:</p>
       <p style='word-break: break-all;'>{confirmationLink}</p>
       <div class='footer'>
       <p>This email was sent by Warehouse App.</p>
        <p>© {DateTime.Now.Year} Warehouse App. All rights reserved.</p>
        </div>
    </div>
    </body>
    </html>";
    }
}