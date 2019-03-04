using AngularKajke.Classes;
using System.Threading.Tasks;

namespace AngularKajke.Interfaces
{
  public interface ISurveyManager<TSurveyModel, TFillingModel>
  {
    /// <summary>
    /// Utworzy wpis w bazie danych nowej ankiety i zapisza ja w folderze uzytkownika
    /// </summary>
    /// <param name="userID">Id uzytkownika</param>
    /// <param name="surveyModel">Dane ankiety w formacie zdefiniowanego modelu</param>
    Task<OperationResult> CreateSurveyAsync(string userNameIdentifier, TSurveyModel surveyModel);

    /// <summary>
    /// Edytuj ankiete użytkownika w serwisie.
    /// </summary>
    /// <param name="link">identyfikator ankiety</param>
    /// <param name="surveyModel">model ankiety</param>
    /// <param name="userNameIdentifier">identyikator użytkownika</param>
    /// <returns></returns>
    Task<OperationResult> EditSurveyAsync(string link, TSurveyModel surveyModel, string userNameIdentifier, bool structureWasChanged);

    /// <summary>
    /// Zwróc liste ankiet użytkownika wraz z linkami do nich
    /// </summary>
    /// <param name="userID"></param>
    Task<OperationResult<object>> GetUserSurveysAsync(string userNameIdentifier);

    /// <summary>
    /// Usuń wybrana ankiete użytkownika
    /// </summary>
    /// <param name="link">Link do ankiety</param>
    /// <returns></returns>
    Task<OperationResult> DeleteSurveyAsync(string link, string userNameIdentifier);

    /// <summary>
    /// Zwroc wybrana ankiete uzytkownika
    /// </summary>
    /// <param name="link"></param>
    /// <returns></returns>
    Task<OperationResult<string>> GetSurveyAsync(string link);

    /// <summary>
    /// Dodaj wynik ankiety do bazy danych
    /// </summary>
    /// <param name="link">identyfikator ankiety</param>
    /// <returns></returns>
    Task<OperationResult> FillSurveyAsync(string link, TFillingModel model);

    /// <summary>
    /// Zwraca wyniki ankiety.
    /// </summary>
    /// <param name="link">identyfikator ankiety</param>
    /// <param name="userNameIdentifier">nazwa uzytkownika</param>
    /// <returns></returns>
    Task<OperationResult<object>> GetSurveyResultAsync(string link, string userNameIdentifier);
  }
}
