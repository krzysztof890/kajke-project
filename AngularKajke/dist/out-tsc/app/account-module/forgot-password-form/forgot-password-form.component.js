var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { finalize } from 'rxjs/internal/operators/finalize';
import { catchError } from 'rxjs/internal/operators/catchError';
var ForgotpasswordFormComponent = /** @class */ (function () {
    function ForgotpasswordFormComponent(userService) {
        this.userService = userService;
        this.isSent = false;
        this.submitted = false;
        this.userEmail = '';
    }
    /**
     * Wyslil link potwierdzjacy
     */
    ForgotpasswordFormComponent.prototype.sendLink = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        // jesli forma jest poprawna
        if (valid) {
            this.sub = this.userService.forgotPassword(value.email).pipe(finalize(function () { return _this.isRequesting = false; }), catchError(this.userService.handleErrors))
                .subscribe(function (res) {
                _this.isSent = true;
            }, function (errors) {
                _this.errors = errors;
            });
        }
    };
    ForgotpasswordFormComponent.prototype.ngOnDestroy = function () {
        if (this.sub !== undefined) {
            this.sub.unsubscribe();
        }
    };
    ForgotpasswordFormComponent = __decorate([
        Component({
            selector: 'app-forgot-password-form',
            templateUrl: './forgot-password-form.component.html',
            styleUrls: ['./forgot-password-form.component.css']
        })
        // Komponent ten odpowiada za wysłanie adresu Url na email potrzebnego do zresetowania hasła użytkownika
        ,
        __metadata("design:paramtypes", [UserService])
    ], ForgotpasswordFormComponent);
    return ForgotpasswordFormComponent;
}());
export { ForgotpasswordFormComponent };
//# sourceMappingURL=forgot-password-form.component.js.map