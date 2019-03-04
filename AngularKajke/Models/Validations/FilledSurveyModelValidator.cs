using FluentValidation;

namespace AngularKajke.Models.Validations
{
  public class FilledSurveyModelValidator : AbstractValidator<FilledSurveyModel>
  {
    public FilledSurveyModelValidator()
    {
      RuleFor(vm => vm.AnswersProvided).NotEmpty().WithMessage("Brak udzielonych odpowiedzi").SetCollectionValidator(new AnswerProvidedValidator());
    }
  }
}
