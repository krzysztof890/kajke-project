using System.Collections.Generic;

namespace AngularKajke.Database
{
  public partial class Survey
  {
    public Survey()
    {
      Answers = new HashSet<Answers>();
    }

    public int IdSurvey { get; set; }
    public string Name { get; set; }
    public string Path { get; set; }
    public string IdUser { get; set; }
    public string Link { get; set; }
    public ICollection<Answers> Answers { get; set; }
  }
}
