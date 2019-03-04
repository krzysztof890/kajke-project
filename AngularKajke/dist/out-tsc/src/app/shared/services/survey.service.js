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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { finalize } from 'rxjs/operators';
import { BaseService } from './base.service';
import { ConfigService } from '../utilities/config.service';
import { UserService } from './user.service';
import { Survey } from '../Models/survey';
import { SurveyResults } from '../Models/survey-results';
/**
 * Usługa ktora dostarcza mozliwosc komunikacji dla komponentow ankiety z api
 */
var SurveyService = /** @class */ (function (_super) {
    __extends(SurveyService, _super);
    function SurveyService(configService, userService, http) {
        var _this = _super.call(this) || this;
        _this.configService = configService;
        _this.userService = userService;
        _this.http = http;
        _this.baseUrl = '';
        _this.isRequestingSource = new BehaviorSubject(false);
        /**
         * Observable ktory ma komunikowac czy jest się w trakcie żadania to api ankiety
         */
        _this.isRequestingObservable = _this.isRequestingSource.asObservable();
        // do monitorowania tego czy zmienila sie strukyitra ankiety
        // zmiana tresci pytania lib odpowiedzi nie wpływa na to
        _this.surveyWasEditedSource = new Subject();
        _this.surveyWasEditedObservable = _this.surveyWasEditedSource.asObservable();
        _this.baseUrl = configService.getApiURI() + '/Survey';
        return _this;
    }
    /**
     * Utworz ankiete w serwisie
     * @param body Model ankiety w formacie json
     */
    SurveyService.prototype.createSurvey = function (body) {
        var _this = this;
        // ustawienie nagłowka, token jest wymaganu do autoryzacji
        var header = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.userService.getAuthorizationToken() });
        this.isRequestingSource.next(true);
        return this.http.post(this.baseUrl + '/CreateSurvey', body, { headers: header, observe: 'body', responseType: 'json' })
            .pipe(finalize(function () { return _this.isRequestingSource.next(false); }), map((function (res) { return true; })));
    };
    /**
     * Pobiera ankiety uzytkownika z api
     */
    SurveyService.prototype.getUserSurveys = function () {
        var _this = this;
        // ustawienie nagłowka, token jest wymaganu do autoryzacji
        var header = new HttpHeaders({ 'Authorization': this.userService.getAuthorizationToken() });
        this.isRequestingSource.next(true);
        return this.http.get(this.baseUrl + '/GetUserSurveys', { headers: header, responseType: 'json' })
            .pipe(finalize(function () { return _this.isRequestingSource.next(false); }), map(function (res) { return res; }));
    };
    /**
     * Usuwa ankiete uzytkownika z serwisu
     * @param link wygenerowany identyfikator ankiety do odsyłacza
     */
    SurveyService.prototype.remoweSurvey = function (link) {
        var _this = this;
        var header = new HttpHeaders({ 'Link': link, 'Authorization': this.userService.getAuthorizationToken() });
        this.isRequestingSource.next(true);
        return this.http.delete(this.baseUrl + '/DeleteSurvey', { headers: header, observe: 'body', responseType: 'json' })
            .pipe(finalize(function () { return _this.isRequestingSource.next(false); }), map(function (res) { return true; }));
    };
    /**
     * Pobierz wybrana ankiete
     * @param link identyfikator ankiety
     */
    SurveyService.prototype.getSurvey = function (link) {
        var _this = this;
        var header = new HttpHeaders({ 'Authorization': this.userService.getAuthorizationToken() });
        this.isRequestingSource.next(true);
        return this.http.get(this.baseUrl + '/GetSurvey?link=' + link, { headers: header, responseType: 'json' }).pipe(finalize(function () { return _this.isRequestingSource.next(false); }), map(function (res) { return Object.setPrototypeOf(res, new Survey); }));
    };
    /**
     * Edytuj ankiete w serwisie
     * @param body Model ankiety w formacie json
     */
    SurveyService.prototype.editSurvey = function (link, body, structureWasChanged) {
        // ustawienie nagłowka, token jest wymaganu do autoryzacji
        var _this = this;
        var header = new HttpHeaders({
            'Content-Type': 'application/json', 'Authorization': this.userService.getAuthorizationToken(),
            'link': link, 'structureWasChanged': JSON.stringify(structureWasChanged)
        });
        this.isRequestingSource.next(true);
        return this.http.post(this.baseUrl + '/EditSurvey', body, { headers: header, observe: 'body', responseType: 'json' })
            .pipe(finalize(function () { return _this.isRequestingSource.next(false); }), map((function (res) { return true; })));
    };
    /**
     * Wyślij zaproszenia email do ankiety
     * @param emails Lista adresow email
     * @param link  Indentyfikator ankiety
     */
    SurveyService.prototype.sendEmailsInvites = function (emails, link) {
        // ustawienie nagłowka, token jest wymaganu do autoryzacji
        var header = new HttpHeaders({
            'Content-Type': 'application/json', 'Authorization': this.userService.getAuthorizationToken(),
            'link': link
        });
        var body = JSON.stringify({ Emails: emails });
        // this.isRequestingSource.next(true);
        return this.http.post(this.baseUrl + '/SendEmailsInvites', body, { headers: header, observe: 'body', responseType: 'json' })
            .pipe(
        // finalize(() => this.isRequestingSource.next(false)),
        map((function (res) { return true; })));
    };
    /**
     * Pobierz wyniki ankiety
     * @param link identyfakator ankiety
     */
    SurveyService.prototype.getSurveyResults = function (link) {
        var _this = this;
        var header = new HttpHeaders({ 'Authorization': this.userService.getAuthorizationToken() });
        this.isRequestingSource.next(true);
        return this.http.get(this.baseUrl + '/GetSurveyResults?link=' + link, { headers: header, responseType: 'json' }).pipe(finalize(function () { return _this.isRequestingSource.next(false); }), map(function (res) { return Object.setPrototypeOf(res, new SurveyResults); }));
    };
    SurveyService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ConfigService, UserService, HttpClient])
    ], SurveyService);
    return SurveyService;
}(BaseService));
export { SurveyService };
//# sourceMappingURL=survey.service.js.map