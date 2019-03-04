using AngularKajke.Models.ModelClasses;
using AngularKajke.Models.Validations;
using FluentValidation.Attributes;
using System.Collections.ObjectModel;

namespace AngularKajke.Models
{
  [Validator(typeof(FilledSurveyModelValidator))]
  public class FilledSurveyModel
  {
    public Collection<AnswerProvided> AnswersProvided { get; set; }
  }
}
