var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/do';
import { UserService } from '../services/user.service';
/**
 * Przchwytuje ządania http i sprawdza czy zostały poprawnie autoryzowane na serwerze api
 */
var AuthorizationInterceptor = /** @class */ (function () {
    function AuthorizationInterceptor(userService, route) {
        this.userService = userService;
        this.route = route;
    }
    AuthorizationInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        return next.handle(req).do(function (event) { }, function (err) {
            // jesli żądanie nie zostało autoryzowane wyloguj uzytkownika( wiekoszosci przypadkow token wygasł a jesli użytkownik
            // probuje cos obejśc jego problem ze go wylogowało) i przekieruj na strone logowania
            if (err instanceof HttpErrorResponse && err.status === 401) {
                console.log('Nie autoryzowany dostęp. Nastapi przekierowanie na strone logowania');
                _this.userService.logout();
                _this.route.navigate(['login']);
            }
        });
    };
    AuthorizationInterceptor = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [UserService, Router])
    ], AuthorizationInterceptor);
    return AuthorizationInterceptor;
}());
export { AuthorizationInterceptor };
//# sourceMappingURL=authorization-interceptor.js.map