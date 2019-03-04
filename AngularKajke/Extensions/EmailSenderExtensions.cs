using AngularKajke.Classes;
using AngularKajke.Interfaces;
using System.Collections.Generic;
using System.IO;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace AngularKajke.Extensions
{
  public static class EmailSenderExtensions
  {
    #region Private Members

    // zdefiniowane pole w dokomencie html ktore moga zostac wypełnione
    private const string _tokenField = "{{code}}";

    private const string _footerField = "{{footer}}";
    private const string _userField = "{{user}}";

    #endregion Private Members

    #region Public Methods

    /// <summary>
    /// wysyła email potwierdzajacy rejestracje uzytkownika
    /// </summary>
    /// <param name="emailSender"></param>
    /// <param name="email">adres email odbiorcy</param>
    /// <param name="link">wygenerowany link potwierdzjacy</param>
    /// <returns></returns>
    public static Task<OperationResult> SendEmailConfirmationAsync(this IEmailSender emailSender, HtmlMessages messages, string email, string link)
    {
      return emailSender.SendEmailAsync(email, "Potwierdz swoj adres email", GetHtmlMessage(messages.EmailConfirmationMessage, messages,
        new KeyValuePair<string, string>(_tokenField, link),
        new KeyValuePair<string, string>(_footerField, GetHtmlMessage(messages.AutomaticMessageFooter, messages))));
    }

    /// <summary>
    /// Wyslij email odpowiedzialny za zresetowanie hasła
    /// </summary>
    /// <param name="emailSender"></param>
    /// <param name="email"></param>
    /// <param name="link"></param>
    /// <returns></returns>
    public static Task<OperationResult> SendEmailForResetPasswordAsync(this IEmailSender emailSender, HtmlMessages messages, string email, string link)
    {
      return emailSender.SendEmailAsync(email, "Zresetuj swoje hasło", GetHtmlMessage(messages.ResetPasswordMessage, messages,
       new KeyValuePair<string, string>(_tokenField, HtmlEncoder.Default.Encode(link)),
       new KeyValuePair<string, string>(_footerField, GetHtmlMessage(messages.AutomaticMessageFooter, messages))));
    }

    /// <summary>
    /// Wyślij zaproszenia email do ankiety
    /// </summary>
    /// <param name="emailSender"></param>
    /// <param name="emails"></param>
    /// <param name="link"></param>
    /// <returns></returns>
    public static Task<OperationResult> SendEmailsInvitesForSurveyAsync(this IEmailSender emailSender, HtmlMessages messages, IEnumerable<string> emails, string link, string userName)
    {
      return emailSender.SendEmailsAsync(emails, "Zaproszenie do wypełnienia ankiety",
        GetHtmlMessage(messages.InviteForSurveyMessage, messages, new KeyValuePair<string, string>(_tokenField, link),
        new KeyValuePair<string, string>(_footerField, GetHtmlMessage(messages.AutomaticMessageFooter, messages)),
        new KeyValuePair<string, string>(_userField, userName)));
    }

    public static Task<OperationResult> SendChangeEmailAsync(this IEmailSender emailSender, HtmlMessages messages, string email, string link)
    {
      return emailSender.SendEmailAsync(email, "Zmień swoj adres email", GetHtmlMessage(messages.ChangeEmailMessage, messages,
        new KeyValuePair<string, string>(_tokenField, link),
        new KeyValuePair<string, string>(_footerField, GetHtmlMessage(messages.AutomaticMessageFooter, messages))));
    }

    #endregion Public Methods

    #region Private Methods

    /// <summary>
    /// Pobierz tresc wiadomosci w html i wstaw odpowiednie wartosci
    /// </summary>
    /// <param name="htmlMessageName">Identyfikator wybranej widomosci</param>
    /// <param name="keyValuePair"> Pole ktore chcesz uzupełnić i wartosc</param>
    /// <returns>Gotowa tresc wiadmosci email</returns>
    private static string GetHtmlMessage(string htmlMessageName, HtmlMessages settings, params KeyValuePair<string, string>[] keyValuePair)
    {
      string path = Path.Combine(settings.GetStoragePath, htmlMessageName);
      if (!File.Exists(path)) return "brak zdefiniowanej wiadomosci";
      var message = File.ReadAllText(path);
      foreach (var item in keyValuePair)
      {
        message = message.Replace(item.Key, item.Value);
      }
      return message;
    }

    /// <summary>
    /// Pobierz tresc wiadomosci w html
    /// </summary>
    /// <param name="htmlMessageName">Identyfikator wybranej widomosci</param>
    private static string GetHtmlMessage(string htmlMessageName, HtmlMessages settings)
    {
      string path = Path.Combine(settings.GetStoragePath, htmlMessageName);
      if (!File.Exists(path)) return "brak zdefiniowanej wiadomosci";
      return File.ReadAllText(path);
    }

    #endregion Private Methods
  }
}
