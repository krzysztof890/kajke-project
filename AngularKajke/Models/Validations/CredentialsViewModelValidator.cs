using FluentValidation;

namespace AngularKajke.Models.Validations
{
  public class CredentialsViewModelValidator : AbstractValidator<CredentialsViewModel>
  {
    public CredentialsViewModelValidator()
    {
      RuleFor(vm => vm.Email).NotEmpty().WithMessage("Email nie moze byc pusty")
        .EmailAddress().WithMessage("Adres musi być adresem email")
        .MinimumLength(4).WithMessage("Email musi miec wiecej niz 4 znaki");
      RuleFor(vm => vm.Password).NotEmpty().WithMessage("Hasło nie moze byc puste")
        .MinimumLength(6).WithMessage("Hasło musi miec wiecej niz 6 znaki");
    }
  }

  public class GenerateChangeEmailTokenModelValidator : AbstractValidator<GenerateChangeEmailTokenModel>
  {
    public GenerateChangeEmailTokenModelValidator()
    {
      RuleFor(vm => vm.Email).NotEmpty().WithMessage("Adres email nie może być pusty").EmailAddress().WithMessage("Nieprawidłowy format adresu email");
    }
  }

  public class ChangeEmailModelValidator : AbstractValidator<ChangeEmailModel>
  {
    public ChangeEmailModelValidator()
    {
      RuleFor(vm => vm.NewEmail).NotEmpty().WithMessage("Adres email nie może być pusty").EmailAddress().WithMessage("Nieprawidłowy format adresu email");
      RuleFor(vm => vm.Code).NotEmpty().WithMessage(" Kod tokenu nie może być pusty");
    }
  }

  public class ChangePasswordModelValidator : AbstractValidator<ChangePasswordModel>
  {
    public ChangePasswordModelValidator()
    {
      RuleFor(vm => vm.CurrentPassword).NotEmpty().WithMessage("Obecne hasło nie może być puste").MinimumLength(6).WithMessage("Minimalna długośc hasła musi wynosić 6 znaków");
      RuleFor(vm => vm.NewPassword).NotEmpty().WithMessage("Obecne hasło nie może być puste").MinimumLength(6).WithMessage("Minimalna długośc hasła musi wynosić 6 znaków")
        .NotEqual(vm => vm.CurrentPassword).WithMessage("Nowe hasło musi być różne od obecnego");
    }
  }
}
