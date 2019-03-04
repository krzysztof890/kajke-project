var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ValidationsOptions } from './../../shared/validators/validations-options';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/internal/operators/finalize';
import { catchError } from 'rxjs/internal/operators/catchError';
var RegisterFormComponent = /** @class */ (function () {
    function RegisterFormComponent(userService, router, formBuilder) {
        this.userService = userService;
        this.router = router;
        this.formBuilder = formBuilder;
        this.isRegistered = false;
    }
    Object.defineProperty(RegisterFormComponent.prototype, "email", {
        get: function () { return this.registerForm.get('email'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterFormComponent.prototype, "password", {
        get: function () { return this.registerForm.get('password'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterFormComponent.prototype, "passwordMatch", {
        get: function () { return this.registerForm.get('passwordMatch'); },
        enumerable: true,
        configurable: true
    });
    RegisterFormComponent.prototype.ngOnInit = function () {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(ValidationsOptions.RequiredPasswordLength)]],
            passwordMatch: ['', [Validators.required]]
        }, { validator: this.checkPasswords });
    };
    RegisterFormComponent.prototype.checkPasswords = function (group) {
        var pass = group.controls.password.value;
        var confirmPass = group.controls.passwordMatch.value;
        return pass === confirmPass ? null : { mismatch: true };
    };
    /**
     * Wyslil dane uzytkownika do rejestracji
     */
    RegisterFormComponent.prototype.register = function () {
        var _this = this;
        console.log('weszo');
        this.isRequesting = true;
        this.errors = '';
        this.sub = this.userService.register(this.email.value, this.password.value)
            .pipe(finalize(function () { return _this.isRequesting = false; }), catchError(this.userService.handleErrors))
            .subscribe(function (result) {
            if (result) {
                _this.isRegistered = true;
            }
        }, function (error) { return _this.errors = error; });
    };
    RegisterFormComponent.prototype.ngOnDestroy = function () {
        if (this.sub !== undefined) {
            this.sub.unsubscribe();
        }
    };
    RegisterFormComponent = __decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register-form.component.html',
            styleUrls: ['./register-form.component.css']
        })
        /**
         * Komponent odpowiada za rejestracje uzytkownika w serwisie
         */
        ,
        __metadata("design:paramtypes", [UserService, Router, FormBuilder])
    ], RegisterFormComponent);
    return RegisterFormComponent;
}());
export { RegisterFormComponent };
//# sourceMappingURL=register-form.component.js.map