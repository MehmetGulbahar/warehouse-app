public interface ITokenUtilityService
{
    string Decode(string token);
    string Encode(string token);
}
