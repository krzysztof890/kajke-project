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
/**
 * Przchwytuje ządania http i obsługuje statusy błedow
 */
var ErrorInterceptor = /** @class */ (function () {
    function ErrorInterceptor(route) {
        this.route = route;
    }
    ErrorInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        return next.handle(req).do(function (event) { }, function (err) {
            if (err instanceof HttpErrorResponse) {
                switch (err.status) {
                    case 0: {
                        _this.navigateToErrorPage('Daj jakas waidomosc ze padl serwer lub nie ma neta na zas');
                        break;
                    }
                }
            }
        });
    };
    ErrorInterceptor.prototype.navigateToErrorPage = function (errorMessage) {
        this.route.navigate(['error'], { queryParams: { errorMessage: errorMessage } });
    };
    ErrorInterceptor = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Router])
    ], ErrorInterceptor);
    return ErrorInterceptor;
}());
export { ErrorInterceptor };
//# sourceMappingURL=error-interceptor.js.map