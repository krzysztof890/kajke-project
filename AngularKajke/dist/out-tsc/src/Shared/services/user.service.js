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
var UserService = /** @class */ (function (_super) {
  __extends(UserService, _super);
  function UserService(http, configService) {
    var _this = _super.call(this) || this;
    _this.http = http;
    _this.configService = configService;
    _this.baseUrl = '';
    // Observable navItem source
    _this._authNavStatusSource = new BehaviorSubject(false);
    // Observable navItem stream
    _this.authNavStatus$ = _this._authNavStatusSource.asObservable();
    _this.loggedIn = false;
    _this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    _this._authNavStatusSource.next(_this.loggedIn);
    _this.baseUrl = configService.getApiURI();
    return _this;
  }
  UserService.prototype.login = function (email, password) {
    var _this = this;
    var header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(this.baseUrl + '/accounts/login', JSON.stringify({ email: email, password: password }), { headers: header, observe: 'body', responseType: 'json' }).pipe(map((function (res) {
        localStorage.setItem('auth_token', res.auth_token);
        _this.loggedIn = true;
        _this._authNavStatusSource.next(true);
        return true;
      })));
  };
  UserService.prototype.logout = function () {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  };
  UserService.prototype.isLoggedIn = function () {
    return this.loggedIn;
  };
  UserService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpClient, ConfigService])
  ], UserService);
  return UserService;
}(BaseService));
export { UserService };
//# sourceMappingURL=user.service.js.map
