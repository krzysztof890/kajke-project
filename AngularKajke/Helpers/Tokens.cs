using AngularKajke.Classes;
using AngularKajke.Interfaces;
using Newtonsoft.Json;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AngularKajke.Helpers
{
  public class Tokens
  {
    /// <summary>
    /// Helper ktory stworzony token autentykacji zwraca w formacie json
    /// </summary>
    /// <param name="identity"></param>
    /// <param name="jwtFactory"></param>
    /// <param name="userName"></param>
    /// <param name="jwtOptions"></param>
    /// <param name="serializerSettings"></param>
    /// <returns></returns>
    public static async Task<string> GenerateJwt(ClaimsIdentity identity, IJwtFactory jwtFactory, string userName, JwtIssuerOptions jwtOptions, JsonSerializerSettings serializerSettings)
    {
      var response = new
      {
        user_name = userName,
        auth_token = await jwtFactory.GenerateEncodedTokenAync(userName, identity),
      };

      return JsonConvert.SerializeObject(response, serializerSettings);
    }
  }
}
