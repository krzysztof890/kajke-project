using FluentValidation;

namespace AngularKajke.Models.Validations
{
  public class ResetPasswordViewModelValidator : AbstractValidator<ResetPasswordViewModel>
  {
    public ResetPasswordViewModelValidator()
    {
      RuleFor(vm => vm.Email).NotEmpty().WithMessage("Email nie moze byc pusty")
       .EmailAddress().WithMessage("Adres musi być adresem email")
       .MinimumLength(4).WithMessage("Email musi miec wiecej niz 4 znaki");
      RuleFor(vm => vm.Password).NotEmpty().WithMessage("Hasło nie moze byc puste")
        .MinimumLength(6).WithMessage("Hasło musi miec wiecej niz 6 znaki");
      RuleFor(vm => vm.Code).NotEmpty().WithMessage("Uszkodzony link");
    }
  }
}
