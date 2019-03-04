var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { SurveyService } from '../../survey-manager/survey.service';
var UserSurveysComponent = /** @class */ (function () {
    function UserSurveysComponent(surveyService) {
        var _this = this;
        this.surveyService = surveyService;
        this.subscription = surveyService.isRequestingObservable.subscribe(function (isDownloading) { return _this.isDownloading = isDownloading; });
        this.surveyService.getUserSurveys().subscribe(function (res) { return _this.surveys = res; });
    }
    UserSurveysComponent.prototype.ngOnInit = function () {
    };
    /**
     * Usuwa wybrany element z tablicy surveys
     * @param obj element do usuniecia
     */
    UserSurveysComponent.prototype.remowe = function (obj) {
        var index = this.surveys.indexOf(obj);
        if (index !== -1) {
            this.surveys.splice(index, 1);
        }
    };
    UserSurveysComponent = __decorate([
        Component({
            selector: 'app-user-surveys',
            templateUrl: './user-surveys.component.html',
            styleUrls: ['./user-surveys.component.css']
        }),
        __metadata("design:paramtypes", [SurveyService])
    ], UserSurveysComponent);
    return UserSurveysComponent;
}());
export { UserSurveysComponent };
//# sourceMappingURL=user-surveys.component.js.map