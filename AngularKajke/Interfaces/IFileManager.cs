using AngularKajke.Classes;
using System.Threading.Tasks;

namespace AngularKajke.Interfaces
{
  public interface IFileManager
  {
    /// <summary>
    /// Usuń wybrany katalog wraz z zawartościa
    /// </summary>
    /// <param name="absoluteDirectoryPath">Pełna ścieżka do katalogu</param>
    /// <param name="numberOfRetries">Ilość prob usunieca katalogu</param>
    /// <param name="delayOnRetry">Czas odstepu w milisekundach miedzy probami usuniecia katalogu</param>
    /// <returns></returns>
    Task<OperationResult> DeleteDirectoryAsync(string absoluteDirectoryPath, int numberOfRetries = 0, int delayOnRetry = 1000);

    /// <summary>
    /// Stwórz plik w wybranej sciezce.
    /// </summary>
    /// <param name="absoluteFilePath">Pełna ścieżka do pliku</param>
    /// <param name="numberOfRetries">Ilość prob utworzenia pliku</param>
    /// <param name="delayOnRetry">Czas odstepu w milisekundach miedzy probami utworzenia pliku</param>
    /// <returns></returns>
    Task<OperationResult> SaveFileAsync(string absoluteFilePath, byte[] buffer, int numberOfRetries = 0, int delayOnRetry = 1000);

    /// <summary>
    /// Pobierz plik o podanej sciezce.
    /// </summary>
    /// <param name="absoluteFilePath">Pełna ścieżka do pliku</param>
    /// <param name="numberOfRetries">Ilość prob pobrania pliku</param>
    /// <param name="delayOnRetry">Czas odstepu w milisekundach miedzy probami utworzenia pliku</param>
    /// <returns></returns>
    Task<OperationResult<byte[]>> LoadFileAsync(string absoluteFilePath, int numberOfRetries = 0, int delayOnRetry = 1000);

    /// <summary>
    /// Usuń plik o podanej sciezce.
    /// </summary>
    /// <param name="absoluteFilePath">Pełna ścieżka do pliku</param>
    /// <param name="numberOfRetries">Ilość prob usuniecia pliku</param>
    /// <param name="delayOnRetry">Czas odstepu w milisekundach miedzy probami utworzenia pliku</param>
    /// <returns></returns>
    Task<OperationResult> DeleteFileAsync(string absoluteFilePath, int numberOfRetries = 0, int delayOnRetry = 1000);

    /// <summary>
    /// Stwórz katalog w wybranej sciezce.
    /// </summary>
    /// <param name="absoluteDirectoryPath">Pełna ścieżka do katalogu</param>
    /// <param name="numberOfRetries">Ilość prob utworzenia katalogu</param>
    /// <param name="delayOnRetry">Czas odstepu w milisekundach miedzy probami utworzenia katalogu</param>
    /// <returns></returns>
    Task<OperationResult> CreateDirectoryAsync(string absoluteDirectoryPath, int numberOfRetries = 0, int delayOnRetry = 1000);
  }
}
