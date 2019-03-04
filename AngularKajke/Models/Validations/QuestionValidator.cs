using AngularKajke.Models.ModelClasses;
using FluentValidation;
using System.Linq;

namespace AngularKajke.Models.Validations
{
  public class QuestionValidator : AbstractValidator<Question>
  {
    public QuestionValidator()
    {
      RuleFor(vm => vm.Query).NotEmpty().MaximumLength(400).WithMessage("Przekroczona maksymalna długość 400 znaków. ");
      RuleFor(vm => vm.AnswerType).NotEmpty().WithMessage("Typ pytania nie może pozostać pusty. ");
      RuleFor(vm => vm.QuestionNumber).NotEmpty().WithMessage("Numer pytania nie może pozostać pusty. ");
      RuleFor(vm => vm.Answers).Must(x => ValidateAnswers(x, 300)).WithMessage("Długość odpowiedzy musi być miedzy 1 a 300 znakami. ");
    }

    /// <summary>
    /// Sprawdza czy odpowiedz spełnia okreslone wymagania
    /// </summary>
    /// <param name="answers">Tablica odpowiedzi</param>
    /// <param name="max">Długośc odpowiedzi</param>
    /// <returns></returns>
    private bool ValidateAnswers(string[] answers, int max)
    {
      foreach (var answer in answers ?? Enumerable.Empty<string>())
      {
        if ((string.IsNullOrWhiteSpace(answer)) || answer.Length > max) { return false; };
      }
      return true;
    }
  }
}
