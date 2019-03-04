/**
 * Sprawdza czy podany cia znakow nie jest pusty
 */
var RequiredValidator = /** @class */ (function () {
    function RequiredValidator(errorMessage) {
        this.errorMessage = errorMessage;
    }
    RequiredValidator.prototype.validate = function (value) {
        if (value.trim().length > 0) {
            return { isValid: true, errorMessage: null };
        }
        else {
            return { isValid: false, errorMessage: this.errorMessage };
        }
    };
    return RequiredValidator;
}());
export { RequiredValidator };
//# sourceMappingURL=required.validator.js.map