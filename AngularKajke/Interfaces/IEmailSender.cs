using AngularKajke.Classes;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AngularKajke.Interfaces
{
  public interface IEmailSender
  {
    /// <summary>
    /// Wyslij wiadomosc na wskazany adres email.
    /// </summary>
    /// <param name="email">Docelow adres</param>
    /// <param name="subject">Temat email</param>
    /// <param name="message">Treść wiadomości</param>
    /// <returns></returns>
    Task<OperationResult> SendEmailAsync(string email, string subject, string message);

    /// <summary>
    /// Wyslij wiadomosc na wskazaną kolekcje adresow email.
    /// </summary>
    /// <param name="email">Docelow adres</param>
    /// <param name="subject">Temat email</param>
    /// <param name="message">Treść wiadomości</param>
    /// <returns></returns>
    Task<OperationResult> SendEmailsAsync(IEnumerable<string> emails, string subject, string message);
  }
}
