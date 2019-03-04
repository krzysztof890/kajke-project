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
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../shared/utilities/config.service';
import { map } from 'rxjs/operators';
import { BaseService } from '../shared/services/base.service';
var UserPanelService = /** @class */ (function (_super) {
    __extends(UserPanelService, _super);
    function UserPanelService(userService, http, configService) {
        var _this = _super.call(this) || this;
        _this.userService = userService;
        _this.http = http;
        _this.configService = configService;
        _this.baseUrl = configService.getApiURI() + '/AccountManager';
        return _this;
    }
    UserPanelService.prototype.changePassword = function (value) {
        // ustawienie nagłowka, token jest wymaganu do autoryzacji
        var header = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.userService.getAuthorizationToken() });
        var body = JSON.stringify(value);
        return this.http.post(this.baseUrl + '/ChangePassword', body, { headers: header, observe: 'body', responseType: 'json' })
            .pipe(map((function (res) { return true; })));
    };
    UserPanelService.prototype.deleteAccount = function (value) {
        var header = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.userService.getAuthorizationToken() });
        var body = JSON.stringify(value);
        return this.http.post(this.baseUrl + '/DeleteUser', body, { headers: header, observe: 'body', responseType: 'json' })
            .pipe(map((function (res) { return true; })));
    };
    UserPanelService.prototype.sendChangeEmailLink = function (value) {
        var header = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.userService.getAuthorizationToken() });
        var body = JSON.stringify(value);
        return this.http.post(this.baseUrl + '/GenerateChangeEmailToken', body, { headers: header, observe: 'body', responseType: 'json' })
            .pipe(map((function (res) { return true; })));
    };
    UserPanelService.prototype.changeEmail = function (value) {
        var header = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.userService.getAuthorizationToken() });
        var body = JSON.stringify(value);
        return this.http.post(this.baseUrl + '/ReplaceEmail', body, { headers: header, observe: 'body', responseType: 'json' })
            .pipe(map((function (res) { return true; })));
    };
    UserPanelService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [UserService, HttpClient, ConfigService])
    ], UserPanelService);
    return UserPanelService;
}(BaseService));
export { UserPanelService };
//# sourceMappingURL=user-panel.service.js.map