using FluentValidation;
using System;
using System.Collections.Generic;
using System.Net.Mail;

namespace AngularKajke.Models.Validations
{
  public class SendEmailsInvitesForSurveyModelValidator : AbstractValidator<SendEmailsInvitesForSurveyModel>
  {
    public SendEmailsInvitesForSurveyModelValidator()
    {
      RuleFor(vm => vm.Emails).NotEmpty().WithMessage("Brak adresów email").Must(x => ValidateEmails(x)).WithMessage("Nie poprawny format adresu email");
    }

    private bool ValidateEmails(IEnumerable<string> emails)
    {
      if (emails == null) return false;
      foreach (var item in emails)
      {
        try
        {   // przeiteruj po wartosci w kolekcjo emails jesli uda sie utworzyc nowy MailAddress to jest to poprawny adress email
          MailAddress m = new MailAddress(item);
        }
        catch (FormatException)
        {
          return false;
        }
      }
      return true;
    }
  }
}
