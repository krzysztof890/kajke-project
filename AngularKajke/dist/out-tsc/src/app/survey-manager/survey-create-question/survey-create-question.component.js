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
import { AnswerType } from '../../shared/Models/answer-type.enum';
import { BehaviorSubject } from '../../../../node_modules/rxjs';
var SurveyCreateQuestionComponent = /** @class */ (function () {
    function SurveyCreateQuestionComponent() {
        this.selectedValue = AnswerType.Jednokrotny;
        this.options = AnswerType;
        // do monitorowania typy dopowiedzi
        this.isTextAnswerSource = new BehaviorSubject(false);
        this.isTextAnswer = this.isTextAnswerSource.asObservable();
        this.question = null;
    }
    SurveyCreateQuestionComponent.prototype.ngOnInit = function () {
        // inicjalizacja pol pytania jesli nie zostaly jeszcze zainicjalizowane
        if (this.question.Answers === undefined) {
            this.question.AnswerType = this.selectedValue;
            this.question.Answers = [];
            this.question.Query = '';
        }
        else { // jesli jest to edycja ankiety ustaw selectedValue na zdefiniowana wartosc
            this.selectedValue = this.question.AnswerType; // sprawdz czy electedValue nie jest tytem tekstowym jesli tak zakomunikuj to
            if (this.selectedValue.toString() === AnswerType.Tekstowy.toString()) {
                this.isTextAnswerSource.next(true);
            }
        }
        this.question.QuestionErrors = '';
    };
    /**
     * Obłoguje zdarzenie zmiany typu pytania
     */
    SurveyCreateQuestionComponent.prototype.onChange = function () {
        // sprawdzi czy typ pytania jest tekstowy
        if (this.selectedValue.toString() === AnswerType.Tekstowy.toString()) {
            this.isTextAnswerSource.next(true);
        }
        else {
            this.isTextAnswerSource.next(false);
        }
        // ukaktualnienie pola
        this.question.AnswerType = this.selectedValue;
    };
    SurveyCreateQuestionComponent = __decorate([
        Component({
            selector: 'app-survey-create-question',
            templateUrl: './survey-create-question.component.html',
            styleUrls: ['./survey-create-question.component.css']
        })
        /**
         * Komponent ktory jest skladowa ankiety, nagłowek pytania
         */
        ,
        __metadata("design:paramtypes", [])
    ], SurveyCreateQuestionComponent);
    return SurveyCreateQuestionComponent;
}());
export { SurveyCreateQuestionComponent };
//# sourceMappingURL=survey-create-question.component.js.map