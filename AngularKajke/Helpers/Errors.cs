using AngularKajke.Classes;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace AngularKajke.Helpers
{
  /// <summary>
  /// Opdpowiada za dodawanie błedów do Model State.
  /// </summary>
  public static class Errors
  {
    /// <summary>
    /// Dodaje błedy do ModelState
    /// </summary>
    /// <param name="identityResult"></param>
    /// <param name="modelState"></param>
    /// <returns></returns>
    public static ModelStateDictionary AddErrorsToModelState(IdentityResult identityResult, ModelStateDictionary modelState)
    {
      foreach (var item in identityResult.Errors)
      {
        modelState.TryAddModelError(item.Code, item.Description);
      }

      return modelState;
    }

    /// <summary>
    /// Dodaje własny rodzaj bledu do ModelState
    /// </summary>
    /// <param name="code">Nazwa błedu</param>
    /// <param name="description">Treśc błedu</param>
    /// <param name="modelState"></param>
    /// <returns></returns>
    public static ModelStateDictionary AddErrorToModelState(string code, string description, ModelStateDictionary modelState)
    {
      modelState.TryAddModelError(code, description);
      return modelState;
    }

    /// <summary>
    /// Dodaje błedy napotkane podczas wykonywania operacji z ankieta do ModelState
    /// </summary>
    /// <param name="operationResult">Wynik operacji</param>
    /// <param name="modelState"></param>
    /// <returns></returns>
    public static ModelStateDictionary AddOpperationErrorsToModelState(OperationResult operationResult, ModelStateDictionary modelState)
    {
      foreach (var item in operationResult.Errors)
      {
        modelState.TryAddModelError(item.ErrorName, item.ErrorDescription);
      }
      return modelState;
    }
  }

  public static class LogErrors
  {
    public static string ParseErrors(params OperationResult[] operationResults)
    {
      string errors = string.Empty;
      foreach (var item in operationResults)
      {
        errors += item.ToString() + " ";
      }
      return " ErrorLog: Errors-" + errors;
    }

    public static string ParseErrors(string userIdentifier, params OperationResult[] operationResults)
    {
      string errors = string.Empty;
      foreach (var item in operationResults)
      {
        errors += item.ToString() + " ";
      }
      return $" ErrorLog: UserIdentifier-{userIdentifier} Errors-" + errors;
    }

    public static string ParseErrors(string userIdentifier, string attributes, params OperationResult[] operationResults)
    {
      string errors = string.Empty;
      foreach (var item in operationResults)
      {
        errors += item.ToString() + " ";
      }
      return $" ErrorLog: UserIdentifier-{userIdentifier} Errors-{errors} attributes-" + attributes;
    }

    public static string ParseErrors(params string[] errors)
    {
      string error = string.Empty;
      foreach (var item in errors)
      {
        error += item;
      }
      return " ErrorLog: Errors-" + error;
    }

    public static string ParseErrors(string userIdentifier, params string[] errors)
    {
      string error = string.Empty;
      foreach (var item in errors)
      {
        error += item;
      }
      return $" ErrorLog: UserIdentifier-{userIdentifier} Errors-" + error;
    }

    public static string ParseErrors(string userIdentifier, string attributes, params string[] errors)
    {
      string error = string.Empty;
      foreach (var item in errors)
      {
        error += item;
      }
      return $" ErrorLog: UserIdentifier-{userIdentifier} Errors-{error} attributes-" + attributes;
    }
  }
}
