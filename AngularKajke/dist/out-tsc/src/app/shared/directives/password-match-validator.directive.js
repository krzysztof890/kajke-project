var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
var PasswordMatchValidatorDirective = /** @class */ (function () {
    function PasswordMatchValidatorDirective() {
    }
    PasswordMatchValidatorDirective_1 = PasswordMatchValidatorDirective;
    PasswordMatchValidatorDirective.prototype.validate = function (control) {
        var toCompare = control.parent.get(this.PasswordMatchValidator);
        if (toCompare && toCompare.value !== control.value) {
            return { 'notEqual': true };
        }
        return null;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PasswordMatchValidatorDirective.prototype, "PasswordMatchValidator", void 0);
    PasswordMatchValidatorDirective = PasswordMatchValidatorDirective_1 = __decorate([
        Directive({
            selector: '[appPasswordMatchValidator]',
            providers: [{
                    provide: NG_VALIDATORS,
                    useExisting: PasswordMatchValidatorDirective_1,
                    multi: true
                }]
        }),
        __metadata("design:paramtypes", [])
    ], PasswordMatchValidatorDirective);
    return PasswordMatchValidatorDirective;
    var PasswordMatchValidatorDirective_1;
}());
export { PasswordMatchValidatorDirective };
//# sourceMappingURL=password-match-validator.directive.js.map