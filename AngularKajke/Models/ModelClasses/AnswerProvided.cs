namespace AngularKajke.Models.ModelClasses
{
  public class AnswerProvided
  {
    private int _answerNumber;

    public AnswerType AnswerType { get; set; }
    public short QuestionNumber { get; set; }

    public int AnswerNumber
    {
      get
      {
        return _answerNumber == default(int) ? 1 : _answerNumber;
      }
      set
      {
        _answerNumber = value;
      }
    }

    public string AnswerResult { get; set; }
  }
}
