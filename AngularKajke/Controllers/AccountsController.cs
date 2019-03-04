using AngularKajke.Classes;
using AngularKajke.Database;
using AngularKajke.Extensions;
using AngularKajke.Helpers;
using AngularKajke.Interfaces;
using AngularKajke.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AngularKajke.Controllers
{
  /// <summary>
  /// Odpowiada za sprawy zwiazane z obłsuga rejestracji i logowania w serwisie.
  /// </summary>
  [Route("api/[controller]/[action]")]
  public class AccountsController : Controller
  {
    #region Private Variables

    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IJwtFactory _jwtFactory;
    private readonly JwtIssuerOptions _jwtOptions;
    private readonly Lazy<IEmailSender> _emailSender;
    private readonly AppSettings _appSettings;

    #endregion Private Variables

    #region Constructor

    public AccountsController(UserManager<ApplicationUser> userManager, IJwtFactory jwtFactory,
      Lazy<IEmailSender> emailSender, IOptions<JwtIssuerOptions> jwtOptions, IOptions<AppSettings> appSettings)
    {
      _userManager = userManager;
      _jwtFactory = jwtFactory;
      _emailSender = emailSender;
      _jwtOptions = jwtOptions.Value;
      _appSettings = appSettings.Value;
    }

    #endregion Constructor

    #region Controller Actions

    /// <summary>
    /// Rejestruje nowego uzytkownika w serwisie
    /// </summary>
    /// <param name="model">Email i hasło uzytkownnika</param>
    /// <returns></returns>
    [HttpPost]
    public async Task<IActionResult> Register([FromBody]CredentialsViewModel model)
    {
      if (!ModelState.IsValid)
      {
        //jesli walidacja sie nie powiodla
        return BadRequest(ModelState);
      }
      var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
      var result = await _userManager.CreateAsync(user, model.Password);
      if (result.Succeeded)
      {
        //generuje token do potwierdzenia
        var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        //generuje link ktory uzytkownik otrzyma aby potwierdzic konto
        var callbackUrl = LinkGenerator.EmailConfirmationLink(user.Id, code);
        //wysyła mail z linkiem do potwierdznia konta
        await _emailSender.Value.SendEmailConfirmationAsync(_appSettings.HtmlMessages, model.Email, callbackUrl);

        return new OkObjectResult(new { success = "Konto utworzono" });
      }
      //jesli nie utworzono uzytkownika
      return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));
    }

    /// <summary>
    ///  Logowanie uzytkownika w oparciu o JSON Web Token
    /// </summary>
    /// <param name="credentials">Dane uwierzytelniania</param>
    /// <returns></returns>
    [HttpPost]
    public async Task<IActionResult> Login([FromBody]CredentialsViewModel credentials)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var identity = await GetClaimsIdentity(credentials.Email, credentials.Password);
      if (identity == null)
      {
        //jesli nie udalo sie sie zalogowac z powodu niezgodnosci hasla lub uzytkownika zwroc blad
        return BadRequest(Errors.AddErrorToModelState("login_failure", "Niepoprawne dane logowania.", ModelState));
      }
      //jesli udalo sie zalogować zwroc token JWT
      var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, credentials.Email, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });
      return new OkObjectResult(jwt);
    }

    /// <summary>
    /// Potwierdza wybrany adres email w oparciu o wygenerowany token identity.
    /// </summary>
    /// <param name="userId">identyfikator użytkownika</param>
    /// <param name="code">Token identity</param>
    /// <returns></returns>
    [HttpGet]
    [Route("/api/[controller]/confirm")]
    public async Task<IActionResult> ConfirmEmail(string userId, string code)
    {
      if (userId == null || code == null)
      {
        //jesli link nie kompletny zrwoc bład
        return BadRequest(Errors.AddErrorToModelState("damaged_link", "Link jest niekompletny", ModelState));
      }
      var user = await _userManager.FindByIdAsync(userId);
      if (user == null)
      {
        //nie pokazywac na zewnarz ze dany uzytkownik nie istnieje
        return new OkObjectResult(new { success = "Potwierdzono adres email" });
      }
      var result = await _userManager.ConfirmEmailAsync(user, code);
      if (result.Succeeded)
      {
        // jesli sie udało zrwoc sukces
        return new OkObjectResult(new { success = "Potwierdzono adres email" });
      }
      else
      {
        return BadRequest(new { failure = "Potwierdzenie się nie powiodło" });
      }
    }

    /// <summary>
    /// Wysyła link potwierdzający adres email
    /// </summary>
    /// <param name="email">Email uzytkownika który ma zostać potwierdzony</param>
    /// <returns></returns>
    [HttpGet]
    public async Task<IActionResult> SendAgainEmailConfirmation(string email)
    {
      if (email == null)
      {
        return BadRequest(Errors.AddErrorToModelState("empty_link", " Pusty lub nie kompletny link.", ModelState));
      }
      var user = await _userManager.FindByEmailAsync(email);
      if (user == null || user.EmailConfirmed)
      {
        // nie pokazuj na zewnatrz ze uzytkownik nie istnieje lub ze jego email jest potwierdzony
        return new OkObjectResult(new { success = "Wysłano link potwierdzajacy" });
      }

      //generuje token do potwierdzenia
      var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
      //generuje link ktory uzytkownik otrzyma aby potwierdzic konto
      var callbackUrl = LinkGenerator.EmailConfirmationLink(user.Id, code);
      //wysyła mail z linkiem do potwierdznia konta
      await _emailSender.Value.SendEmailConfirmationAsync(_appSettings.HtmlMessages, email, callbackUrl);

      return new OkObjectResult(new { success = "Wysłano link potwierdzajacy" });
    }

    /// <summary>
    /// Wysyła mail z linkiem do zresetowania hasła
    /// </summary>
    /// <param name="model"></param>
    /// <returns></returns>
    [HttpGet]
    public async Task<IActionResult> ForgotPassword(string email)
    {
      if (email == null)
      {
        return BadRequest(Errors.AddErrorToModelState("empty_link", " Pusty lub nie kompletny link.", ModelState));
      }
      var user = await _userManager.FindByEmailAsync(email);
      if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
      {
        // nie pokazuj na zewnatrz ze uzytkownik nie istnieje
        return new OkObjectResult(new { success = "Wysłano link do zresetowania hasła" });
      }

      //stworz token do zresetowania hasła
      var code = await _userManager.GeneratePasswordResetTokenAsync(user);
      //wygeneruj link do zresetowania hasła
      var callbackUrl = LinkGenerator.ResetPasswordLink(code);
      //wyslil link
      await _emailSender.Value.SendEmailForResetPasswordAsync(_appSettings.HtmlMessages, email, callbackUrl);
      return new OkObjectResult(new { success = "Wysłano link do zresetowania hasła" });
    }

    [HttpPost]
    public async Task<IActionResult> ResetPassword([FromBody]ResetPasswordViewModel model)
    {
      if (!ModelState.IsValid)
      {
        //jesli walidacja sie nie powiodla
        return BadRequest(ModelState);
      }
      var user = await _userManager.FindByEmailAsync(model.Email);
      if (user == null)
      {
        // nie pokazuj ze uzytkownik nie istnieje i przekieruj na strone glowna
        return new OkObjectResult(new { success = "Zresetowano hasło" });
      }
      // token trzeba samemu sobie encodowac
      var result = await _userManager.ResetPasswordAsync(user, WebUtility.UrlDecode(model.Code), model.Password);
      if (result.Succeeded)
      {
        //jesli zresetowano zwroc powodzenie
        return new OkObjectResult(new { success = "Zresetowano hasło" });
      }
      //jesli cos dalej sie nie powiodla
      return BadRequest(Errors.AddErrorsToModelState(result, ModelState));
    }

    #endregion Controller Actions

    #region Private Methods

    /// <summary>
    /// Weryfikuje czy okreslony uzytkownik istnieje
    /// </summary>
    /// <param name="userName">email użytkownika jest nazwa uzytkownika</param>
    /// <param name="password">hasło uzytkownika</param>
    /// <returns></returns>
    private async Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password)
    {
      //jesli danie nie kompletne zwroc null
      if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
        return await Task.FromResult<ClaimsIdentity>(null);

      // werefukuje uzytownika
      var userToVerify = await _userManager.FindByEmailAsync(userName);
      //jesli nie znaleziono uzytkonika zwroc null
      if (userToVerify == null) return await Task.FromResult<ClaimsIdentity>(null);

      // sprawdz czy to jest haslo tego uzytkownika
      if (await _userManager.CheckPasswordAsync(userToVerify, password))
      {
        return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(userName, userToVerify.Id));
      }

      //jeśli haslo haslo nie zgdone zwroc null
      return await Task.FromResult<ClaimsIdentity>(null);
    }

    #endregion Private Methods
  }
}
