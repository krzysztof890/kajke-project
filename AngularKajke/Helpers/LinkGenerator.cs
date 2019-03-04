using System.Net;

namespace AngularKajke.Helpers

{
  /// <summary>
  /// Pomocnik do generowania linkow
  /// </summary>
  public static class LinkGenerator
  {
    private static readonly string baseUrl = "http://localhost:4200";

    /// <summary>
    /// Zrwoci link ktory umozliwi potwierdzenie adresu email
    /// </summary>
    /// <param name="userId">ID użytkownika</param>
    /// <param name="code">kod tokena do potwierdzenia adresu email</param>
    /// <returns></returns>
    public static string EmailConfirmationLink(string userId, string code)
    {
      //encoduj token by nie bylo problemow
      return baseUrl + $"/confirm?userId={userId}&code={WebUtility.UrlEncode(code)}";
    }

    /// <summary>
    /// Zwroci link kotry umozli zresetowanie hasła użytkownika
    /// </summary>
    /// <param name="code">kod tokena wygenerowanego do zresetowania hasła</param>
    /// <returns></returns>
    public static string ResetPasswordLink(string code)
    {
      //encoduj token by nie bylo problemow
      return baseUrl + $"/reset?code={WebUtility.UrlEncode(code)}";
    }

    /// <summary>
    /// Zrwoci link ktory umozliwi zmiane adresu email
    /// </summary>
    /// <param name="userId">ID użytkownika</param>
    /// <param name="code">kod tokena do potwierdzenia adresu email</param>
    /// <returns></returns>
    public static string ChangeEmailLink(string code, string newEmail)
    {
      //encoduj token by nie bylo problemow
      return baseUrl + $"/settings/confirmchange?code={WebUtility.UrlEncode(code)}&newemail={newEmail}";
    }
  }
}
