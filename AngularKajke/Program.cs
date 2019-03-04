using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Serilog;
using System;
using System.IO;
using System.Net;
using System.Security.Cryptography.X509Certificates;

namespace AngularKajke
{
  public class Program
  {
    /// <summary>
    /// Punkt wejsciowy programu tutaj startuje host
    /// </summary>
    /// <param name="args"></param>
    public static void Main(string[] args)
    {
      //tworze wlasna konfiguracje
      var configuration = CreateConfiguration();
      //Stworz ten logger
      Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(configuration).CreateLogger();
      //stworz instacje hosta
      var host = CreateHost(configuration);
      host.Run(); // wystartuj hosta
    }

    public static IConfiguration CreateConfiguration()
    {
      return new ConfigurationBuilder()
     .SetBasePath(Directory.GetCurrentDirectory()) //ustawiam root path
     .AddEnvironmentVariables() //obslyga zmiennych srodowiskowych
                                //dodaje pliki jason ktore uzywam
     .AddJsonFile("certificate.json", optional: true, reloadOnChange: true)
     .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
     .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json", optional: true, reloadOnChange: true)
     .Build();
    }

    /// <summary>
    /// Utwórz instancje hosta
    /// </summary>
    /// <param name="configuration"></param>
    /// <returns></returns>
    public static IWebHost CreateHost(IConfiguration configuration)
    {
      return new WebHostBuilder()
          //konfiguracja serwera kester
          .UseKestrel(
              options =>
              {
                options.AddServerHeader = false;
                options.Listen(IPAddress.Loopback, 44321, listenOptions =>
                {
                  //ma uzywac https z naszym certyfikatem
                  listenOptions.UseHttps(CreateCertificate(configuration));
                });
                //tutaj przy wdrozeniu ustawic ip hosta i port, pomysl jak to mialo by wygladac lepiej i sensownie na wdrozenie
              }
          )
          .UseConfiguration(configuration)
          .UseContentRoot(Directory.GetCurrentDirectory())
          .UseStartup<Startup>()
          //zrob tu porzadek przy wdorzeniu ;ustawic url
          .UseUrls("https://localhost:44321")
          .Build();
    }

    /// <summary>
    /// Przygotuj certyfikat
    /// </summary>
    /// <param name="configuration"></param>
    /// <returns></returns>
    public static X509Certificate2 CreateCertificate(IConfiguration configuration)
    {
      //pobiera dane konfiguracyjne z certificate.json sekcji certificateSettings
      var certificateSettings = configuration.GetSection("CertificateSettings");
      string certificateFileName = certificateSettings.GetValue<string>("FileName");
      string certificatePassword = certificateSettings.GetValue<string>("Password");

      //tworzy instacje X509Certificate2 ktora sluzy do dostepu do certyfikatu
      return new X509Certificate2(certificateFileName, certificatePassword);
    }
  }
}
