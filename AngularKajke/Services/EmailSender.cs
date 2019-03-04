using AngularKajke.Classes;
using AngularKajke.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace AngularKajke.Services
{
  /// <summary>
  /// Klasa słuzaca do wysłania maila
  /// </summary>
  public class EmailSender : IEmailSender, IDisposable
  {
    #region Private Members

    private readonly IConfiguration _configuration;
    private readonly EmailOptions _emailOptions;
    private readonly SmtpClient _smtpClient;

    #endregion Private Members

    #region Constructor

    public EmailSender(IConfiguration configuration, IOptions<AppSettings> options)
    {
      _configuration = configuration;
      _emailOptions = options.Value.EmailOptions;
      _smtpClient = new SmtpClient()
      {
        UseDefaultCredentials = false,
        Credentials = new NetworkCredential()
        {
          UserName = _emailOptions.Email,
          Password = _emailOptions.Password
        },

        Host = _emailOptions.Host,
        Port = _emailOptions.Port,
        EnableSsl = true
      };
    }

    #endregion Constructor

    public void Dispose()
    {
      _smtpClient?.Dispose();
    }

    /// <summary>
    /// Wysyłanie maila na wskazany adres email o podanej przez nas tresci i temacie ; tresc jest traktowana jako html
    /// </summary>
    /// <param name="email">email odbiorcy</param>
    /// <param name="subject">temat maila</param>
    /// <param name="message">tresc maila jako kod html</param>
    /// <returns></returns>
    public Task<OperationResult> SendEmailAsync(string email, string subject, string message)
    {
      //  //tworzy nowego maila i go wyslyla
      using (var emailMessage = new MailMessage())
      {
        emailMessage.IsBodyHtml = true;
        emailMessage.To.Add(new MailAddress(email));
        emailMessage.From = new MailAddress(_emailOptions.Email, "Kajke Ankiety", System.Text.Encoding.UTF8);
        emailMessage.Subject = subject;
        emailMessage.Body = message;
        try
        {
          //jesli przy wyslaniu wysteje problem z autoryzacja zmiejszyc poziom zabezpieczen lub wylaczyc dwuetapowa autoryzacje wolna amerykanka
          _smtpClient.Send(emailMessage); //wyslanie maila
        }
        catch (SmtpException e)
        {
          return Task.FromResult(new OperationResult((OperationError)e));
        }
      }

      return Task.FromResult(new OperationResult());
    }

    /// <summary>
    /// Wysyłanie maile na wskazane adresy email o podanej przez nas tresci i temacie ; tresc jest traktowana jako html
    /// </summary>
    /// <param name="email">email odbiorcy</param>
    /// <param name="subject">temat maila</param>
    /// <param name="message">tresc maila jako kod html</param>
    /// <returns></returns>
    public Task<OperationResult> SendEmailsAsync(IEnumerable<string> emails, string subject, string message)
    {
      using (var emailMessage = new MailMessage())
      {
        emailMessage.IsBodyHtml = true;
        foreach (var item in emails)
        {
          emailMessage.To.Add(new MailAddress(item));
        }
        emailMessage.From = new MailAddress(_emailOptions.Email, "Kajke Ankiety", System.Text.Encoding.UTF8);
        emailMessage.Subject = subject;
        emailMessage.Body = message;
        try
        {
          //jesli przy wyslaniu wystepuje problem z autoryzacja zmiejszyc poziom zabezpieczen lub wylaczyc dwuetapowa autoryzacje; wolna amerykanka
          _smtpClient.Send(emailMessage); //wyslanie maila
        }
        catch (SmtpException e)
        {
          return Task.FromResult(new OperationResult((OperationError)e));
        }
      }

      return Task.FromResult(new OperationResult());
    }
  }
}
