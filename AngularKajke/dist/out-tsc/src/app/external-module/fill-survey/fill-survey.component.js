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
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/internal/operators/finalize';
import { SurveyService } from './../../survey-manager-module/survey.service';
import { ManageFillingService } from './../manage-filling.service';
import { catchError } from 'rxjs/operators';
/**
 * Głowny komponent odpowiedzalny za wypełniane ankiety.
 */
var FillSurveyComponent = /** @class */ (function () {
    function FillSurveyComponent(route, surveyService, manageFillingService, router) {
        this.route = route;
        this.surveyService = surveyService;
        this.manageFillingService = manageFillingService;
        this.router = router;
        this.subscriptions = new Array();
        this.occurredError = false;
        this.manageFillingService.resetService();
    }
    FillSurveyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.push(this.surveyService.isRequestingObservable
            .subscribe(function (isRequesting) { return _this.isRequesting = isRequesting; }));
        // pobranie zmiennej z sciezki
        this.subscriptions.push(this.route.queryParams.subscribe(function (params) { return _this.link = params.link; }));
        // pobranie ankiety
        this.subscriptions.push(this.surveyService.getSurvey(this.link).pipe(catchError(this.surveyService.handleErrors))
            .subscribe(function (res) {
            _this.survey = res;
        }, function (error) {
            _this.occurredError = true;
            _this.error = error;
        }));
        // zakoncz wysyłanie odpwoiedzi ankiety
        this.subscriptions.push(this.manageFillingService.canFinishSurveyObservable.subscribe(function () {
            // jesli nie ma błedow
            if (!_this.manageFillingService.hasErrors) {
                var json = JSON.stringify({ AnswersProvided: _this.manageFillingService.answersProvided });
                _this.subscriptions.push(_this.manageFillingService.fillSurvey(_this.link, json).pipe(finalize(function () { _this.isRequesting = false; }), catchError(_this.manageFillingService.handleErrors)).subscribe(function (response) {
                    _this.router.navigate(['/completed'], { queryParams: { link: _this.link } });
                }, function (error) {
                    _this.manageFillingService.answersProvided = [];
                    alert(error);
                }));
            }
            else {
                // jesli wystapiły błedy z walidacji wezeruj stan by można było bez przeskod poprawic odpowiedzi
                _this.manageFillingService.hasErrors = false;
                _this.manageFillingService.answersProvided = [];
                alert(' Nie udało sie wysłać ankiety. Sprawdz swoje odpowiedzi. ');
            }
        }));
    };
    FillSurveyComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    FillSurveyComponent.prototype.fillSurvey = function () {
        this.manageFillingService.completeTheSurvey();
    };
    FillSurveyComponent = __decorate([
        Component({
            selector: 'app-fill-survey',
            templateUrl: './fill-survey.component.html',
            styleUrls: ['./fill-survey.component.css']
        }),
        __metadata("design:paramtypes", [ActivatedRoute, SurveyService, ManageFillingService,
            Router])
    ], FillSurveyComponent);
    return FillSurveyComponent;
}());
export { FillSurveyComponent };
//# sourceMappingURL=fill-survey.component.js.map