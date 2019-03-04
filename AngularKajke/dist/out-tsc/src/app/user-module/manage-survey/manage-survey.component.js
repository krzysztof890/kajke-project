var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { SurveyService } from './../../shared/services/survey.service';
import { ConfigService } from './../../shared/utilities/config.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { MethodHandler } from '../../shared/classes/method-handler';
var ManageSurveyComponent = /** @class */ (function () {
    function ManageSurveyComponent(surveyService, router, configService) {
        var _this = this;
        this.surveyService = surveyService;
        this.router = router;
        this.configService = configService;
        this.subscription = surveyService.isRequestingObservable.subscribe(function (isRequesting) { return _this.isRequesting = isRequesting; });
    }
    ManageSurveyComponent.prototype.ngOnInit = function () {
        this.shareSurvey = this.configService.getApURI() + '/survey?link=' + this.data.link;
    };
    ManageSurveyComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    /**
     * Sluzy do usuwania wybranej ankiety z serwisu
     */
    ManageSurveyComponent.prototype.remoweSurvey = function () {
        var _this = this;
        if (confirm('Czy na pewno chcesz usunąć ankiete ?')) {
            this.surveyService.remoweSurvey(this.data.link).pipe(catchError(this.surveyService.handleErrors)).subscribe(function (result) {
                if (result) {
                    _this.onClose();
                }
            }, function (error) {
                _this.errorMsg = error;
            });
        }
    };
    /**
     * Pozbadz sie tego komponetu
     */
    ManageSurveyComponent.prototype.onClose = function () {
        // usun komponent
        this.closeHandler.value.remowe([this.data]);
    };
    /**
     * Edytuj wybrana ankiete
     * Przeniesie do nowego widoku
     */
    ManageSurveyComponent.prototype.editSurvey = function () {
        this.router.navigate(['/user/edit'], { queryParams: { link: this.data.link } });
    };
    ManageSurveyComponent.prototype.fillSurvey = function () {
        this.router.navigate(['/survey'], { queryParams: { link: this.data.link } });
    };
    ManageSurveyComponent.prototype.showSurveyResult = function () {
        this.router.navigate(['/user/results'], { queryParams: { link: this.data.link } });
    };
    ManageSurveyComponent.prototype.generateSurveyReport = function () {
        this.router.navigate(['/user/report'], { queryParams: { link: this.data.link } });
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ManageSurveyComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", MethodHandler)
    ], ManageSurveyComponent.prototype, "closeHandler", void 0);
    ManageSurveyComponent = __decorate([
        Component({
            selector: 'app-manage-survey',
            templateUrl: './manage-survey.component.html',
            styleUrls: ['./manage-survey.component.css']
        }),
        __metadata("design:paramtypes", [SurveyService, Router, ConfigService])
    ], ManageSurveyComponent);
    return ManageSurveyComponent;
}());
export { ManageSurveyComponent };
//# sourceMappingURL=manage-survey.component.js.map