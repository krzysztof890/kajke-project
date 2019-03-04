import { throwError } from 'rxjs';
/**
 * Podstawa dla usług ktore beda musialy obslugiwac bledy zwrocone z serwera
 */
var BaseService = /** @class */ (function () {
    function BaseService() {
    }
    /**
     *  Metoda sluzy do wyłuskania błedow i ich zwrocenia
     */
    BaseService.prototype.handleErrors = function (error) {
        // jesli blad serwera przeleci wszystki tablice z bledami i obrobi do jedno stringa
        var errorModel = '';
        for (var key in error.error) {
            if (error.error.hasOwnProperty(key)) {
                errorModel += error.error[key].toString() + ' \n ';
            }
        }
        return throwError(errorModel);
    };
    return BaseService;
}());
export { BaseService };
//# sourceMappingURL=base.service.js.map