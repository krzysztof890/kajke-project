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
import { BaseService } from './base.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../utilities/config.service';
import { map } from 'rxjs/operators';
/**
 * Usługa ktora odpowiada za obsługe systemu logowania i rejestracji uytkownika
 */
var UserService = /** @class */ (function (_super) {
    __extends(UserService, _super);
    function UserService(http, configService) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.configService = configService;
        _this.baseUrl = '';
        // komunikuje czy jestesmy zalogowani lub nie przydaje sie do odswierzania zawartosci głownego navbar
        _this._authNavStatusSource = new BehaviorSubject(false);
        _this.authNavStatus$ = _this._authNavStatusSource.asObservable();
        _this.loggedIn = false;
        // jesli nie ma tokenu uzytkownik nie jest zalogowany
        _this.loggedIn = !!localStorage.getItem('auth_token');
        // przekaz czy uzytkownik jest zalogowany
        _this._authNavStatusSource.next(_this.loggedIn);
        _this.baseUrl = configService.getApiURI();
        return _this;
    }
    /**
     * Loguje uzytkownika do serwisu. Jeśli operacja sie powiedzie zostanie otzymany tokem JWT.
     * @param email Email uzytkownika
     * @param password Hasło użytkownika
     */
    UserService.prototype.login = function (email, password) {
        var _this = this;
        // ustaw naglowek
        var header = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http
            .post(this.baseUrl + '/accounts/login', JSON.stringify({ email: email, password: password }), { headers: header, observe: 'body', responseType: 'json' }).pipe(map((function (res) {
            // jesli sie udalo zapisac token, ustawic ze zalogowano
            localStorage.setItem('auth_token', res.auth_token);
            localStorage.setItem('user_name', res.user_name);
            _this.loggedIn = true;
            _this._authNavStatusSource.next(true);
            return true;
        })));
    };
    // rejestracja konta uzytkownika w serwisie
    /**
     * Wysle dane uzytkownika do serwisu w celu utowrzenia nowego konta
     * @param email Email uzytkownika
     * @param password Hasło użytkownika
     */
    UserService.prototype.register = function (email, password) {
        // ustaw naglowek
        var header = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http
            .post(this.baseUrl + '/accounts/register', JSON.stringify({ email: email, password: password }), { headers: header, observe: 'body', responseType: 'json' }).pipe(map((function (res) { return true; })));
    };
    // wysyła link potwierdzajacy email do api serwera by obsluzolo to
    /**
     *  Wysyła link potwierdzajacy email do api serwera by obsluzylo go i potwierdzilo adres email
     * @param url Adres Url ktory zawiera wygenerowany token do potwierdzenia adresu email
     */
    UserService.prototype.confirmEmail = function (url) {
        return this.http.get(this.baseUrl + '/accounts' + url).pipe(map((function (res) { return true; })));
    };
    /**
     * Wysle email uzytkownika do api aby to wygenerowało link to powierdzenia i wyslago go na ten email
     * @param email Email uzytkownika
     */
    UserService.prototype.sendEmaiConfirmationLink = function (email) {
        return this.http.get(this.baseUrl + '/accounts/SendAgainEmailConfirmation?email=' + email).pipe(map((function (res) { return true; })));
    };
    /**
     * Wysle wskazany email do api aby na niego przyszedl link do zresetowania hasła
     * @param email Email uzytkownika
     */
    UserService.prototype.forgotPassword = function (email) {
        return this.http.get(this.baseUrl + '/accounts/forgotpassword?email=' + email).pipe(map((function (res) { return true; })));
    };
    /**
     * Wysle wskazane dane do api aby to zresetowalo hasło
     * @param email Email uzytkownika
     * @param password Haslo uzytkownika
     * @param code kod tokena do zresetowania hasła
     */
    UserService.prototype.resetPassword = function (email, password, code) {
        // ustaw naglowek
        var header = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http
            .post(this.baseUrl + '/accounts/resetpassword', JSON.stringify({ email: email, password: password, code: code }), { headers: header, observe: 'body', responseType: 'json' }).pipe(map((function (res) { return true; })));
    };
    /**
     * Wyloguj uzytkownika
     */
    UserService.prototype.logout = function () {
        // usun token i oznacz ze nie jest zalogowany
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_name');
        this.loggedIn = false;
        this._authNavStatusSource.next(false);
    };
    /**
     * Zwraca czy jakis uzytkownik jest zalogowany
     */
    UserService.prototype.isLoggedIn = function () {
        return this.loggedIn;
    };
    /**
     * Zwraca nazwa bierzacego użytkownika
     */
    UserService.prototype.getUserName = function () {
        return localStorage.getItem('user_name');
    };
    UserService.prototype.getAuthorizationToken = function () {
        return 'Bearer ' + localStorage.getItem('auth_token');
    };
    /**
     * Sprawdza czy token autoryzcji jest ciagle ważny
     * Jesli nie jest to przeniesie sie aplicka na strone logowania
     */
    UserService.prototype.IsAuthorized = function () {
        // ustawienie nagłowka, token jest wymaganu do autoryzacji
        var header = new HttpHeaders({ 'Authorization': this.getAuthorizationToken() });
        return this.http.get(this.baseUrl + '/Survey/IsAuthorized', { headers: header, observe: 'body', responseType: 'json' }).pipe(map((function (res) { return true; })));
    };
    UserService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, ConfigService])
    ], UserService);
    return UserService;
}(BaseService));
export { UserService };
//# sourceMappingURL=user.service.js.map