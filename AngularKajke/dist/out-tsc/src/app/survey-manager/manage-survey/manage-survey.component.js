var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { SurveyService } from './../survey.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
var ManageSurveyComponent = /** @class */ (function () {
    function ManageSurveyComponent(surveyService, router) {
        var _this = this;
        this.surveyService = surveyService;
        this.router = router;
        this.close = new EventEmitter();
        this.subscription = surveyService.isRequestingObservable.subscribe(function (isRequesting) { return _this.isRequesting = isRequesting; });
    }
    ManageSurveyComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    /**
     * Sluzy do usuwania wybranej ankiety z serwisu
     */
    ManageSurveyComponent.prototype.remoweSurvey = function () {
        var _this = this;
        this.surveyService.remoweSurvey(this.data.link).subscribe(function (result) {
            if (result) {
                _this.onClose();
            }
        }, function (error) {
            _this.errorMsg = 'cos poszlo nie tak';
        });
    };
    /**
     * Pozbadz sie komponetu
     */
    ManageSurveyComponent.prototype.onClose = function () {
        // daj znac ze komponent ma zostac zniszczony
        this.close.emit(null);
    };
    /**
     * Edytuj wybrana ankiete
     * Przeniesie do nowego widoku
     */
    ManageSurveyComponent.prototype.editSurvey = function () {
        this.router.navigate(['/user/edit'], { queryParams: { link: this.data.link } });
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ManageSurveyComponent.prototype, "data", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ManageSurveyComponent.prototype, "close", void 0);
    ManageSurveyComponent = __decorate([
        Component({
            selector: 'app-manage-survey',
            templateUrl: './manage-survey.component.html',
            styleUrls: ['./manage-survey.component.css'],
            providers: [SurveyService]
        }),
        __metadata("design:paramtypes", [SurveyService, Router])
    ], ManageSurveyComponent);
    return ManageSurveyComponent;
}());
export { ManageSurveyComponent };
//# sourceMappingURL=manage-survey.component.js.map