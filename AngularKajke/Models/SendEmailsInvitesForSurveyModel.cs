using AngularKajke.Models.Validations;
using FluentValidation.Attributes;
using System.Collections.Generic;

namespace AngularKajke.Models
{
  [Validator(typeof(SendEmailsInvitesForSurveyModelValidator))]
  public class SendEmailsInvitesForSurveyModel
  {
    public IEnumerable<string> Emails { get; set; }
  }
}
