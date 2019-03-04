var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ValidatorMessages } from './../../shared/validators/validator-messages';
import { AnswerProvided } from './../../shared/Models/answer-provided';
import { Component, Input } from '@angular/core';
import { Question } from '../../shared/Models/question';
import { ManageFillingService } from '../../external-module/manage-filling.service';
/**
 * Komponent ktory słuzy do udzielania odpwiedzi na pytania ktore moga wymagac udzielenia kilku odpowiedzi.
 */
var MultipleAnswersComponent = /** @class */ (function () {
    function MultipleAnswersComponent(manageFillingService) {
        this.manageFillingService = manageFillingService;
        this.checkBoxes = [];
    }
    MultipleAnswersComponent.prototype.ngOnInit = function () {
        var _this = this;
        // zainicjowanie wartosci tablicy ktora posluzy to powiaza jej wartosci z polami chech box
        this.question.Answers.forEach(function (item) { return _this.checkBoxes.push(false); });
        // zakomunikuj ze subkrybujesz completeTheSurveyObservable
        this.manageFillingService.onSubscribing();
        this.sub = this.manageFillingService.completeTheSurveyObservable.
            subscribe(function () {
            _this.error = '';
            if (_this.validate()) {
                for (var i = 0; i < _this.checkBoxes.length; i++) {
                    if (_this.checkBoxes[i] === true) {
                        _this.manageFillingService.answersProvided.push(new AnswerProvided({
                            AnswerNumber: i + 1,
                            AnswerResult: '',
                            AnswerType: _this.question.AnswerType,
                            QuestionNumber: _this.question.QuestionNumber
                        }));
                    }
                }
            }
            _this.manageFillingService.onCompleting();
        });
    };
    MultipleAnswersComponent.prototype.ngOnDestroy = function () {
        // zakomumikuj ze pozbywasz sie subskrypcji completeTheSurveyObservable /// zastanow sie nad kwestia kolejnosci
        this.manageFillingService.onUnsubscribing();
        this.sub.unsubscribe();
    };
    MultipleAnswersComponent.prototype.validate = function () {
        var foo;
        this.checkBoxes.forEach(function (item) {
            if (item) {
                foo = true;
            }
        });
        if (!foo && !this.question.IsOptional) {
            this.error = ValidatorMessages.RequiredField;
            this.manageFillingService.hasErrors = true;
            return false;
        }
        else {
            return true;
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Question)
    ], MultipleAnswersComponent.prototype, "question", void 0);
    MultipleAnswersComponent = __decorate([
        Component({
            selector: 'app-multiple-answers',
            templateUrl: './multiple-answers.component.html',
            styleUrls: ['./multiple-answers.component.css']
        }),
        __metadata("design:paramtypes", [ManageFillingService])
    ], MultipleAnswersComponent);
    return MultipleAnswersComponent;
}());
export { MultipleAnswersComponent };
//# sourceMappingURL=multiple-answers.component.js.map