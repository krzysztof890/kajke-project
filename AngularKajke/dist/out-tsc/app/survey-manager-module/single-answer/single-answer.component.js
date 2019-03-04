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
import { ManageFillingService } from './../../external-module/manage-filling.service';
import { Question } from './../../shared/Models/question';
import { AnswerProvided } from './../../shared/Models/answer-provided';
import { IdsGenerator } from './../../shared/classes/ids-generator';
import { Component, Input } from '@angular/core';
var SingleAnswerComponent = /** @class */ (function () {
    function SingleAnswerComponent(manageFillingService) {
        this.manageFillingService = manageFillingService;
        this.uniqueIDs = [];
    }
    SingleAnswerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.answerProvided = new AnswerProvided({
            AnswerNumber: 0,
            AnswerResult: '',
            AnswerType: this.question.AnswerType,
            QuestionNumber: this.question.QuestionNumber
        });
        // generuj ulikalne indentyfikatory dla elmentow radio
        for (var i = 1; i <= this.question.Answers.length; i++) {
            this.uniqueIDs.push(IdsGenerator.getUniqueID());
        }
        // zakomunikuj ze subkrybujesz completeTheSurveyObservable
        this.manageFillingService.onSubscribing();
        this.sub = this.manageFillingService.completeTheSurveyObservable.
            subscribe(function () {
            _this.error = '';
            if (_this.answerProvided.AnswerNumber === 0 && !_this.question.IsOptional) {
                _this.manageFillingService.hasErrors = true;
                _this.error = ValidatorMessages.RequiredField;
            }
            else {
                _this.manageFillingService.answersProvided.push(_this.answerProvided);
            }
            _this.manageFillingService.onCompleting();
        });
    };
    SingleAnswerComponent.prototype.ngOnDestroy = function () {
        // zakomumikuj ze pozbywasz sie subskrypcji completeTheSurveyObservable /// zastanow sie nad kwestia kolejnosci
        this.manageFillingService.onUnsubscribing();
        this.sub.unsubscribe();
    };
    __decorate([
        Input(),
        __metadata("design:type", Question)
    ], SingleAnswerComponent.prototype, "question", void 0);
    SingleAnswerComponent = __decorate([
        Component({
            selector: 'app-single-answer',
            templateUrl: './single-answer.component.html',
            styleUrls: ['./single-answer.component.css']
        }),
        __metadata("design:paramtypes", [ManageFillingService])
    ], SingleAnswerComponent);
    return SingleAnswerComponent;
}());
export { SingleAnswerComponent };
//# sourceMappingURL=single-answer.component.js.map