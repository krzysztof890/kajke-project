using Microsoft.AspNetCore.Http;

namespace AngularKajke.Extensions
{
  public static class ResponseExtensions
  {
    /// <summary>
    /// Dodaje błedy do HttpResponse
    /// </summary>
    /// <param name="response"></param>
    /// <param name="message">Wiadomosc błedu</param>
    public static void AddApplicationError(this HttpResponse response, string message)
    {
      response.Headers.Add("Application-Error", message);
      // CORS
      response.Headers.Add("access-control-expose-headers", "Application-Error");
    }
  }
}
