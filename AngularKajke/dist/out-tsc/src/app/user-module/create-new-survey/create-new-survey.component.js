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
import { ValidationsOptions } from './../../shared/validators/validations-options';
import { FormBuilder, Validators } from '@angular/forms';
import { Survey } from './../../shared/Models/survey';
import { Component, Input } from '@angular/core';
import { AnswerType } from '../../shared/Models/answer-type.enum';
import { SurveyService } from '../../shared/services/survey.service';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
var CreateNewSurveyComponent = /** @class */ (function () {
    function CreateNewSurveyComponent(formBuilder, surveyService, router) {
        this.formBuilder = formBuilder;
        this.surveyService = surveyService;
        this.router = router;
        this.options = AnswerType;
        this.subs = [];
        this.isRequesting = false;
        this.editingMode = false;
        this.surveyWasEdited = false;
        this.maxLengthOfTheAnswer = ValidationsOptions.MaxLengthOfTheAnswer;
        this.surveyDescriptionMmaxLength = ValidationsOptions.SurveyDescriptionMmaxLength;
        this.surveyNameMmaxLength = ValidationsOptions.SurveyNameMmaxLength;
        this.surveyQuestionMmaxLength = ValidationsOptions.SurveyQuestionMmaxLength;
    }
    Object.defineProperty(CreateNewSurveyComponent.prototype, "Questions", {
        // getters
        get: function () {
            return this.surveyForm.get('Questions');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CreateNewSurveyComponent.prototype, "Name", {
        get: function () {
            return this.surveyForm.get('Name');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CreateNewSurveyComponent.prototype, "Description", {
        get: function () {
            return this.surveyForm.get('Description');
        },
        enumerable: true,
        configurable: true
    });
    CreateNewSurveyComponent.prototype.ngOnInit = function () {
        var _this = this;
        // jesi to jest nowa ankieta zaicjalizuj forme postawowymi wartosciami
        if (this.survey === undefined) {
            this.surveyForm = this.formBuilder.group({
                Name: ['', [Validators.required]],
                Description: ['', [Validators.required]],
                Questions: this.formBuilder.array([])
            });
            this.addQuestion();
        }
        else { // kiesy jest to edycja aniety zapelnij forme danymi
            this.editingMode = true;
            this.surveyForm = this.formBuilder.group({
                Name: [this.survey.Name, [Validators.required]],
                Description: [this.survey.Description, [Validators.required]],
                Questions: this.formBuilder.array([])
            });
            this.survey.Questions.forEach(function (item) {
                var answers = [];
                if (item.AnswerType != AnswerType.Tekstowy) {
                    item.Answers.forEach(function (answer) {
                        answers.push(_this.formBuilder.group({
                            Answer: [answer, [Validators.required]]
                        }));
                    });
                }
                var question = _this.formBuilder.group({
                    Query: [item.Query, [Validators.required]],
                    AnswerType: item.AnswerType.toString(),
                    Answers: _this.formBuilder.array(answers),
                    IsOptional: [item.IsOptional]
                });
                _this.Questions.push(question);
            });
        }
    };
    CreateNewSurveyComponent.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
    };
    /**
     * Dodaj now pytanie ankiety
     */
    CreateNewSurveyComponent.prototype.addQuestion = function () {
        this.surveyWasEdited = true;
        var question = this.formBuilder.group({
            Query: ['', [Validators.required]],
            AnswerType: AnswerType.Jednokrotny.toString(),
            Answers: this.formBuilder.array([]),
            IsOptional: [false]
        });
        this.addAnswer(question.get('Answers'));
        this.Questions.push(question);
    };
    /**
     * Usuń wybrane pytanie
     * @param index Nr pytania - 1
     */
    CreateNewSurveyComponent.prototype.remoweQuestionAt = function (index) {
        if (this.Questions.length > 1) {
            this.surveyWasEdited = true;
            this.Questions.removeAt(index);
        }
    };
    /**
     * Usuń ostatnie pytanie
     */
    CreateNewSurveyComponent.prototype.remoweQuestion = function () {
        if (this.Questions.length > 1) {
            this.surveyWasEdited = true;
            this.Questions.removeAt(this.Questions.length - 1);
        }
    };
    /**
     * Dodaj nowe pytanie na koniec bloku
     * @param answers
     */
    CreateNewSurveyComponent.prototype.addAnswer = function (answers) {
        this.surveyWasEdited = true;
        var answer = this.formBuilder.group({
            Answer: ['', [Validators.required]]
        });
        answers.push(answer);
    };
    /**
     * Pobierz kolekcje odpwoiedzi danego pytania
     * @param question Okreslone pytanie ankiety z formy
     */
    CreateNewSurveyComponent.prototype.GetAnswers = function (question) {
        return question.get('Answers');
    };
    /**
     * Usuń wybrana odpowiedz
     * @param question Okreslone pytanie ankiety z formy
     * @param index nr pytania
     */
    CreateNewSurveyComponent.prototype.deleteAnswer = function (question, index) {
        var answers = this.GetAnswers(question);
        if (answers.length > 1) {
            this.GetAnswers(question).removeAt(index);
        }
    };
    /**
     * Obsługa zdarzenia zmiany tpya pytania przez input select
     * @param question wyrane pytanei z formy
     */
    CreateNewSurveyComponent.prototype.onSelectChange = function (question) {
        this.surveyWasEdited = true;
        var answerType = question.get('AnswerType').value;
        var answers = this.GetAnswers(question);
        if (AnswerType.Tekstowy == answerType) {
            var length_1 = answers.length;
            for (var i = length_1 - 1; i >= 0; i--) {
                answers.removeAt(i);
            }
        }
        else {
            if (answers.length === 0) {
                this.addAnswer(answers);
            }
        }
    };
    CreateNewSurveyComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.editingMode && this.surveyWasEdited) {
            if (!confirm('Zmiana struktury ankiety spowoduje utrate dotykczas zebranych danych. Jesteś tego pewien?')) {
                return;
            }
        }
        var questions = [];
        var _loop_1 = function (i) {
            var tmp = new Question({
                AnswerType: this_1.surveyForm.value.Questions[i].AnswerType,
                IsOptional: this_1.surveyForm.value.Questions[i].IsOptional,
                Query: this_1.surveyForm.value.Questions[i].Query,
                QuestionNumber: i + 1,
            });
            if (tmp.AnswerType != AnswerType.Tekstowy) {
                var answers_1 = [];
                this_1.surveyForm.value.Questions[i].Answers.forEach(function (answer) {
                    answers_1.push(answer.Answer);
                });
                tmp.Answers = answers_1;
            }
            questions.push(tmp);
        };
        var this_1 = this;
        for (var i = 0; i < this.surveyForm.value.Questions.length; i++) {
            _loop_1(i);
        }
        var survey = new Survey({
            Name: this.surveyForm.value.Name,
            Description: this.surveyForm.value.Description,
            Questions: questions
        });
        this.isRequesting = true;
        if (this.editingMode) {
            this.surveyService.editSurvey(this.link, survey.toJSON(), this.surveyWasEdited)
                .pipe(catchError(this.surveyService.handleErrors), finalize(function () { return _this.isRequesting = false; })).subscribe(function (res) {
                if (res) { // kiedy udalo sie utworzyc ankiete
                    alert('Twoja ankieta została edytowana!');
                    _this.router.navigate(['/user/surveys']);
                }
            }, function (error) {
                alert(error);
            });
        }
        else {
            this.surveyService.createSurvey(survey.toJSON()).pipe(catchError(this.surveyService.handleErrors), finalize(function () { return _this.isRequesting = false; })).subscribe(function (res) {
                if (res) { // kiedy udalo sie utworzyc ankiete
                    alert('Twoja ankieta została utworzona!');
                    _this.router.navigate(['/user/surveys']);
                }
            }, function (error) {
                alert(error);
            });
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Survey)
    ], CreateNewSurveyComponent.prototype, "survey", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CreateNewSurveyComponent.prototype, "link", void 0);
    CreateNewSurveyComponent = __decorate([
        Component({
            selector: 'app-create-new-survey',
            templateUrl: './create-new-survey.component.html',
            styleUrls: ['./create-new-survey.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, SurveyService, Router])
    ], CreateNewSurveyComponent);
    return CreateNewSurveyComponent;
}());
export { CreateNewSurveyComponent };
//# sourceMappingURL=create-new-survey.component.js.map