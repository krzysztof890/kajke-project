using System.Security.Cryptography;
using System.Text;

namespace AngularKajke.Extensions
{
  public static class StringExtensions
  {
    /// <summary>
    /// Zwraca hash ciagu znaków
    /// </summary>
    /// <param name="input">Wejsciony ciąg znaków</param>
    /// <returns>Hash md5 </returns>
    public static string HashString(this string input)
    {
      using (MD5 md5Hash = MD5.Create())
      {
        byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < data.Length; i++)
        {
          stringBuilder.Append(data[i].ToString("x2"));
        }
        return stringBuilder.ToString();
      }
    }

    /// <summary>
    /// Parsuje string do bool
    /// </summary>
    /// <param name="value"></param>
    /// <returns></returns>
    public static bool ToBoolean(this string value)
    {
      switch (value.ToLower())
      {
        case "true":
          return true;

        case "t":
          return true;

        case "1":
          return true;

        case "0":
          return false;

        case "false":
          return false;

        case "f":
          return false;

        default:
          return false;
      }
    }
  }
}
