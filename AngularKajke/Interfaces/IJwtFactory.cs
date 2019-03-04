using System.Security.Claims;
using System.Threading.Tasks;

namespace AngularKajke.Interfaces
{
  public interface IJwtFactory
  {
    Task<string> GenerateEncodedTokenAync(string userName, ClaimsIdentity identity);

    ClaimsIdentity GenerateClaimsIdentity(string userName, string id);
  }
}
