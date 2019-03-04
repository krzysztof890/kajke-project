var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
var SurveyWasCompletedComponent = /** @class */ (function () {
    function SurveyWasCompletedComponent(route, router) {
        this.route = route;
        this.router = router;
    }
    SurveyWasCompletedComponent.prototype.ngOnInit = function () {
        var _this = this;
        // pobranie zmiennej z sciezki
        this.route.queryParams.subscribe(function (params) { return _this.link = params.link; });
    };
    SurveyWasCompletedComponent.prototype.fillSurveyAgain = function () {
        this.router.navigate(['/survey'], { queryParams: { link: this.link } });
    };
    SurveyWasCompletedComponent = __decorate([
        Component({
            selector: 'app-survey-was-completed',
            templateUrl: './survey-was-completed.component.html',
            styleUrls: ['./survey-was-completed.component.css']
        }),
        __metadata("design:paramtypes", [ActivatedRoute, Router])
    ], SurveyWasCompletedComponent);
    return SurveyWasCompletedComponent;
}());
export { SurveyWasCompletedComponent };
//# sourceMappingURL=survey-was-completed.component.js.map