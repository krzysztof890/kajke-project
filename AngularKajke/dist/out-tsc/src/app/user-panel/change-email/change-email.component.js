var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { UserPanelService } from '../user-panel.service';
import { catchError, finalize } from 'rxjs/operators';
var ChangeEmailComponent = /** @class */ (function () {
    function ChangeEmailComponent(formBuilder, userPanelService) {
        this.formBuilder = formBuilder;
        this.userPanelService = userPanelService;
        this.isRequesting = false;
    }
    Object.defineProperty(ChangeEmailComponent.prototype, "newEmail", {
        get: function () { return this.changeEmailForm.get('newEmail'); },
        enumerable: true,
        configurable: true
    });
    ChangeEmailComponent.prototype.ngOnInit = function () {
        this.changeEmailForm = this.formBuilder.group({
            newEmail: ['', [Validators.required, Validators.email]]
        });
    };
    ChangeEmailComponent.prototype.ngOnDestroy = function () {
        if (this.sub !== undefined) {
            this.sub.unsubscribe();
        }
    };
    ChangeEmailComponent.prototype.onSubmit = function (value) {
        var _this = this;
        this.isRequesting = true;
        this.sub = this.userPanelService.sendChangeEmailLink({ email: value.newEmail })
            .pipe(catchError(this.userPanelService.handleErrors), finalize(function () { return _this.isRequesting = false; }))
            .subscribe(function (res) {
            if (res) {
                alert('Zobacz swoja skrzynke pocztową aby dokończyć zmiane adresu email.');
            }
        }, function (errors) { return _this.errors = errors; });
    };
    ChangeEmailComponent = __decorate([
        Component({
            selector: 'app-change-email',
            templateUrl: './change-email.component.html',
            styleUrls: ['./change-email.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, UserPanelService])
    ], ChangeEmailComponent);
    return ChangeEmailComponent;
}());
export { ChangeEmailComponent };
//# sourceMappingURL=change-email.component.js.map