using System;

namespace AngularKajke.Extensions
{
  public static class ErrorsExtensions
  {
    /// <summary>
    /// Zwraca wyjatek w string. Format: 0xkod_wyjatku wiadmosc_wyjatku
    /// </summary>
    /// <param name="e"></param>
    /// <returns></returns>
    public static string FormatException(this Exception e)
    {
      return "0x" + e.HResult.ToString("X") + " " + e.Message;
    }
  }
}
