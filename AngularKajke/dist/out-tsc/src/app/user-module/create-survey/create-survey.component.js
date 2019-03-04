var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { finalize } from 'rxjs/internal/operators/finalize';
import { UserService } from './../../shared/services/user.service';
import { Component, ViewChild, ViewContainerRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AnswerType } from '../../shared/Models/answer-type.enum';
import { ComponentLoaderService } from '../../shared/services/component-loader.service';
import { SurveyCreateQuestionComponent } from '../../survey-manager-module/survey-create-question/survey-create-question.component';
import { Question } from './../../shared/Models/question';
import { Survey } from './../../shared/Models/survey';
import { SurveyService } from './../../survey-manager-module/survey.service';
import { catchError } from 'rxjs/operators';
var CreateSurveyComponent = /** @class */ (function () {
    function CreateSurveyComponent(componentLoader, surveyService, router, userService) {
        this.componentLoader = componentLoader;
        this.surveyService = surveyService;
        this.router = router;
        this.userService = userService;
        this.subs = [];
        var sub = this.userService.IsAuthorized().pipe(finalize(function () { return sub.unsubscribe(); })).subscribe();
        this.surveyWasEdited = false;
    }
    CreateSurveyComponent.prototype.ngOnInit = function () {
        var _this = this;
        // zmiana struktury ankiety
        this.subs.push(this.surveyService.surveyWasEditedObservable.subscribe(function () { return _this.surveyWasEdited = true; }));
        // czy jest odpytywanie api
        this.subs.push(this.surveyService.isRequestingObservable.subscribe(function (isRequesting) { return _this.isRequesting = isRequesting; }));
        this.componentLoader.setRootViewContainerRef(this.viewContainerRef);
        if (this.survey === undefined) {
            // inicjalizacja pol ankiety jesli tworzymy nowa ankiete
            this.survey = new Survey({
                Questions: [],
            });
            this.addQuestion();
            // jesli instenieje potrzeba inicjaziacji pola survey to znaczy ze tworzy sie nowa ankieta
            this.editingMode = false;
        }
        else { // generuje widok dla istniejacych juz pytan // nie uzywac addQuestion bo bedzie imba
            this.survey.Questions.forEach(function (question) {
                var component = _this.componentLoader
                    .addChild(SurveyCreateQuestionComponent, (_a = {}, _a['question'] = question, _a));
                _this.subs.push(component.instance.remoweThisQuestion.subscribe(function (event) { return _this.remoweQuestionAt(event); }));
                var _a;
            }); // jesli pole survey jest juz zainicjolaziwane to znaczy ze edytujemy istiejaca ankiete
            this.editingMode = true;
        }
    };
    CreateSurveyComponent.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (item) { return item.unsubscribe(); });
    };
    /**
     * Dodaje nowe pytanie do ankiety
     */
    CreateSurveyComponent.prototype.addQuestion = function () {
        var _this = this;
        var lastQuestionIndex = this.survey.Questions.length - 1;
        // dodaj jesli nie ma zadnego pytania, ostatnie pytanie nie jest puste i ostatnia odpowiedz nie jest pusta
        if ((this.survey.Questions.length === 0
            || this.survey.Questions.last().Query.trim().length !== 0) // jesli nie jest pustym stringem
            && this.hasAnswer(lastQuestionIndex)) {
            var question = new Question({
                QuestionNumber: this.survey.Questions.length + 1
            });
            var component = this.componentLoader
                .addChild(SurveyCreateQuestionComponent, (_a = {}, _a['question'] = question, _a));
            this.subs.push(component.instance.remoweThisQuestion.subscribe(function (event) { return _this.remoweQuestionAt(event); }));
            this.survey.Questions.push(question);
        }
        if (this.survey.Questions.length > 0) {
            this.surveyService.onSurveyStructureChange();
        }
        var _a;
    };
    /**
     * Sprawdz czy ostatnie pole odpowiedzi nie jest puste
     */
    CreateSurveyComponent.prototype.hasAnswer = function (lastQuestionIndex) {
        // jesli nie zdefiniowano pytania to znaczy ze dopiero zostanie ono dodane wiec mozna doac pytanie
        if (this.survey.Questions.last() === undefined) {
            return true; // jesli typ pytania to tekstowy tez mozna dodac kolejne pytanie
        }
        else if (this.survey.Questions.last().AnswerType.toString() === AnswerType.Tekstowy.toString()) {
            return true; // jesli pytanie nie jest pustym stringem mozna dodac
        }
        else if (this.survey.Questions.last().
            Answers[this.survey.Questions.last().Answers.length - 1].trim().length !== 0) {
            return true;
        }
        else { // w przeciwnym razie nie mozna dodac
            return false;
        }
    };
    /**
     * Usuwa ostatnie pytanie ankiety jesli nie jest to jedyne pytanie ankiety
     */
    CreateSurveyComponent.prototype.remoweQuestion = function () {
        if (this.viewContainerRef.length > 1) {
            this.componentLoader.removeLastChild();
            // usun ostatnie pytanie z kolekcji pytan
            this.survey.Questions.pop();
            this.surveyService.onSurveyStructureChange();
        }
    };
    /**
     * Usun konkretne pytanie
     */
    CreateSurveyComponent.prototype.remoweQuestionAt = function (question) {
        // jesli nie jest to ostatnie pytanie
        if (this.viewContainerRef.length > 1) {
            var index_1 = this.survey.Questions.indexOf(question);
            this.componentLoader.removeChildAt(index_1);
            this.survey.Questions.splice(index_1, 1);
            // update numeracji pytań
            this.survey.Questions.forEach(function (item) {
                if (item.QuestionNumber > index_1 + 1) {
                    item.QuestionNumber--;
                }
            });
            this.surveyService.onSurveyStructureChange();
        }
    };
    /**
     * Utworz ankiete
     */
    CreateSurveyComponent.prototype.createSurvey = function () {
        var _this = this;
        this.clearSurveyErrors();
        // walidacja danych ankiety
        var isValid = this.surveyService.validateSurvey(this.survey);
        if (isValid) { // jesli model poprawny wyslil dane do api
            this.surveyService.createSurvey(this.survey.toJSON()).pipe(catchError(this.userService.handleErrors)).subscribe(function (res) {
                if (res) { // kiedy udalo sie utworzyc ankiete
                    alert('Twoja ankieta została utworzona!');
                    _this.router.navigate(['/user/surveys']);
                }
            }, function (error) {
                alert(error);
            });
        }
    };
    CreateSurveyComponent.prototype.editSurvey = function () {
        var _this = this;
        this.clearSurveyErrors();
        // walidacja danych ankiety
        if (this.surveyWasEdited) {
            if (confirm('Zmiana struktury ankiety spowoduje utrate dotykczas zebranych danych. Jesteś tego pewien?')) {
            }
            else {
                return;
            }
        }
        var isValid = this.surveyService.validateSurvey(this.survey);
        if (isValid) { // jesli model poprawny wyslil dane do api
            this.surveyService.editSurvey(this.link, this.survey.toJSON(), this.surveyWasEdited)
                .pipe(catchError(this.userService.handleErrors)).subscribe(function (res) {
                if (res) { // kiedy udalo sie edytować ankiete
                    alert('Twoja ankieta została edytowana!');
                    _this.router.navigate(['/user/surveys']);
                }
            }, function (error) {
                alert(error);
            });
        }
    };
    // Wyczysc stare błedy ankiety
    CreateSurveyComponent.prototype.clearSurveyErrors = function () {
        this.survey.HeaderErrors = '';
        this.survey.Questions.forEach(function (question) {
            question.QuestionErrors = '';
        });
    };
    __decorate([
        ViewChild('surveyQuestions', {
            read: ViewContainerRef
        }),
        __metadata("design:type", ViewContainerRef)
    ], CreateSurveyComponent.prototype, "viewContainerRef", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Survey)
    ], CreateSurveyComponent.prototype, "survey", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CreateSurveyComponent.prototype, "link", void 0);
    CreateSurveyComponent = __decorate([
        Component({
            selector: 'app-create-survey',
            templateUrl: './create-survey.component.html',
            styleUrls: ['./create-survey.component.css']
        })
        /**
         * Komponent odpowiada generowanie ankiety przy wykorzystaniu komponentow modulu Survey Manager
         */
        ,
        __metadata("design:paramtypes", [ComponentLoaderService, SurveyService, Router,
            UserService])
    ], CreateSurveyComponent);
    return CreateSurveyComponent;
}());
export { CreateSurveyComponent };
//# sourceMappingURL=create-survey.component.js.map