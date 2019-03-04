var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
var ErrorPageComponent = /** @class */ (function () {
    function ErrorPageComponent(route) {
        this.route = route;
    }
    ErrorPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.queryParams.subscribe(function (params) { return _this.error = params.errorMessage; });
    };
    ErrorPageComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ErrorPageComponent = __decorate([
        Component({
            selector: 'app-error-page',
            templateUrl: './error-page.component.html',
            styleUrls: ['./error-page.component.css']
        }),
        __metadata("design:paramtypes", [ActivatedRoute])
    ], ErrorPageComponent);
    return ErrorPageComponent;
}());
export { ErrorPageComponent };
//# sourceMappingURL=error-page.component.js.map