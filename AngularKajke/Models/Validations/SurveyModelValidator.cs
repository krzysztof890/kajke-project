using FluentValidation;

namespace AngularKajke.Models.Validations
{
  public class SurveyModelValidator : AbstractValidator<SurveyModel>
  {
    public SurveyModelValidator()
    {
      RuleFor(vm => vm.Name).NotEmpty().WithMessage(" Nazwa ankiety nie może być pusta ").MaximumLength(160).WithMessage(" Przekroczona maksymalna długość 160 znaków. ");
      RuleFor(vm => vm.Description).NotEmpty().WithMessage(" Opis ankiety nie może być pusta ").MaximumLength(1500).WithMessage(" Przekroczona maksymalna długość 1500 znaków. ");
      RuleFor(vm => vm.Questions).NotEmpty().SetCollectionValidator(new QuestionValidator());
    }
  }
}
