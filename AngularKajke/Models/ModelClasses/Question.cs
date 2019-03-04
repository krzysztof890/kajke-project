namespace AngularKajke.Models.ModelClasses
{
  public class Question
  {
    public string Query { get; set; }
    public short QuestionNumber { get; set; }
    public AnswerType AnswerType { get; set; }
    public string[] Answers { get; set; }
    public bool IsOptional { get; set; }
  }
}
