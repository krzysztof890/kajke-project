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
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../../survey-manager-module/survey.service';
import { catchError } from 'rxjs/operators';
var EditSurveyComponent = /** @class */ (function () {
    function EditSurveyComponent(route, surveyService) {
        var _this = this;
        this.route = route;
        this.surveyService = surveyService;
        this.subs = [];
        this.subs.push(surveyService.isRequestingObservable.subscribe(function (isRequesting) { return _this.isRequesting = isRequesting; }));
    }
    EditSurveyComponent.prototype.ngOnInit = function () {
        var _this = this;
        // pobranie zmiennej z sciezki
        this.subs.push(this.route.queryParams.subscribe(function (params) { return _this.link = params.link; }));
        // pobranie ankiety
        this.subs.push(this.surveyService.getSurvey(this.link)
            .pipe(catchError(this.surveyService.handleErrors)).subscribe(function (res) {
            _this.survey = res;
        }, function (error) {
            _this.error = error;
        }));
    };
    EditSurveyComponent.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
    };
    EditSurveyComponent = __decorate([
        Component({
            selector: 'app-edit-survey',
            templateUrl: './edit-survey.component.html',
            styleUrls: ['./edit-survey.component.css']
        }),
        __metadata("design:paramtypes", [ActivatedRoute, SurveyService])
    ], EditSurveyComponent);
    return EditSurveyComponent;
}());
export { EditSurveyComponent };
//# sourceMappingURL=edit-survey.component.js.map