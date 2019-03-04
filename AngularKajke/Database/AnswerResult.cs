namespace AngularKajke.Database
{
  public partial class AnswerResult
  {
    public int Id { get; set; }
    public string Result { get; set; }
    public int IdAnswer { get; set; }

    public Answers IdAnswerNavigation { get; set; }
  }
}
