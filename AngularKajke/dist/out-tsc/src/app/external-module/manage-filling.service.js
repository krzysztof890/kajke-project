var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { UserService } from './../shared/services/user.service';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConfigService } from '../shared/utilities/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BaseService } from '../shared/services/base.service';
/**
 * Usługa ktora zarządza wypełniamiem ankiety. Jej zadaniem jest zebranie wszystkich odpwiedzi a nastepnie ich walidacja.
 * Po udanej walidacji ma wysłac zestaw odpowiedzi do api.
 */
var ManageFillingService = /** @class */ (function (_super) {
    __extends(ManageFillingService, _super);
    function ManageFillingService(configService, http, userService) {
        var _this = _super.call(this) || this;
        _this.configService = configService;
        _this.http = http;
        _this.userService = userService;
        _this.completeTheSurveySource = new Subject();
        /**
         * Observable ktory ma komunikowac aby komponenty przesłay swoje zestawy odpowiedzi ankiety do usługi
         */
        _this.completeTheSurveyObservable = _this.completeTheSurveySource.asObservable();
        _this.canFinishSurveySource = new Subject();
        /**
         * Observable ktory ma komunikowac czy wszystkie komponenty wyslaly swoje odpowiedzi na pytanie do usługi
         */
        _this.canFinishSurveyObservable = _this.canFinishSurveySource.asObservable();
        _this.baseUrl = configService.getApiURI() + '/Survey';
        return _this;
    }
    /**
     * Komunikuje ,że dokonujemy subskrypcji completeTheSurveyObservable
     */
    ManageFillingService.prototype.onSubscribing = function () {
        this.subscriptionsCount++;
    };
    /**
    * Komunikuje ,że kończymy subskrypcje completeTheSurveyObservable
    */
    ManageFillingService.prototype.onUnsubscribing = function () {
        this.subscriptionsCount--;
    };
    /**
     * Komunikuje ,że ukończyło sie dostaczenie danych do ManageFillingService z komponetu
     */
    ManageFillingService.prototype.onCompleting = function () {
        this.completedSubscriptions++;
        // jesli liczba subskrybcji jest rowna liczbe komponetow ktoe przesłay swoje dane
        // mozna rozpoczac proces koncowy wypełniena ankiety
        if (this.subscriptionsCount === this.completedSubscriptions) {
            this.completedSubscriptions = 0;
            this.canFinishSurveySource.next();
        }
    };
    /**
     * Zakomunikuj ,że wypełnianie ankietay ma zostać zakonczone
    */
    ManageFillingService.prototype.completeTheSurvey = function () {
        // daj znac komponentą ze maja rozpoczac wysyłanie odpowiedzi do usługi
        this.completeTheSurveySource.next();
    };
    /**
     * Wyzeruje zawartość serwisu aby była gotowa do ponownej pracy
     * Jej wywołanie jest wymagane do rozpoczecia pracy z usługa
     */
    ManageFillingService.prototype.resetService = function () {
        this.completedSubscriptions = 0;
        this.subscriptionsCount = 0;
        this.answersProvided = [];
    };
    ManageFillingService.prototype.fillSurvey = function (link, body) {
        // ustawienie nagłowka, token jest wymaganu do autoryzacji
        var header = new HttpHeaders({
            'Content-Type': 'application/json', 'Authorization': this.userService.getAuthorizationToken(),
            'link': link
        });
        return this.http.post(this.baseUrl + '/FillSurvey', body, { headers: header, observe: 'body', responseType: 'json' })
            .pipe(map((function (res) { return true; })));
    };
    ManageFillingService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ConfigService, HttpClient, UserService])
    ], ManageFillingService);
    return ManageFillingService;
}(BaseService));
export { ManageFillingService };
//# sourceMappingURL=manage-filling.service.js.map