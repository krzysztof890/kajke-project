using AngularKajke.Models.Validations;
using FluentValidation.Attributes;

namespace AngularKajke.Models
{
  [Validator(typeof(ResetPasswordViewModelValidator))]
  public class ResetPasswordViewModel
  {
    public string Email { get; set; }
    public string Password { get; set; }
    public string Code { get; set; }
  }
}
