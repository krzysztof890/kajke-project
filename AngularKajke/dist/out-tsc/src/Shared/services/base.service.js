import { throwError } from 'rxjs';
var BaseService = /** @class */ (function () {
  function BaseService() {
  }
  // Metoda sluzy do wyłuskania błedow z HttErrorRespone i zwrocenie ich jako string
  BaseService.prototype.handleErrors = function (error) {
    var errorModel = '';
    for (var key in error.error) {
      if (error.error.hasOwnProperty(key)) {
        errorModel += error.error[key].toString() + '. \n';
      }
    }
    return throwError(errorModel);
  };
  return BaseService;
}());
export { BaseService };
//# sourceMappingURL=base.service.js.map
