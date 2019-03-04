namespace AngularKajke.Helpers
{
  public static class Constants
  {
    public static class Strings
    {
      public static class JwtClaimIdentifiers
      {
        public const string Rol = "rol", Id = "id";
      }

      public static class JwtClaims
      {
        public const string ApiAccess = "api_access";
      }

      public static class Exceptions
      {
        public const string SurveyCreationException = " Nie udało się utworzyc nowego egzemplarza ankiety. ";
        public const string SurveyDeletionException = " Nie udało sie usunać egzemplarza ankiet. ";
        public const string SurveyNonexistenceException = " Wybrana ankieta nie istnieje w serwisie. ";
        public const string SurveyFileDoNotExistException = " Plik ankiety nie istnieje. Dostęp do danych jest niemozliwy. ";
        public const string SurveyEditionException = " Nie udało sie dokonać edycji ankiety. ";
        public const string SurveyFillingException = " Wystapił nieoczekiwany bład. Nie udało sie wypełnić egzemplarza ankiety w bazie danych. ";
        public const string SurveyAccessException = " Użytkownik nie stworzył wybranej ankiety. ";
      }
    }
  }
}
