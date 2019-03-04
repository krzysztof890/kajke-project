using AngularKajke.Classes;
using AngularKajke.Interfaces;
using Microsoft.Extensions.Options;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;

namespace AngularKajke.Services
{
  /// <summary>
  /// Klasa ktora sluzy do generowania tokenu
  /// </summary>
  public class JwtFactory : IJwtFactory
  {
    private readonly JwtIssuerOptions _jwtOptions;

    public JwtFactory(IOptions<JwtIssuerOptions> jwtOptions)
    {
      _jwtOptions = jwtOptions.Value;
      ThrowIfInvalidOptions(_jwtOptions);
    }

    /// <summary>
    /// Tworzy zakodowany token
    /// </summary>
    /// <param name="userName">Nazwa uzytkownika/param>
    /// <param name="identity"></param>
    /// <returns>Zakodowany Token</returns>
    public async Task<string> GenerateEncodedTokenAync(string userName, ClaimsIdentity identity)
    {
      var claims = new[]
      {
                       new Claim(JwtRegisteredClaimNames.Sub, userName),
                       new Claim(JwtRegisteredClaimNames.Jti, await _jwtOptions.JtiGenerator()),
                       new Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(_jwtOptions.IssuedAt).ToString(), ClaimValueTypes.Integer64),
                       identity.FindFirst(Helpers.Constants.Strings.JwtClaimIdentifiers.Rol),
                       identity.FindFirst(Helpers.Constants.Strings.JwtClaimIdentifiers.Id)
            };

      //Stworz token JWT
      var jwt = new JwtSecurityToken(
          issuer: _jwtOptions.Issuer,
          audience: _jwtOptions.Audience,
          claims: claims,
          notBefore: _jwtOptions.NotBefore,
          expires: _jwtOptions.Expiration,
          signingCredentials: _jwtOptions.SigningCredentials);

      var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

      return encodedJwt;
    }

    /// <summary>
    /// Tworzy okreslona tożsamość dla poświadczania tozsamości
    /// </summary>
    /// <param name="userName"></param>
    /// <param name="id"></param>
    /// <returns></returns>
    public ClaimsIdentity GenerateClaimsIdentity(string userName, string id)
    {
      return new ClaimsIdentity(new GenericIdentity(userName, "Token"), new[]
      {
                      new Claim(Helpers.Constants.Strings.JwtClaimIdentifiers.Id, id),
                      new Claim(Helpers.Constants.Strings.JwtClaimIdentifiers.Rol, Helpers.Constants.Strings.JwtClaims.ApiAccess)
            });
    }

    private static long ToUnixEpochDate(DateTime date)
      => (long)Math.Round((date.ToUniversalTime() -
                           new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero))
                          .TotalSeconds);

    // walidacja ustawien
    private static void ThrowIfInvalidOptions(JwtIssuerOptions options)
    {
      if (options == null) throw new ArgumentNullException(nameof(options));

      if (options.ValidFor <= TimeSpan.Zero)
      {
        throw new ArgumentException("Must be a non-zero TimeSpan.", nameof(JwtIssuerOptions.ValidFor));
      }

      if (options.SigningCredentials == null)
      {
        throw new ArgumentNullException(nameof(JwtIssuerOptions.SigningCredentials));
      }

      if (options.JtiGenerator == null)
      {
        throw new ArgumentNullException(nameof(JwtIssuerOptions.JtiGenerator));
      }
    }
  }
}
