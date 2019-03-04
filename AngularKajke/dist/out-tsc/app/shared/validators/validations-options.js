/**
 * Klasa ktora przechowuje reguły walidacji danych
 */
var ValidationsOptions = /** @class */ (function () {
    function ValidationsOptions() {
    }
    /**
     * Maksymalna długość odpowiedzi na pytanie tekstowe w ankciecie
     */
    ValidationsOptions.MaxLengthOfTheAnswer = 300;
    /**
     * Maksymalna długość nazwy ankiety
     */
    ValidationsOptions.SurveyNameMmaxLength = 160;
    /**
     * Maksymalna długość opisu ankiety
     */
    ValidationsOptions.SurveyDescriptionMmaxLength = 450;
    /**
    * Maksymalna długość pytania ankiety
    */
    ValidationsOptions.SurveyQuestionMmaxLength = 400;
    return ValidationsOptions;
}());
export { ValidationsOptions };
//# sourceMappingURL=validations-options.js.map