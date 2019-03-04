var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { catchError, finalize } from 'rxjs/operators';
import { UserService } from '../../shared/services/user.service';
import { Component } from '@angular/core';
var SendConfirmationLinkFormComponent = /** @class */ (function () {
    function SendConfirmationLinkFormComponent(userService) {
        this.userService = userService;
        this.isSent = false;
        this.submitted = false;
        this.userEmail = '';
    }
    // wyslil link potwierdzjacy
    SendConfirmationLinkFormComponent.prototype.sendLink = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        if (valid) {
            this.sub = this.userService.sendEmaiConfirmationLink(value.email).pipe(finalize(function () { return _this.isRequesting = false; }), catchError(this.userService.handleErrors))
                .subscribe(function (res) {
                _this.isSent = true;
            }, function (errors) {
                _this.errors = errors;
            });
        }
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
        __metadata("design:paramtypes", [UserService])
    ], SendConfirmationLinkFormComponent);
    return SendConfirmationLinkFormComponent;
}());
export { SendConfirmationLinkFormComponent };
//# sourceMappingURL=send-confirmation-link-form.component.js.map