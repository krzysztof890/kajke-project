using Microsoft.DotNet.PlatformAbstractions;
using System.IO;

namespace AngularKajke.Classes
{
  public class AppSettings
  {
    public HtmlMessages HtmlMessages { get; set; }
    public SurveyOptions SurveyOptions { get; set; }
    public EmailOptions EmailOptions { get; set; }
  }

  public class HtmlMessages
  {
    public string InviteForSurveyMessage { get; set; }
    public string ResetPasswordMessage { get; set; }
    public string AutomaticMessageFooter { get; set; }
    public string EmailConfirmationMessage { get; set; }
    public string ChangeEmailMessage { get; set; }
    public string RelativePath { get; set; }
    public string AbsolutePath { get; set; }

    /// <summary>
    /// Pobierz sciezkie do katalogu wiadomości. Jesli nie jest ustawiona AbsolutePath to zwroci ApplicationBasePath plus RelativPath
    /// Jeśli nic nie jest zdefiniowane zwróci domyslna sciezkie.
    /// </summary>
    public string GetStoragePath => !string.IsNullOrEmpty(AbsolutePath) ? AbsolutePath :
     Path.Combine(ApplicationEnvironment.ApplicationBasePath, RelativePath) ?? Path.Combine(ApplicationEnvironment.ApplicationBasePath, "storage/htmlMsg");
  }

  public class SurveyOptions
  {
    private double _defaultCacheTime;
    public string RelativeStoragePath { get; set; }
    public string AbsoluteStoragePath { get; set; }

    public double DefaultCacheTime
    {
      get
      {
        return _defaultCacheTime != default(double) ? _defaultCacheTime : 3.0;
      }
      set
      {
        _defaultCacheTime = value;
      }
    }

    /// <summary>
    /// Pobierz sciezkie do katalogu ankiet. Jesli nie jest ustawiona AbsoluteStoragePath to zwroci ApplicationBasePath plus RelativeStoragePath
    /// Jeśli nic nie jest zdefiniowane zwróci domyslna sciezkie.
    /// </summary>
    public string GetStoragePath => !string.IsNullOrEmpty(AbsoluteStoragePath) ? AbsoluteStoragePath :
      Path.Combine(ApplicationEnvironment.ApplicationBasePath, RelativeStoragePath) ?? Path.Combine(ApplicationEnvironment.ApplicationBasePath, "storage/surveys");
  }

  /// <summary>
  /// Przechowuje ustawienia potrzebne do uslugi email sender
  /// </summary>
  public class EmailOptions
  {
    /// <summary>
    /// Adres email ktory ma byc uzyway do rozsylania wiadomosci
    /// </summary>
    public string Email { get; set; }

    /// <summary>
    /// Hasło do podane adresu email
    /// </summary>
    public string Password { get; set; }

    /// <summary>
    /// Adres hosta dostawcy podanego email
    /// </summary>
    public string Host { get; set; }

    /// <summary>
    /// Nr portu
    /// </summary>
    public int Port { get; set; }
  }
}
