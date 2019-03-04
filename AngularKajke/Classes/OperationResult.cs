using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace AngularKajke.Classes
{
  /// <summary>
  /// Rezultat wykonanej operacji.
  /// </summary>
  public class OperationResult
  {
    #region Private Variables

    private bool _operationResult;
    private Collection<OperationError> _operationErrors;

    #endregion Private Variables

    #region Properties

    /// <summary>
    /// Informuje czy operacja zakończyla się powodzeniem
    /// </summary>
    public bool IsSuccessful => _operationResult;

    /// <summary>
    /// Kolekcja błędów napotkanych podczas wykonywania operacji
    /// </summary>
    public Collection<OperationError> Errors => _operationErrors;

    #endregion Properties

    #region Constructor

    public OperationResult(bool operationResult = true)
    {
      _operationResult = operationResult;
      _operationErrors = new Collection<OperationError>();
    }

    /// <summary>
    ///
    /// </summary>
    /// <param name="errors">Kolekcja błedow napotkanych podczas wykonywania operacji</param>
    public OperationResult(IEnumerable<OperationError> errors)
    {
      _operationResult = false;
      _operationErrors = new Collection<OperationError>(errors.ToList());
    }

    /// <summary>
    ///
    /// </summary>
    /// <param name="error">Błąd napotkany podczas wykonywania operacji</param>
    public OperationResult(OperationError error)
    {
      _operationResult = false;
      _operationErrors = new Collection<OperationError>();
      _operationErrors.Add(error);
    }

    #endregion Constructor

    /// <summary>
    /// Dodaj bład operacji do kolekcji
    /// </summary>
    public void AddError(OperationError error)
    {
      _operationErrors.Add(error);
    }

    /// <summary>
    /// Dodaj błedy operacji do kolekcji
    /// </summary>
    public void AddError(params OperationError[] errors)
    {
      _operationErrors = new Collection<OperationError>(_operationErrors.Concat(errors).ToList());
    }

    /// <summary>
    /// Zwróci błedy w string.
    /// </summary>
    /// <returns></returns>
    public override string ToString()
    {
      string errors = string.Empty;
      foreach (var item in Errors)
      {
        errors += item.ToString() + " ";
      }
      return errors;
    }
  }

  /// <summary>
  /// Generyczna wersja OperationResult ,która umozliwia zwrócenie wyniku operacji
  /// </summary>
  /// <typeparam name="TResult">Typ wyniku operacji</typeparam>
  public class OperationResult<TResult> : OperationResult
  {
    private TResult _result;

    /// <summary>
    /// Zawartośc wyniku operacji
    /// </summary>
    public TResult Result => _result;

    #region Constructor

    public OperationResult(bool operationResult = false) : base(operationResult)
    {
    }

    /// <summary>
    ///
    /// </summary>
    /// <param name="errors">Kolekcja błedow napotkanych podczas wykonywania operacji</param>
    public OperationResult(Collection<OperationError> errors) : base(errors)
    {
    }

    /// <summary>
    ///
    /// </summary>
    /// <param name="error">Błąd napotkany podczas wykonywania operacji</param>
    public OperationResult(OperationError error) : base(error)
    {
    }

    /// <summary>
    ///
    /// </summary>
    /// <param name="result">Zawartość wynikowej operacji</param>
    /// <param name="operationResult"></param>
    public OperationResult(TResult result, bool operationResult = true) : base(operationResult)
    {
      _result = result;
    }

    #endregion Constructor
  }

  /// <summary>
  /// Pojedyńczy bład operacji
  /// </summary>
  public class OperationError
  {
    #region Private Variables

    private string _errorName;
    private string _errorDescription;

    #endregion Private Variables

    #region Properties

    /// <summary>
    ///  Nazwa błedu
    /// </summary>
    public string ErrorName => _errorName;

    /// <summary>
    /// Opis błedu
    /// </summary>
    public string ErrorDescription => _errorDescription;

    #endregion Properties

    /// <param name="errorName">Nazwa błedu</param>
    /// <param name="errorDescription">Opis błedu</param>
    public OperationError(string errorName, string errorDescription)
    {
      _errorDescription = errorDescription;
      _errorName = errorName;
    }

    public static explicit operator OperationError(Exception e)
    {
      return new OperationError("0x" + e.HResult.ToString("X"), e.Message);
    }

    public override string ToString()
    {
      return _errorName + " " + _errorDescription;
    }
  }
}
