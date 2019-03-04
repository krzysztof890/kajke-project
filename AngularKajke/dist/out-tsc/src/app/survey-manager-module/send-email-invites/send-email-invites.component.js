var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { SurveyService } from './../survey.service';
import { Component, Input } from '@angular/core';
import { catchError } from 'rxjs/operators';
var SendEmailInvitesComponent = /** @class */ (function () {
    function SendEmailInvitesComponent(surveyService) {
        var _this = this;
        this.surveyService = surveyService;
        this.emails = [];
        this.validEmail = true;
        this.subs = [];
        this.subs.push(surveyService.isRequestingObservable.subscribe(function (isRequesting) { return _this.isRequesting = isRequesting; }));
    }
    SendEmailInvitesComponent.prototype.ngOnInit = function () {
    };
    /**
     * Dodaj email do listy
     */
    SendEmailInvitesComponent.prototype.addEmail = function () {
        // walidacja
        this.validEmail = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$').test(this.email);
        if (this.validEmail) {
            this.emails.push(this.email);
            this.email = '';
        }
    };
    /**
     * Usuń email z listy
     */
    SendEmailInvitesComponent.prototype.remowe = function (number) {
        this.emails.splice(number, 1);
    };
    SendEmailInvitesComponent.prototype.sendEmailsInvites = function () {
        if (this.emails.length === 0) {
            return;
        }
        this.subs.push(this.surveyService.sendEmailsInvites(this.emails, this.link).pipe(catchError(this.surveyService.handleErrors))
            .subscribe(function (res) {
            alert('Wysłano zaproszenia do ankiety!');
        }, function (error) {
            alert(error);
        }));
    };
    SendEmailInvitesComponent.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe; });
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SendEmailInvitesComponent.prototype, "link", void 0);
    SendEmailInvitesComponent = __decorate([
        Component({
            selector: 'app-send-email-invites',
            templateUrl: './send-email-invites.component.html',
            styleUrls: ['./send-email-invites.component.css']
        }),
        __metadata("design:paramtypes", [SurveyService])
    ], SendEmailInvitesComponent);
    return SendEmailInvitesComponent;
}());
export { SendEmailInvitesComponent };
//# sourceMappingURL=send-email-invites.component.js.map