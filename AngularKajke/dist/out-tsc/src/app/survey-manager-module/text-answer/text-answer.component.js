var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ManageFillingService } from './../../external-module/manage-filling.service';
import { Component, Input } from '@angular/core';
import { Question } from '../../shared/Models/question';
import { AnswerProvided } from '../../shared/Models/answer-provided';
import { ValidationsOptions } from '../../shared/validators/validations-options';
import { ValidatorMessages } from '../../shared/validators/validator-messages';
/**
 * Komponent ten odpowiada za cześć procesu wypełniania ankety w ktorym należy udzlieć odpowiedzie tekstowej
 * na okeslone pytanie
 */
var TextAnswerComponent = /** @class */ (function () {
    function TextAnswerComponent(manageFillingService) {
        this.manageFillingService = manageFillingService;
        this.maxLengthOfTheAnswer = ValidationsOptions.MaxLengthOfTheAnswer;
    }
    TextAnswerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.answerProvided = new AnswerProvided({
            AnswerNumber: 1,
            AnswerResult: '',
            QuestionNumber: this.question.QuestionNumber,
            AnswerType: this.question.AnswerType
        });
        // zakomunikuj ze subkrybujesz completeTheSurveyObservable
        this.manageFillingService.onSubscribing();
        this.sub = this.manageFillingService.completeTheSurveyObservable.
            subscribe(function () {
            _this.error = '';
            if (_this.validate()) {
                _this.manageFillingService.answersProvided.push(_this.answerProvided);
            }
            _this.manageFillingService.onCompleting();
        });
    };
    TextAnswerComponent.prototype.ngOnDestroy = function () {
        // zakomumikuj ze pozbywasz sie subskrypcji completeTheSurveyObservable
        this.manageFillingService.onUnsubscribing();
        this.sub.unsubscribe();
    };
    /**
     * Walidacja udzielonej odpowiedzi
     */
    TextAnswerComponent.prototype.validate = function () {
        if (this.answerProvided.AnswerResult.trim().length <= 0 && !this.question.IsOptional) {
            this.error = ValidatorMessages.RequiredField;
            this.manageFillingService.hasErrors = true;
            return false;
        }
        else if (this.answerProvided.AnswerResult.length > ValidationsOptions.MaxLengthOfTheAnswer) {
            this.error = ValidatorMessages.MaximumLengthEexceeded(ValidationsOptions.MaxLengthOfTheAnswer);
            this.manageFillingService.hasErrors = true;
        }
        else if (this.answerProvided.AnswerResult.trim().length <= 0 && this.question.IsOptional) { // nie wysylac pustych odpowiedzi
            return false;
        }
        else {
            return true;
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Question)
    ], TextAnswerComponent.prototype, "question", void 0);
    TextAnswerComponent = __decorate([
        Component({
            selector: 'app-text-answer',
            template: "\n  <textarea appAutoResizeTextArea charactersPerLine=\"65\" class=\"form-control\" type=\"text\"\n  [(ngModel)] ='answerProvided.AnswerResult' maxlength=\"{{maxLengthOfTheAnswer}}\"\n  placeholder='Podaj odpowiedz' rows=\"1\"></textarea>\n  <div class=\"text-danger\">{{error}}</div>\n  ",
            styles: ['textarea { resize: none; overflow: hidden; display: block;}']
        }),
        __metadata("design:paramtypes", [ManageFillingService])
    ], TextAnswerComponent);
    return TextAnswerComponent;
}());
export { TextAnswerComponent };
//# sourceMappingURL=text-answer.component.js.map