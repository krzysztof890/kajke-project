using AngularKajke.Classes;
using AngularKajke.Interfaces;
using System;
using System.IO;
using System.Threading.Tasks;

namespace AngularKajke.Services
{
  public class FileManager : IFileManager
  {
    public async Task<OperationResult> DeleteDirectoryAsync(string absoluteDirectoryPath, int numberOfRetries = 0, int delayOnRetry = 1000)
    {
      if (!Directory.Exists(absoluteDirectoryPath))
        return new OperationResult((OperationError)new DirectoryNotFoundException());
      int i = 0;
      do
      {
        try
        {
          Directory.Delete(absoluteDirectoryPath, true);
          break;
        }
        catch (IOException e)
        {
          if (i >= numberOfRetries)
          {
            return new OperationResult((OperationError)e);
          }
          await Task.Delay(delayOnRetry);
        }
        catch (Exception e) // przy reszcie wyjatkow nie chcemy probowac ponownie
        {
          return new OperationResult((OperationError)e);
        }
      }
      while (i++ < numberOfRetries);
      return new OperationResult(); // kiedy wykanlo sie pomyslnie wyjdz
    }

    public async Task<OperationResult> SaveFileAsync(string absoluteFilePath, byte[] buffer, int numberOfRetries = 0, int delayOnRetry = 1000)
    {
      int i = 0;
      do
      {
        try
        {
          using (var stream = new FileStream(absoluteFilePath, FileMode.Create))
          {
            await stream.WriteAsync(buffer, 0, buffer.Length);
          }
          break;
        }
        catch (Exception e) when (e is IOException || e is NotSupportedException || e is UnauthorizedAccessException)
        {
          if (i >= numberOfRetries)
          {
            return new OperationResult((OperationError)e);
          }
          await Task.Delay(delayOnRetry);
        }
        catch (Exception e)
        {
          return new OperationResult((OperationError)e);
        }
      }
      while (i++ < numberOfRetries);
      return new OperationResult();
    }

    public async Task<OperationResult<byte[]>> LoadFileAsync(string absoluteFilePath, int numberOfRetries = 0, int delayOnRetry = 1000)
    {
      if (!File.Exists(absoluteFilePath)) return new OperationResult<byte[]>((OperationError)new FileNotFoundException());
      int i = 0;
      do
      {
        try
        {
          using (var stream = new FileStream(absoluteFilePath, FileMode.Open))
          {
            var buffer = new byte[stream.Length];
            await stream.ReadAsync(buffer, 0, buffer.Length);
            return new OperationResult<byte[]>(buffer);
          }
        }
        catch (Exception e) when (e is IOException || e is NotSupportedException || e is UnauthorizedAccessException)
        {
          if (i >= numberOfRetries)
          {
            return new OperationResult<byte[]>((OperationError)e);
          }
          await Task.Delay(delayOnRetry);
        }
        catch (Exception e)
        {
          return new OperationResult<byte[]>((OperationError)e);
        }
      }
      while (i++ < numberOfRetries);
      return new OperationResult<byte[]>(false);
    }

    public async Task<OperationResult> DeleteFileAsync(string absoluteFilePath, int numberOfRetries = 0, int delayOnRetry = 1000)
    {
      if (!File.Exists(absoluteFilePath)) return new OperationResult((OperationError)new FileNotFoundException());
      int i = 0;
      do
      {
        try
        {
          File.Delete(absoluteFilePath);
          break;
        }
        catch (Exception e) when (e is IOException || e is NotSupportedException || e is UnauthorizedAccessException)
        {
          if (i >= numberOfRetries)
          {
            return new OperationResult((OperationError)e);
          }
          await Task.Delay(delayOnRetry);
        }
        catch (Exception e) // przy reszcie wyjatkow nie chcemy probowac ponownie
        {
          return new OperationResult((OperationError)e);
        }
      }
      while (i++ < numberOfRetries);
      return new OperationResult(); // kiedy wykanlo sie pomyslnie wyjdz
    }

    public async Task<OperationResult> CreateDirectoryAsync(string absoluteDirectoryPath, int numberOfRetries = 0, int delayOnRetry = 1000)
    {
      if (Directory.Exists(absoluteDirectoryPath))
        return new OperationResult();
      int i = 0;
      do
      {
        try
        {
          Directory.CreateDirectory(absoluteDirectoryPath);
          break;
        }
        catch (IOException e)
        {
          if (i >= numberOfRetries)
          {
            return new OperationResult((OperationError)e);
          }
          await Task.Delay(delayOnRetry);
        }
        catch (Exception e)
        {
          return new OperationResult((OperationError)e);
        }
      }
      while (i++ < numberOfRetries);
      return new OperationResult();
    }
  }
}
