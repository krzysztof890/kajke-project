/**
 * Sprawdza czy podany string nie jest dłuższy niż okreslona wartosc
 */
var MaxLengthValidator = /** @class */ (function () {
  function MaxLengthValidator(maxLength, errorMessage) {
    this.maxLength = maxLength;
    this.errorMessage = errorMessage;
  }
  MaxLengthValidator.prototype.validate = function (value) {
    if (value.length > this.maxLength) {
      return { isValid: false, errorMessage: this.errorMessage };
    }
    else {
      return { isValid: true, errorMessage: '' };
    }
  };
  return MaxLengthValidator;
}());
export { MaxLengthValidator };
//# sourceMappingURL=max-length.validator.js.map
