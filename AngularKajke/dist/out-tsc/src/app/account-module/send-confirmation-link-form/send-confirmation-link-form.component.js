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
import { catchError, finalize } from 'rxjs/operators';
import { UserService } from '../../shared/services/user.service';
import { Component } from '@angular/core';
var SendConfirmationLinkFormComponent = /** @class */ (function () {
    function SendConfirmationLinkFormComponent(userService, formBuilder) {
        this.userService = userService;
        this.formBuilder = formBuilder;
        this.isSent = false;
    }
    Object.defineProperty(SendConfirmationLinkFormComponent.prototype, "email", {
        get: function () { return this.confirmForm.get('email'); },
        enumerable: true,
        configurable: true
    });
    SendConfirmationLinkFormComponent.prototype.ngOnInit = function () {
        this.confirmForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    };
    // wyslil link potwierdzjacy
    SendConfirmationLinkFormComponent.prototype.sendLink = function () {
        var _this = this;
        this.isRequesting = true;
        this.errors = '';
        this.sub = this.userService.sendEmaiConfirmationLink(this.email.value).pipe(finalize(function () { return _this.isRequesting = false; }), catchError(this.userService.handleErrors))
            .subscribe(function (res) {
            _this.isSent = true;
        }, function (errors) {
            _this.errors = errors;
        });
    };
    SendConfirmationLinkFormComponent.prototype.ngOnDestroy = function () {
        if (this.sub !== undefined) {
            this.sub.unsubscribe();
        }
    };
    SendConfirmationLinkFormComponent = __decorate([
        Component({
            selector: 'app-send-confirmation-link-form',
            templateUrl: './send-confirmation-link-form.component.html',
            styleUrls: ['./send-confirmation-link-form.component.css']
        })
        /**
         * Komponent odpowiada za widok  wysyłajacy link potwierdzajacy adres email
         */
        ,
        __metadata("design:paramtypes", [UserService, FormBuilder])
    ], SendConfirmationLinkFormComponent);
    return SendConfirmationLinkFormComponent;
}());
export { SendConfirmationLinkFormComponent };
//# sourceMappingURL=send-confirmation-link-form.component.js.map