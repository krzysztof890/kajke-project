using System.Collections.Generic;

namespace AngularKajke.Database
{
  public partial class Answers
  {
    public Answers()
    {
      AnswerResult = new HashSet<AnswerResult>();
    }

    public int IdAnswer { get; set; }
    public short QuestionNumber { get; set; }
    public int? AnswerCounter { get; set; }
    public int IdSurvey { get; set; }
    public byte AnswerType { get; set; }
    public int AnswerNumber { get; set; }

    public Survey IdSurveyNavigation { get; set; }
    public ICollection<AnswerResult> AnswerResult { get; set; }
  }
}
