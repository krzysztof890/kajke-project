/**
 * Przeprowadza walidacje podanej wartości przy użyciu zdefiniowanych walidatorow
 */
var CustomValidator = /** @class */ (function () {
    function CustomValidator(value, validators) {
        // dopuki nie stwierdzono niezgodnosci wartości jest ona poprawna
        this.valid = true;
        this.errors = '';
        for (var _i = 0, validators_1 = validators; _i < validators_1.length; _i++) {
            var validor = validators_1[_i];
            var result = validor.validate(value);
            if (!result.isValid) {
                // jesli stwierdzono niezgodność wartość nie jest poprawna i dodaj bład
                this.valid = false;
                this.errors += result.errorMessage + ' ';
            }
        }
    }
    return CustomValidator;
}());
export { CustomValidator };
//# sourceMappingURL=custom.validator.js.map