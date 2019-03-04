using AngularKajke.Classes;
using AngularKajke.Database;
using AngularKajke.Extensions;
using AngularKajke.Helpers;
using AngularKajke.Interfaces;
using AngularKajke.Models;
using AngularKajke.Models.ModelClasses;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Serilog;
using System;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularKajke.Services
{
  public class SurveyManager : CacheProvider, ISurveyManager<SurveyModel, FilledSurveyModel>
  {
    #region Private Variables

    private readonly KajkeContext _db;
    private readonly string _storagePath;
    private readonly IFileManager _fileManager;

    #endregion Private Variables

    #region Constructor

    public SurveyManager(KajkeContext db, IOptions<AppSettings> options, IFileManager fileManager, IMemoryCache cache)
      : base(cache, options.Value.SurveyOptions.DefaultCacheTime)
    {
      _db = db;
      _storagePath = options.Value.SurveyOptions.GetStoragePath;
      _fileManager = fileManager;
    }

    #endregion Constructor

    #region Public Methods

    /// <summary>
    /// Utworzy wpis w bazie danych nowej ankiety i zapisza ja w folderze uzytkownika
    /// </summary>
    /// <param name="userNameIdentifier">identyfikator użytkownika </param>
    /// <param name="surveyModel">Dane ankiety w formacie zdefiniowanego modelu</param>
    /// <returns></returns>
    public async Task<OperationResult> CreateSurveyAsync(string userNameIdentifier, SurveyModel surveyModel)
    {
      // ankieta bedzie przechowywana w formacie json
      var json = JsonConvert.SerializeObject(surveyModel);
      var buffer = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(surveyModel));
      // unikalna nazwa pliku dzieku funkcji skrotu
      var hashedFileName = $"{surveyModel.Name}{DateTime.Now.ToString()}".HashString();

      // utworz wymagane foldery jesli nie istnieja
      var directory = Path.Combine(_storagePath, userNameIdentifier);
      var createDirecotryResult = await _fileManager.CreateDirectoryAsync(directory, 1);
      if (!createDirecotryResult.IsSuccessful)
      {
        Log.Error(LogErrors.ParseErrors(userNameIdentifier, nameof(CreateSurveyAsync), createDirecotryResult));
        return new OperationResult(new OperationError(nameof(Constants.Strings.Exceptions.SurveyCreationException),
         Constants.Strings.Exceptions.SurveyCreationException));
      }

      var path = Path.Combine(directory, hashedFileName);
      var fileSaveResult = await _fileManager.SaveFileAsync(path, buffer, 1);
      if (!fileSaveResult.IsSuccessful)
      {
        Log.Error(LogErrors.ParseErrors(userNameIdentifier, nameof(CreateSurveyAsync), fileSaveResult));
        return new OperationResult(new OperationError(nameof(Constants.Strings.Exceptions.SurveyCreationException),
          Constants.Strings.Exceptions.SurveyCreationException));
      }
      // wygenerowana unikalna wartośc z funkcji skrotu po ktorej to bedziemy ja wyszykiwac w bazie danych i ja zwracac
      var link = $"{userNameIdentifier}{DateTime.Now}{surveyModel.Name}".HashString();
      // utworzenie egzemplarza ankiety w bazie danych
      var survey = new Survey()
      {
        IdUser = userNameIdentifier,
        Name = surveyModel.Name,
        Link = link,
        Path = Path.Combine(userNameIdentifier, hashedFileName)
      };
      _db.Add(survey);
      // przygotuj rekordy dla danych ankiety żeby potem miec spokoj
      foreach (var item in surveyModel.Questions)
      {
        if (item.AnswerType == AnswerType.Text)
        {
          var answer = new Answers()
          {
            IdSurveyNavigation = survey,
            QuestionNumber = item.QuestionNumber,
            AnswerNumber = 1,
            AnswerType = (byte)AnswerType.Text,
            AnswerCounter = 0
          };
          _db.Answers.Add(answer);
        }
        else
        {
          for (int i = 0; i < item.Answers.Length; i++)
          {
            var answer = new Answers()
            {
              IdSurveyNavigation = survey,
              QuestionNumber = item.QuestionNumber,
              AnswerNumber = i + 1,
              AnswerType = (byte)item.AnswerType,
              AnswerCounter = 0
            };
            _db.Answers.Add(answer);
          }
        }
      }
      try
      {
        _db.SaveChanges();
      }
      catch (Exception e) when (e is DbUpdateException || e is DbUpdateConcurrencyException)
      {
        var result = await _fileManager.DeleteFileAsync(path, 2);
        Log.Error(LogErrors.ParseErrors(userNameIdentifier, nameof(CreateSurveyAsync), result.ToString(), e.FormatException()));
        return new OperationResult(new OperationError(nameof(Constants.Strings.Exceptions.SurveyCreationException),
          Constants.Strings.Exceptions.SurveyCreationException));
      }
      return new OperationResult();
    }

    /// <summary>
    /// Zwróc liste ankiet użytkownika wraz z linkami do nich
    /// </summary>
    /// <param name="userNameIdentifier">identyfikator użytkownika </param>
    /// <returns>Kolekcja obiektow ktore zawiera nazwa i link do ankiety</returns>
    public Task<OperationResult<object>> GetUserSurveysAsync(string userNameIdentifier)
    {
      var surveys = _db.Survey.Where(x => x.IdUser == userNameIdentifier).Select(y => new { name = y.Name, link = y.Link }) as object;
      return Task.FromResult(new OperationResult<Object>(surveys));
    }

    /// <summary>
    /// Usun z aplikacji wybrana ankiete uzytkownika
    /// </summary>
    /// <param name="link">indentyfikator ankiety</param>
    /// <param name="userNameIdentifier">identyfikator użytkownika</param>
    /// <returns></returns>
    public async Task<OperationResult> DeleteSurveyAsync(string link, string userNameIdentifier)
    {
      // znajdz ankiete w db i czy uzytkownik posiada wybrana ankiete
      var survey = LoadCachedItem<Survey>(link) ?? _db.Survey.FirstOrDefault(x => x.Link == link && x.IdUser == userNameIdentifier);
      if (survey != null && survey?.IdUser == userNameIdentifier)
      {
        _db.Survey.Remove(survey);
        RemoveCacheItems(link, link + link);
        try
        {
          _db.SaveChanges();
        }
        catch (Exception e) when (e is DbUpdateException || e is DbUpdateConcurrencyException)
        {
          Log.Error(LogErrors.ParseErrors(userNameIdentifier, $"{nameof(DeleteSurveyAsync)} link:{link}", e.FormatException()));
          return new OperationResult(new OperationError(nameof(Constants.Strings.Exceptions.SurveyDeletionException),
            Constants.Strings.Exceptions.SurveyDeletionException));
        }
        var result = await _fileManager.DeleteFileAsync(Path.Combine(_storagePath, survey.Path), 2);
        if (!result.IsSuccessful) Log.Error(LogErrors.ParseErrors(userNameIdentifier, $"{nameof(DeleteSurveyAsync)} link:{link}", result));
        return new OperationResult();
      }
      else
      {
        return new OperationResult(new OperationError(nameof(Constants.Strings.Exceptions.SurveyNonexistenceException),
          Constants.Strings.Exceptions.SurveyNonexistenceException));
      }
    }

    /// <summary>
    /// Zwroc dane wybranej ankiety w formacie json
    /// </summary>
    /// <param name="link">link do ankiety</param>
    /// <param name="userNameIdentifier">identyfikator użytkownika </param>
    /// <returns></returns>
    public async Task<OperationResult<string>> GetSurveyAsync(string link)
    {
      //sprawdz czy przechowujesz ankiete w pamieci
      var content = LoadCachedItem<string>(link + link);
      if (!string.IsNullOrEmpty(content)) return new OperationResult<string>(content);
      // znajdz ankiete w db
      var survey = LoadCachedItem<Survey>(link) ?? SetCacheItem<Survey>(link, () => _db.Survey.FirstOrDefault(x => x.Link == link));
      if (survey != null)
      {
        var path = Path.Combine(_storagePath, survey.Path);
        // jesli plik istnieje ponierz dane i zwroc string
        var loadFileResult = await _fileManager.LoadFileAsync(path, 1);
        if (loadFileResult.IsSuccessful) return new OperationResult<string>(SetCacheItem<string>(link + link, () => Encoding.UTF8.GetString(loadFileResult.Result)));
        else
        {
          Log.Error(LogErrors.ParseErrors(" ", $"{nameof(GetSurveyAsync)} link:{link}", loadFileResult));
          return new OperationResult<string>(new OperationError(nameof(Constants.Strings.Exceptions.SurveyFileDoNotExistException),
          Constants.Strings.Exceptions.SurveyFileDoNotExistException)); // jesli plik nie istnieje
        }
      }
      // jesli ankieta nie istnieje
      return new OperationResult<string>(new OperationError(nameof(Constants.Strings.Exceptions.SurveyNonexistenceException),
         Constants.Strings.Exceptions.SurveyNonexistenceException));
    }

    /// <summary>
    ///
    /// </summary>
    /// <param name="link">identyfikator ankiety</param>
    /// <param name="surveyModel">model ankiety</param>
    /// <param name="userNameIdentifier">identyfikator uzytkownika</param>
    /// <returns></returns>
    public async Task<OperationResult> EditSurveyAsync(string link, SurveyModel surveyModel, string userNameIdentifier, bool structureWasChanged)
    {
      // kiedy struktura ankiety sie zmienila usun ja i swtorz na nowo w DB
      if (structureWasChanged)
      {
        var result = await DeleteSurveyAsync(link, userNameIdentifier);
        if (result.IsSuccessful) return await CreateSurveyAsync(userNameIdentifier, surveyModel);
        else
        {
          var errors = new Collection<OperationError>() { new OperationError(nameof(Constants.Strings.Exceptions.SurveyEditionException)
            , Constants.Strings.Exceptions.SurveyEditionException) };
          Log.Error(LogErrors.ParseErrors(userNameIdentifier, nameof(EditSurveyAsync), result));
          return new OperationResult(errors.Concat(result.Errors));
        }
      }
      // jesli nie struktura ankiety nie uległa zmienia wystarczy zmienic dane zródłowe ankiety
      // znajdz ankiete w db
      var survey = LoadCachedItem<Survey>(link) ?? _db.Survey.FirstOrDefault(x => x.Link == link && x.IdUser == userNameIdentifier);
      if (survey != null && survey?.IdUser == userNameIdentifier)
      {
        // ankieta bedzie przechowywana w formacie json
        var json = JsonConvert.SerializeObject(surveyModel);
        var buffer = Encoding.UTF8.GetBytes(json);
        var saveFileResult = await _fileManager.SaveFileAsync(Path.Combine(_storagePath, survey.Path), buffer, 2);
        if (!saveFileResult.IsSuccessful)
        {
          Log.Error(LogErrors.ParseErrors(userNameIdentifier, nameof(EditSurveyAsync), saveFileResult));
          return new OperationResult(new OperationError(nameof(Constants.Strings.Exceptions.SurveyEditionException)
            , Constants.Strings.Exceptions.SurveyEditionException));
        }

        survey.Name = surveyModel.Name;
        _db.Attach(survey);
        _db.Update(survey);
        try
        {
          _db.SaveChanges();
        }
        catch (Exception e) when (e is DbUpdateException || e is DbUpdateConcurrencyException)
        {
          Log.Error(LogErrors.ParseErrors(userNameIdentifier, nameof(EditSurveyAsync), e.FormatException()));
        }
        RemoveCacheItems(link, link + link); // doszło do zmiany encji ankiety usuń ja z pamieci podrecznej
        return new OperationResult();
      }
      return new OperationResult<string>(new OperationError(nameof(Constants.Strings.Exceptions.SurveyNonexistenceException),
         Constants.Strings.Exceptions.SurveyNonexistenceException));
    }

    /// <summary>
    /// Dodaj wynik ankiety do bazy danych
    /// </summary>
    /// <param name="link">identyfikator ankiety</param>
    /// <returns></returns>
    public Task<OperationResult> FillSurveyAsync(string link, FilledSurveyModel model)
    {
      // jesli ankieta nie istnieje zakoncz prace
      //var survey = _db.Survey.FirstOrDefault(x => x.Link == link);
      var survey = LoadCachedItem<Survey>(link) ?? SetCacheItem<Survey>(link, () => _db.Survey.FirstOrDefault(x => x.Link == link));
      if (survey == null)
      {
        return Task.FromResult(new OperationResult(new OperationError(nameof(Constants.Strings.Exceptions.SurveyNonexistenceException),
         Constants.Strings.Exceptions.SurveyNonexistenceException)));
      }
      else
      {
        // znajdz wszystkie rekordy do przechowywania odpowiedzi
        var answers = _db.Answers.Where(x => x.IdSurvey == survey.IdSurvey).AsEnumerable();
        foreach (var item in model.AnswersProvided)
        {
          // znajdz rekord ktory ma przechowywac dane dla tej odpowiedzi
          var answer = answers.FirstOrDefault(x => x.QuestionNumber == item.QuestionNumber && x.AnswerNumber == item.AnswerNumber);
          if (answer != null)
          {
            if (item.AnswerType == AnswerType.Text && item?.AnswerResult.TrimStart().Length > 0)
            {
              _db.AnswerResult.Add(new AnswerResult()
              {
                IdAnswer = answer.IdAnswer,
                Result = item.AnswerResult
              });
            }
            else
            {
              answer.AnswerCounter++;
            }
          }
        }
        foreach (var item in answers.Where(x => (AnswerType)x.AnswerType != AnswerType.Text)) // zakatualizuj stan pytan roznych od textowych
        {
          _db.Entry<Answers>(item).Property(x => x.AnswerCounter).IsModified = true;
        }
        try
        {
          _db.SaveChanges();
        }
        catch (Exception e) when (e is DbUpdateException || e is DbUpdateConcurrencyException)
        {
          Log.Error(LogErrors.ParseErrors(" ", $"{nameof(FillSurveyAsync)} link:{link}", e.FormatException()));
          return Task.FromResult(new OperationResult(new OperationError(nameof(Constants.Strings.Exceptions.SurveyFillingException)
            , Constants.Strings.Exceptions.SurveyFillingException)));
        }

        return Task.FromResult(new OperationResult());
      }
    }

    public Task<OperationResult<object>> GetSurveyResultAsync(string link, string userNameIdentifier)
    {
      // sprawdzic czy dana ankieta istnieje i wybrany uzytkownik ja stworzyl
      var survey = LoadCachedItem<Survey>(link) ?? SetCacheItem<Survey>(link, () => _db.Survey.FirstOrDefault(x => x.Link == link && x.IdUser == userNameIdentifier));
      if (survey == null | survey?.IdUser != userNameIdentifier)
        return Task.FromResult(new OperationResult<Object>(new OperationError(nameof(Constants.Strings.Exceptions.SurveyAccessException),
          Constants.Strings.Exceptions.SurveyAccessException)));

      //pobierz wyniki ankiety
      var results = _db.Answers.Where(x => x.IdSurvey == survey.IdSurvey).Select(y => new
      {
        AnswerNumber = y.AnswerNumber,
        QuestionNumber = y.QuestionNumber,
        AnswerType = y.AnswerType,
        AnswerCounter = y.AnswerCounter,
        AnswerResults = y.AnswerResult.Select(z => z.Result)
      }).AsEnumerable();
      // zwroc dane
      return Task.FromResult(new OperationResult<object>(new { Results = results }));
    }

    #endregion Public Methods
  }
}
