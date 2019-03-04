using AngularKajke.Classes;
using AngularKajke.Database;
using AngularKajke.Extensions;
using AngularKajke.Helpers;
using AngularKajke.Interfaces;
using AngularKajke.Models;
using AngularKajke.Services;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Net;

namespace AngularKajke
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      // usluga odpoewiedzialna za korzystanie z bazy danych
      services.AddDbContext<KajkeContext>(options =>
     options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")), ServiceLifetime.Transient, ServiceLifetime.Transient);

      //dodanie menadzera plikow
      services
        .AddTransient<IFileManager, FileManager>();

      //var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));
      //dodaj JWT
      services.AddJWT(Configuration.GetSection(nameof(JwtIssuerOptions)));
      //Włączanie mechanizmu CORS
      services.AddCors();
      // api user claim policy
      services.AddAuthorization(options =>
      {
        options.AddPolicy("ApiUser", policy => policy.RequireClaim(Constants.Strings.JwtClaimIdentifiers.Rol, Constants.Strings.JwtClaims.ApiAccess));
      });

      // dodaje microsoft identity core
      var builder = services.AddIdentityCore<ApplicationUser>(o =>
      {
        // konfiguracja opcji identity
        o.Password.RequireDigit = false;
        o.Password.RequireLowercase = false;
        o.Password.RequireUppercase = false;
        o.Password.RequireNonAlphanumeric = false;
        o.Password.RequiredLength = 6;
      });
      builder = new IdentityBuilder(builder.UserType, typeof(IdentityRole), builder.Services);
      builder.AddEntityFrameworkStores<KajkeContext>().AddDefaultTokenProviders();

      //załaduj konfiguracje palikacji
      services.AddAppSettings(Configuration);

      //usluga odpowiedziany za wysylanie email
      services
       .AddTransient<IEmailSender, EmailSender>()
       .AddTransient(x => new Lazy<IEmailSender>(
           () => x.GetRequiredService<IEmailSender>()));

      //dodanie usługi odpwiedzialnej za obsluge ankiet
      services
        .AddTransient<ISurveyManager<SurveyModel, FilledSurveyModel>, SurveyManager>()
         .AddTransient(x => new Lazy<ISurveyManager<SurveyModel, FilledSurveyModel>>(
           () => x.GetRequiredService<ISurveyManager<SurveyModel, FilledSurveyModel>>()));

      services.AddMvc(
          options =>
          {
            options.SslPort = 44321;
            options.Filters.Add(new RequireHttpsAttribute());
          }).AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>()); //dodaje FluentValidation
                                                                                                //TODO na produkcje ma uzywac HSTS
      services.Configure<MvcOptions>(options =>
      {
        options.Filters.Add(new RequireHttpsAttribute());
      });

      services.AddMemoryCache();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        //konfiguracja mechanizmu CORS
        app.UseCors(builder => builder
                  .AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials());
      }
      //obłsuga nie obsłużonynch wyjatkow aplikacji i zwracanie błedu do klienta
      app.UseExceptionHandler(
      builder =>
       {
         builder.Run(
                   async context =>
                   {
                     context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                     context.Response.Headers.Add("Access-Control-Allow-Origin", "*");

                     var error = context.Features.Get<IExceptionHandlerFeature>();
                     if (error != null)
                     {
                       context.Response.AddApplicationError(error.Error.Message);
                       await context.Response.WriteAsync(JsonConvert.SerializeObject(new { app_error = error.Error.Message })).ConfigureAwait(false);
                     }
                   });
       });
      app.UseAuthentication();
      app.UseDefaultFiles();
      app.UseStaticFiles();
      app.UseMvc();
      var option = new RewriteOptions()
        .AddRedirectToHttps(StatusCodes.Status301MovedPermanently, 44321);
      app.UseRewriter(option);

      // obsloguje sciezki powrotne
      app.Run(async (context) =>
      {
        //sprawdza czy trasa nie jest czescia api
        if (!context.Request.Path.Value.Contains("/api"))
        {
          context.Response.ContentType = "text/html";
          await context.Response.SendFileAsync(Path.Combine(env.WebRootPath, "index.html"));
        }
      });
    }
  }
}
