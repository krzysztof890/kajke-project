using AngularKajke.Models.Validations;
using FluentValidation.Attributes;

namespace AngularKajke.Models
{
  [Validator(typeof(CredentialsViewModelValidator))]
  public class CredentialsViewModel
  {
    public string Email { get; set; }
    public string Password { get; set; }
  }

  [Validator(typeof(GenerateChangeEmailTokenModelValidator))]
  public class GenerateChangeEmailTokenModel
  {
    public string Email { get; set; }
  }

  [Validator(typeof(ChangeEmailModelValidator))]
  public class ChangeEmailModel
  {
    public string NewEmail { get; set; }
    public string Code { get; set; }
  }

  [Validator(typeof(ChangePasswordModelValidator))]
  public class ChangePasswordModel
  {
    public string CurrentPassword { get; set; }
    public string NewPassword { get; set; }
  }

  public class DeleteUserModel
  {
    public string Password { get; set; }
  }
}
