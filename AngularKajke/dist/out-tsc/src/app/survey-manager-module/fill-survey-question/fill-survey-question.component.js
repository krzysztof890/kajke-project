var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Question } from './../../shared/Models/question';
import { Component, Input } from '@angular/core';
/**
 * Komponent ten to wiersz pyatania ankiety na ktory ma zostac udzielona odpowiedz.
 * Zaleznie od typu pytania inny komponent do udzielenia odpwiedzi zostanie użyty
 */
var FillSurveyQuestionComponent = /** @class */ (function () {
    function FillSurveyQuestionComponent() {
    }
    FillSurveyQuestionComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", Question)
    ], FillSurveyQuestionComponent.prototype, "question", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], FillSurveyQuestionComponent.prototype, "answersProvided", void 0);
    FillSurveyQuestionComponent = __decorate([
        Component({
            selector: 'app-fill-survey-question',
            templateUrl: './fill-survey-question.component.html',
            styleUrls: ['./fill-survey-question.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], FillSurveyQuestionComponent);
    return FillSurveyQuestionComponent;
}());
export { FillSurveyQuestionComponent };
//# sourceMappingURL=fill-survey-question.component.js.map