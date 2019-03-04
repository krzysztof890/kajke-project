using AngularKajke.Classes;
using AngularKajke.Interfaces;
using AngularKajke.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;

namespace AngularKajke.Extensions
{
  /// <summary>
  /// Metody rozszerzające IServiceCollection
  /// </summary>
  public static class IServiceCollectionExtensions
  {
    #region Extensions

    /// <summary>
    /// Dodanie funkcjonalości JWT
    /// </summary>
    /// <param name="services"></param>
    /// <param name="jwtAppSettingOptions">Ustawienia JWT</param>
    /// <returns></returns>
    public static IServiceCollection AddJWT(this IServiceCollection services, IConfigurationSection jwtAppSettingOptions)
    {
      //dodanie uslugi odpowiedzialne za generowanie tokenow
      services
        .AddSingleton<IJwtFactory, JwtFactory>();

      var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtAppSettingOptions["SecretKey"]));
      // konfigurowanie opcji JwtIssuerOptions
      services.Configure<JwtIssuerOptions>(options =>
      {
        options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
        options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
        options.SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
      });

      //parametry sprawdzania poprawności tokena
      var tokenValidationParameters = new TokenValidationParameters
      {
        ValidateIssuer = true,
        ValidIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)],

        ValidateAudience = true,
        ValidAudience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)],

        ValidateIssuerSigningKey = true,
        IssuerSigningKey = signingKey,

        RequireExpirationTime = false,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
      };

      //dodanie i konfiguracja zasad autoryzacji
      services.AddAuthentication(options =>
      {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      }).AddJwtBearer(configureOptions =>
      {
        configureOptions.ClaimsIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
        configureOptions.TokenValidationParameters = tokenValidationParameters;
        configureOptions.SaveToken = true;
      });

      return services;
    }

    /// <summary>
    /// Dokonaj konfugruracji ustawien aplikacji
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    /// <returns></returns>
    public static IServiceCollection AddAppSettings(this IServiceCollection services, IConfiguration configuration)
    {
      var html = configuration.GetSection(nameof(HtmlMessages)); // załaduj ustawienia wiaodmosci html
      var surveyOptions = configuration.GetSection(nameof(SurveyOptions)); // załaduj ustawienia ankiet
      var emailOptions = configuration.GetSection(nameof(EmailOptions));
      services.Configure<AppSettings>(options =>
      {
        options.HtmlMessages = new HtmlMessages()
        {
          AbsolutePath = html[nameof(HtmlMessages.AbsolutePath)] ?? String.Empty,
          RelativePath = html[nameof(HtmlMessages.RelativePath)] ?? String.Empty,
          AutomaticMessageFooter = html[nameof(HtmlMessages.AutomaticMessageFooter)],
          ChangeEmailMessage = html[nameof(HtmlMessages.ChangeEmailMessage)],
          EmailConfirmationMessage = html[nameof(HtmlMessages.EmailConfirmationMessage)],
          InviteForSurveyMessage = html[nameof(HtmlMessages.InviteForSurveyMessage)],
          ResetPasswordMessage = html[nameof(HtmlMessages.ResetPasswordMessage)]
        };
        options.SurveyOptions = new SurveyOptions()
        {
          AbsoluteStoragePath = surveyOptions[nameof(SurveyOptions.AbsoluteStoragePath)] ?? String.Empty,
          RelativeStoragePath = surveyOptions[nameof(SurveyOptions.RelativeStoragePath)] ?? String.Empty,
          DefaultCacheTime = Convert.ToDouble(surveyOptions[nameof(SurveyOptions.DefaultCacheTime)])
        };
        options.EmailOptions = new EmailOptions()
        {
          Email = emailOptions[nameof(EmailOptions.Email)],
          Password = emailOptions[nameof(EmailOptions.Password)],
          Host = emailOptions[nameof(EmailOptions.Host)],
          Port = Convert.ToInt32(emailOptions[nameof(EmailOptions.Port)])
        };
      });

      return services;
    }

    #endregion Extensions
  }
}
