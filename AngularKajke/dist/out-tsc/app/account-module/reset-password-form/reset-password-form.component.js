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
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { finalize } from '../../../../node_modules/rxjs/internal/operators/finalize';
import { catchError } from '../../../../node_modules/rxjs/internal/operators/catchError';
var ResetPasswordFormComponent = /** @class */ (function () {
    function ResetPasswordFormComponent(userService, router, route) {
        var _this = this;
        this.userService = userService;
        this.router = router;
        this.route = route;
        this.isReseted = false;
        this.submitted = false;
        this.resetPassword = { email: '', password: '', code: '' };
        this.subs = new Array();
        // wyciaganie kodu tokena z url (praw ten syf, poprawiony sprawdz czy działa tak dla pewnosci potem)
        // const index = this.router.url.search('code=');
        // this.resetPassword.code = this.router.url.substring(index + 5);
        this.subs.push(this.route.queryParams.subscribe(function (params) { return _this.resetPassword.code = params.code; }));
    }
    /**
     * Wysle dane do zresetowania hasla wybranego uzytkownika
     */
    ResetPasswordFormComponent.prototype.reset = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        if (valid) {
            this.subs.push(this.userService.resetPassword(value.email, value.password, this.resetPassword.code)
                .pipe(finalize(function () { return _this.isRequesting = false; }), catchError(this.userService.handleErrors))
                .subscribe(function (result) {
                if (result) {
                    _this.isReseted = true;
                }
            }, function (error) { return _this.errors = error; }));
        }
    };
    ResetPasswordFormComponent.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
    };
    ResetPasswordFormComponent = __decorate([
        Component({
            selector: 'app-reset-password-form',
            templateUrl: './reset-password-form.component.html',
            styleUrls: ['./reset-password-form.component.css']
        })
        /**
         * Komponent odpowiada zresetowania hasła użytkownika
         */
        ,
        __metadata("design:paramtypes", [UserService, Router, ActivatedRoute])
    ], ResetPasswordFormComponent);
    return ResetPasswordFormComponent;
}());
export { ResetPasswordFormComponent };
//# sourceMappingURL=reset-password-form.component.js.map