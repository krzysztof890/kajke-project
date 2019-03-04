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
import { catchError, finalize } from 'rxjs/operators';
import { SurveyService } from '../../shared/services/survey.service';
var SurveyResultsComponent = /** @class */ (function () {
    function SurveyResultsComponent(route, surveyService) {
        this.route = route;
        this.surveyService = surveyService;
        this.subs = [];
    }
    SurveyResultsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isRequesting = true;
        // pobranie zmiennej z sciezki
        this.subs.push(this.route.queryParams.subscribe(function (params) { return _this.link = params.link; }));
        // pobranie ankiety
        this.subs.push(this.surveyService.getSurvey(this.link)
            .pipe(catchError(this.surveyService.handleErrors), finalize(function () { return _this.onCompleting(); }))
            .subscribe(function (res) {
            _this.survey = res;
        }, function (error) {
            _this.error += error;
            _this.isRequesting = false;
        }));
        // pobranie wynikow ankiety
        this.subs.push(this.surveyService.getSurveyResults(this.link)
            .pipe(catchError(this.surveyService.handleErrors), finalize(function () { return _this.onCompleting(); }))
            .subscribe(function (res) {
            _this.result = res;
        }, function (error) {
            _this.error += error;
            _this.isRequesting = false;
        }));
    };
    SurveyResultsComponent.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
    };
    /**
     * Sprawdza czy dane zostały juz pobrane
     */
    SurveyResultsComponent.prototype.onCompleting = function () {
        if (this.survey !== undefined && this.result !== undefined) {
            this.isRequesting = false;
        }
    };
    SurveyResultsComponent.prototype.getQuestionResults = function (questionNumber) {
        return this.result.results.filter(function (item) { return item.questionNumber === questionNumber; });
    };
    SurveyResultsComponent = __decorate([
        Component({
            selector: 'app-survey-results',
            templateUrl: './survey-results.component.html',
            styleUrls: ['./survey-results.component.css']
        }),
        __metadata("design:paramtypes", [ActivatedRoute, SurveyService])
    ], SurveyResultsComponent);
    return SurveyResultsComponent;
}());
export { SurveyResultsComponent };
//# sourceMappingURL=survey-results.component.js.map