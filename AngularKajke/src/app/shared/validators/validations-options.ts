/**
 * Klasa ktora przechowuje reguły walidacji danych
 */
export class ValidationsOptions {
  /**
   * Maksymalna długość odpowiedzi na pytanie tekstowe w ankciecie
   */
  public static MaxLengthOfTheAnswer = 300;
  /**
   * Maksymalna długość nazwy ankiety
   */
  public static SurveyNameMmaxLength = 160;
  /**
   * Maksymalna długość opisu ankiety
   */
  public static SurveyDescriptionMmaxLength = 1500;
  /**
  * Maksymalna długość pytania ankiety
  */
  public static SurveyQuestionMmaxLength = 400;
  /**
   * Minimalna długośc hasła
  */
  public static RequiredPasswordLength = 6;
}
