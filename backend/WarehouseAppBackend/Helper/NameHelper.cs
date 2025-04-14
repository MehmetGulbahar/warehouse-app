namespace WarehouseAppBackend.Helper;

public static class NameHelper
{
    public static string GetInitials(string nameSurname)
    {
        if (string.IsNullOrEmpty(nameSurname))
            return "??";

        var parts = nameSurname.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        if (parts.Length == 0)
            return "??";
        if (parts.Length == 1)
            return parts[0].Substring(0, Math.Min(2, parts[0].Length)).ToUpper();

        return (parts[0][0].ToString() + parts[^1][0].ToString()).ToUpper();
    }
}
