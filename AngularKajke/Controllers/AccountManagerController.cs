using AngularKajke.Classes;
using AngularKajke.Database;
using AngularKajke.Extensions;
using AngularKajke.Helpers;
using AngularKajke.Interfaces;
using AngularKajke.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Serilog;
using System;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AngularKajke.Controllers
{
  [Authorize(Policy = "ApiUser")]
  [Route("api/[controller]/[action]")]
  public class AccountManagerController : Controller
  {
    #region Private Variables

    private readonly UserManager<ApplicationUser> _userManager;
    private readonly Lazy<IEmailSender> _emailSender;
    private readonly AppSettings _appSettings;
    private readonly Lazy<ISurveyManager<SurveyModel, FilledSurveyModel>> _surveyManager;
    private readonly IFileManager _fileManager;

    #endregion Private Variables

    #region Constructor

    public AccountManagerController(UserManager<ApplicationUser> userManager, Lazy<IEmailSender> emailSender, IOptions<AppSettings> appSetting
      , Lazy<ISurveyManager<SurveyModel, FilledSurveyModel>> surveyManager, IFileManager fileManager)
    {
      _userManager = userManager;
      _emailSender = emailSender;
      _appSettings = appSetting.Value;
      _surveyManager = surveyManager;
      _fileManager = fileManager;
    }

    #endregion Constructor

    #region Controller Actions

    private Task<ApplicationUser> ApplicationUser => _userManager.FindByEmailAsync(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

    [HttpPost]
    public async Task<IActionResult> ReplaceEmail([FromBody]ChangeEmailModel model)
    {
      if (!ModelState.IsValid)
      {
        //jesli walidacja sie nie powiodla
        return BadRequest(ModelState);
      }
      // zmien email użytkownika
      var changeEmailResult = await _userManager.ChangeEmailAsync(await ApplicationUser, model.NewEmail, model.Code);
      if (changeEmailResult.Succeeded) return new OkObjectResult(new { success = "Pomyślnie zmieniono adres email" });
      else return BadRequest(Errors.AddErrorsToModelState(changeEmailResult, ModelState));
    }

    [HttpPost]
    public async Task<IActionResult> ChangePassword([FromBody]ChangePasswordModel model)
    {
      if (!ModelState.IsValid)
      {
        //jesli walidacja sie nie powiodla
        return BadRequest(ModelState);
      }
      var result = await _userManager.ChangePasswordAsync(await ApplicationUser, model.CurrentPassword, model.NewPassword);
      if (result.Succeeded) return new OkObjectResult(new { success = "Pomyślnie zmieniono hasło" });
      else return BadRequest(Errors.AddErrorsToModelState(result, ModelState));
    }

    [HttpPost]
    public async Task<IActionResult> GenerateChangeEmailToken([FromBody]GenerateChangeEmailTokenModel model)
    {
      if (!ModelState.IsValid)
      {
        //jesli walidacja sie nie powiodla
        return BadRequest(ModelState);
      }
      var user = await ApplicationUser;
      var code = await _userManager.GenerateChangeEmailTokenAsync(user, model.Email);
      await _emailSender.Value.SendChangeEmailAsync(_appSettings.HtmlMessages, user.Email, LinkGenerator.ChangeEmailLink(code, model.Email));
      return new OkObjectResult(new { success = "Pomyślnie wysłano tek do zmiany adresu email" });
    }

    [HttpPost]
    public async Task<IActionResult> DeleteUser([FromBody]DeleteUserModel model)
    {
      if (!ModelState.IsValid)
      {
        //jesli walidacja sie nie powiodla
        return BadRequest(ModelState);
      }
      var user = await ApplicationUser;
      // potwierdz haslo
      var passwordResult = await _userManager.CheckPasswordAsync(user, model.Password);
      if (!passwordResult) return BadRequest(Errors.AddErrorToModelState("incorrect_password", "Niepoprawne hasło użytkownika", ModelState));
      // spoboj usunać użytkownika
      var deleteResult = await _userManager.DeleteAsync(user);
      if (!deleteResult.Succeeded) return BadRequest(Errors.AddErrorsToModelState(deleteResult, ModelState));
      // usun pliki
      var result = await _fileManager.DeleteDirectoryAsync(Path.Combine(_appSettings.SurveyOptions.GetStoragePath, user.Id), 3);
      if (!result.IsSuccessful) Log.Error(LogErrors.ParseErrors(user.Id, $"{nameof(DeleteUser)}", result));
      return new OkObjectResult(new { success = "Pomyślnie usunieta konto użytkownika z serwisu" });
    }

    #endregion Controller Actions
  }
}
