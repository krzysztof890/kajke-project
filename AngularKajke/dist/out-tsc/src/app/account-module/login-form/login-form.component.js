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
import { Router } from '@angular/router';
import { finalize, catchError } from 'rxjs/operators';
var LoginFormComponent = /** @class */ (function () {
    function LoginFormComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this.submitted = false;
        this.credentials = { email: '', password: '' };
    }
    /**
     * Wysyła danie logowania do Api
     */
    LoginFormComponent.prototype.login = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        if (valid) {
            this.sub = this.userService.login(value.email, value.password)
                .pipe(finalize(function () { return _this.isRequesting = false; }), catchError(this.userService.handleErrors))
                .subscribe(function (result) {
                if (result) {
                    // jesli sie udalo przekieruj na strone uzytkownika
                    console.log(_this.userService.getAuthorizationToken());
                    _this.router.navigate(['/user/home']);
                }
            }, function (error) { return _this.errors = error; });
        }
    };
    LoginFormComponent.prototype.ngOnDestroy = function () {
        if (this.sub !== undefined) {
            this.sub.unsubscribe();
        }
    };
    LoginFormComponent = __decorate([
        Component({
            selector: 'app-login-form',
            templateUrl: './login-form.component.html',
            styleUrls: ['./login-form.component.css']
        })
        /**
         * Komponent odpowiada logowanie uzytkownika do servisu
         */
        ,
        __metadata("design:paramtypes", [UserService, Router])
    ], LoginFormComponent);
    return LoginFormComponent;
}());
export { LoginFormComponent };
//# sourceMappingURL=login-form.component.js.map