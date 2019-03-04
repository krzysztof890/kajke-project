using AngularKajke.Classes;
using AngularKajke.Extensions;
using AngularKajke.Helpers;
using AngularKajke.Interfaces;
using AngularKajke.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AngularKajke.Controllers
{
  /// <summary>
  /// Obsługuje żądania do api serwisu zwiazane z ankietami.
  /// </summary>
  [Authorize(Policy = "ApiUser")]
  [Route("api/[controller]/[action]")]
  public class SurveyController : Controller
  {
    #region Private Variables

    private readonly Lazy<ISurveyManager<SurveyModel, FilledSurveyModel>> _surveyManager;
    private readonly Lazy<IEmailSender> _emailSender;
    private readonly AppSettings _appSettings;

    #endregion Private Variables

    #region Constructor

    public SurveyController(Lazy<ISurveyManager<SurveyModel, FilledSurveyModel>> surveyManager, Lazy<IEmailSender> emailSender, IOptions<AppSettings> appSettings)
    {
      _surveyManager = surveyManager;
      _emailSender = emailSender;
      _appSettings = appSettings.Value;
    }

    #endregion Constructor

    #region Controller Actions

    /// <summary>
    /// Utworz ankiete uzytkownika w serwisie.
    /// </summary>
    /// <param name="model">Model ankiety</param>
    [HttpPost]
    public async Task<IActionResult> CreateSurvey([FromBody]SurveyModel model)
    {
      if (!ModelState.IsValid)
      {
        return new BadRequestObjectResult(ModelState);
      }
      var userNameIdentifier = User.FindFirst(Constants.Strings.JwtClaimIdentifiers.Id)?.Value;
      var operationResult = await _surveyManager.Value.CreateSurveyAsync(userNameIdentifier, model);
      // sprawdz wynik operacji
      if (operationResult.IsSuccessful) return new OkObjectResult(new { result = "succes" });
      else return new BadRequestObjectResult(Errors.AddOpperationErrorsToModelState(operationResult, ModelState));
    }

    /// <summary>
    /// Zwroc lista ankiet uzytkownika w serwisie.
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetUserSurveys()
    {
      var userNameIdentifier = User.FindFirst(Constants.Strings.JwtClaimIdentifiers.Id)?.Value;
      // zwroc aniety z db
      var result = await _surveyManager.Value.GetUserSurveysAsync(userNameIdentifier);
      // zrwoc tablice w json
      return new OkObjectResult(result.Result);
    }

    /// <summary>
    /// Usuwa wybrana ankiete uzytkownika.
    /// </summary>
    /// <param name="link">wygenerowany identyfikator ankiety./param>
    [HttpDelete]
    public async Task<IActionResult> DeleteSurvey([FromHeader]string link)
    {
      var userNameIdentifier = User.FindFirst(Constants.Strings.JwtClaimIdentifiers.Id)?.Value;
      var result = await _surveyManager.Value.DeleteSurveyAsync(link, userNameIdentifier);
      if (result.IsSuccessful)
      {
        return new OkObjectResult(new { result = "succes" });
      }
      else
      {
        return new BadRequestObjectResult(Errors.AddOpperationErrorsToModelState(result, ModelState));
      }
    }

    /// <summary>
    /// Zwraca dane wybranej ankiety .
    /// </summary>
    /// <param name="link">identyfikator ankiety</param>
    /// <returns></returns>
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetSurvey(string link)
    {
      var result = await _surveyManager.Value.GetSurveyAsync(link);
      // jesli udalo sie znalesc ankiete i pobrac jej zawartosc zwroc ja
      if (result.IsSuccessful) return Content(result.Result, "text/plain");
      // przeciwnym razie wystapil nie oczekawiny blad lub ankieta nie istnieje
      return new BadRequestObjectResult(Errors.AddOpperationErrorsToModelState(result, ModelState));
    }

    /// <summary>
    /// Dokonuje edycji ankiety w serwisie
    /// </summary>
    /// <param name="link">Identyfikator ankiety</param>
    /// <param name="structureWasChanged">Czy struktura ankiety uległa zmianie</param>
    /// <param name="model"></param>
    /// <returns></returns>
    [HttpPost]
    public async Task<IActionResult> EditSurvey([FromHeader]string link, [FromHeader]string structureWasChanged, [FromBody]SurveyModel model)
    {
      if (!ModelState.IsValid)
      {
        // jesli walidacja sie niepowiodla
        return new BadRequestObjectResult(ModelState);
      }
      var userNameIdentifier = User.FindFirst(Constants.Strings.JwtClaimIdentifiers.Id)?.Value;
      // podejmij probe edycji ankiety
      var result = await _surveyManager.Value.EditSurveyAsync(link, model, userNameIdentifier, structureWasChanged.ToBoolean());
      if (result.IsSuccessful) return new OkObjectResult(new { result = "succes" });
      else return new BadRequestObjectResult(Errors.AddOpperationErrorsToModelState(result, ModelState)); // jesli edycja sie nie udała zwroc błedy
    }

    /// <summary>
    /// Dodaj zestaw odpowiedzi ankiety
    /// </summary>
    /// <param name="link">identyfiaktor ankiety</param>
    /// <param name="model"></param>
    /// <returns></returns>
    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> FillSurvey([FromHeader]string link, [FromBody]FilledSurveyModel model)
    {
      if (!ModelState.IsValid)
      {
        return new BadRequestObjectResult(ModelState);
      }
      var result = await _surveyManager.Value.FillSurveyAsync(link, model);
      if (result.IsSuccessful)
      {
        return new OkObjectResult(new { result = "succes" });
      }
      else
      {
        return new BadRequestObjectResult(Errors.AddOpperationErrorsToModelState(result, ModelState));
      }
    }

    /// <summary>
    /// Sprawdza czy token JWT jest ciagle wazny
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public IActionResult IsAuthorized()
    {
      return new OkObjectResult(new { result = "succes" });
    }

    /// <summary>
    /// Rozsyła zaproszenia na wybrane adresy email
    /// </summary>
    /// <param name="link">identyfikator ankiety</param>
    /// <param name="model"></param>
    /// <returns></returns>
    [HttpPost]
    public async Task<IActionResult> SendEmailsInvites([FromHeader]string link, [FromBody]SendEmailsInvitesForSurveyModel model)
    {
      if (!ModelState.IsValid)
      {
        return new BadRequestObjectResult(ModelState);
      }
      var result = await _emailSender.Value.SendEmailsInvitesForSurveyAsync(_appSettings.HtmlMessages, model.Emails, link, User.FindFirst(ClaimTypes.NameIdentifier).Value);
      if (!result.IsSuccessful) return new BadRequestResult();
      else return new OkObjectResult(new { result = "succes" });
    }

    /// <summary>
    /// Zwroć wyniki ankiety
    /// </summary>
    /// <param name="link"></param>
    /// <returns></returns>
    [HttpGet]
    public async Task<IActionResult> GetSurveyResults(string link)
    {
      var userNameIdentifier = User.FindFirst(Constants.Strings.JwtClaimIdentifiers.Id)?.Value;
      var result = await _surveyManager.Value.GetSurveyResultAsync(link, userNameIdentifier); // spoboj uzyskac wyniki
      if (result.IsSuccessful) return new OkObjectResult(result.Result);  // zwroc wynik jesli sie udało
      else return new BadRequestObjectResult(Errors.AddOpperationErrorsToModelState(result, ModelState));  // zwroć błedy przeciwnym razie
    }

    #endregion Controller Actions
  }
}
