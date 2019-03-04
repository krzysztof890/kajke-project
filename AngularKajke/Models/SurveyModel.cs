using AngularKajke.Models.ModelClasses;
using System.Collections.ObjectModel;

namespace AngularKajke.Models
{
  public class SurveyModel
  {
    public string Name { get; set; }
    public string Description { get; set; }
    public Collection<Question> Questions { get; set; }
  }
}
