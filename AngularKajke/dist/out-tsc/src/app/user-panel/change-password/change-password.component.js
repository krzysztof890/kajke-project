var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { UserPanelService } from './../user-panel.service';
import { ValidationsOptions } from './../../shared/validators/validations-options';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
var MyErrorStateMatcher = /** @class */ (function () {
    function MyErrorStateMatcher() {
    }
    MyErrorStateMatcher.prototype.isErrorState = function (control, form) {
        var invalidCtrl = !!(control && control.invalid && control.parent.dirty);
        var invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
        return (invalidCtrl || invalidParent);
    };
    return MyErrorStateMatcher;
}());
export { MyErrorStateMatcher };
var ChangePasswordComponent = /** @class */ (function () {
    function ChangePasswordComponent(formBuilder, userService, userPanelService, router) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.userPanelService = userPanelService;
        this.router = router;
        this.matcher = new MyErrorStateMatcher();
        this.isRequesting = false;
        this.passwordMinSize = ValidationsOptions.RequiredPasswordLength;
        this.changePasswordForm = this.formBuilder.group({
            newPassword: ['', [Validators.required, Validators.minLength(this.passwordMinSize)]],
            matchNewPassword: ['', [Validators.required]],
            oldPassword: ['', [Validators.required, Validators.minLength(this.passwordMinSize)]]
        }, { validator: this.checkPasswords });
    }
    Object.defineProperty(ChangePasswordComponent.prototype, "newPassword", {
        get: function () { return this.changePasswordForm.get('newPassword'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChangePasswordComponent.prototype, "matchNewPassword", {
        get: function () { return this.changePasswordForm.get('matchNewPassword'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChangePasswordComponent.prototype, "oldPassword", {
        get: function () { return this.changePasswordForm.get('oldPassword'); },
        enumerable: true,
        configurable: true
    });
    ChangePasswordComponent.prototype.checkPasswords = function (group) {
        var pass = group.controls.newPassword.value;
        var confirmPass = group.controls.matchNewPassword.value;
        return pass === confirmPass ? null : { mismatch: true };
    };
    ChangePasswordComponent.prototype.onSubmit = function (value) {
        var _this = this;
        this.isRequesting = true;
        this.sub = this.userPanelService.changePassword({ currentPassword: value.oldPassword, newPassword: value.newPassword })
            .pipe(catchError(this.userService.handleErrors), finalize(function () { return _this.isRequesting = false; }))
            .subscribe(function (res) {
            if (res) {
                _this.userService.logout();
                _this.router.navigate(['/login']);
            }
        }, function (errors) { return _this.errors = errors; });
    };
    ChangePasswordComponent.prototype.ngOnDestroy = function () {
        if (this.sub !== undefined) {
            this.sub.unsubscribe();
        }
    };
    ChangePasswordComponent = __decorate([
        Component({
            selector: 'app-change-password',
            templateUrl: './change-password.component.html',
            styleUrls: ['./change-password.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, UserService,
            UserPanelService, Router])
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}());
export { ChangePasswordComponent };
//# sourceMappingURL=change-password.component.js.map