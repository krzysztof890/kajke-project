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
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { UserPanelService } from '../user-panel.service';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
var DeleteAccountComponent = /** @class */ (function () {
    function DeleteAccountComponent(formBuilder, userService, userPanelService, router) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.userPanelService = userPanelService;
        this.router = router;
        this.isRequesting = false;
    }
    Object.defineProperty(DeleteAccountComponent.prototype, "password", {
        get: function () { return this.deleteAccountForm.get('password'); },
        enumerable: true,
        configurable: true
    });
    DeleteAccountComponent.prototype.ngOnInit = function () {
        this.deleteAccountForm = this.formBuilder.group({
            password: ['', [Validators.required]]
        });
    };
    DeleteAccountComponent.prototype.ngOnDestroy = function () {
        if (this.sub !== undefined) {
            this.sub.unsubscribe();
        }
    };
    DeleteAccountComponent.prototype.onSubmit = function (value) {
        var _this = this;
        if (confirm('Na pewno chcesz usunąć swoje konto w serwisie ?')) {
            this.isRequesting = true;
            this.sub = this.userPanelService.deleteAccount({ password: value.password }).pipe(catchError(this.userService.handleErrors), finalize(function () { return _this.isRequesting = false; }))
                .subscribe(function (res) {
                _this.userService.logout();
                _this.router.navigate(['/login']);
            }, function (errors) { return _this.errors = errors; });
        }
    };
    DeleteAccountComponent = __decorate([
        Component({
            selector: 'app-delete-account',
            templateUrl: './delete-account.component.html',
            styleUrls: ['./delete-account.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, UserService,
            UserPanelService, Router])
    ], DeleteAccountComponent);
    return DeleteAccountComponent;
}());
export { DeleteAccountComponent };
//# sourceMappingURL=delete-account.component.js.map