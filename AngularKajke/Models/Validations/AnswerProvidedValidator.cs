using AngularKajke.Models.ModelClasses;
using FluentValidation;

namespace AngularKajke.Models.Validations
{
  public class AnswerProvidedValidator : AbstractValidator<AnswerProvided>
  {
    public AnswerProvidedValidator()
    {
      RuleFor(vm => vm.AnswerType).NotNull().WithMessage("Brak typu pytania.");
      RuleFor(vm => vm.QuestionNumber).NotNull().WithMessage("Brak nr odpwiedzi.");
      RuleFor(vm => vm.AnswerResult).MaximumLength(300).WithMessage("Przekroczono maksymalną długość odpowiedzi.");
    }
  }
}
