using System.Text;

public static class TokenHelper
{
    public static string Encode(string token)
    {
        return Convert.ToBase64String(Encoding.UTF8.GetBytes(token));
    }

    public static string Decode(string encodedToken)
    {
        return Encoding.UTF8.GetString(Convert.FromBase64String(encodedToken));
    }
}
