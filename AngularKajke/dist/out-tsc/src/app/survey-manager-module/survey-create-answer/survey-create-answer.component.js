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
import { AnswerComponent } from './../answer/answer.component';
import { ComponentLoaderService } from './../../shared/services/component-loader.service';
import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from '../../../../node_modules/rxjs';
import { MethodHandler } from '../../shared/classes/method-handler';
var SurveyCreateAnswerComponent = /** @class */ (function () {
    function SurveyCreateAnswerComponent(componentLoaderService, surveyService) {
        this.componentLoaderService = componentLoaderService;
        this.surveyService = surveyService;
        this.subs = new Array();
        // do zdarzenia usuniecia pytania o wybranym indeksie, konieczne na nowo przypisanie indexow odpowiedzi
        this.answerRemowedAtSource = new Subject();
        this.answerRemowedAtObservable = this.answerRemowedAtSource.asObservable();
    }
    SurveyCreateAnswerComponent.prototype.ngOnInit = function () {
        var _this = this;
        // ustawia root view do ktorego dodadwane sa pola odpowiedzi
        this.componentLoaderService.setRootViewContainerRef(this.viewContainerRef);
        // jesli jest to edycja ankiety doadaj juz istniejace pytania
        if (this.answers.length > 0) {
            this.answers.forEach(function (value) {
                return _this.componentLoaderService.addChild(AnswerComponent, (_a = {},
                    _a['BindingProperty'] = _this.answers,
                    _a['value'] = value,
                    _a['handler'] = new MethodHandler(_this, ['remoweAnswerAt', 'addAnswer']),
                    _a['changeIndex'] = _this.answerRemowedAtObservable,
                    _a));
                var _a;
            });
        }
        // zasubskrybuj zdarzenie zmiany typu pytania
        this.subs.push(this.isTextAnswerObservable.subscribe(function (isTextAnswer) {
            _this.isTextAnswer = isTextAnswer;
            _this.manageAnswers(isTextAnswer);
        }));
        this.subs.push(this.surveyService.isRequestingObservable
            .subscribe(function (isRequesting) { return _this.isRequesting = isRequesting; }));
    };
    /**
     * Dodaje pola odpowiedzi input do kontenera
     */
    SurveyCreateAnswerComponent.prototype.addAnswer = function () {
        // jesli to ma byc pierwszy element lub kolejny kotero poprzednik jest nie pusty
        if (this.viewContainerRef.length === 0 || this.answers.last().trim().length !== 0) {
            // do edycji czy zmieninila sie struktura
            if (this.viewContainerRef.length > 0) {
                this.surveyService.onSurveyStructureChange();
            }
            this.componentLoaderService.addChild(AnswerComponent, (_a = {},
                _a['BindingProperty'] = this.answers,
                _a['handler'] = new MethodHandler(this, ['remoweAnswerAt ', ' addAnswer ']),
                _a['changeIndex'] = this.answerRemowedAtObservable,
                _a));
            return true;
        }
        return false;
        var _a;
    };
    /**
     * Oblusga zdazenia zmiany typu pytania
     * @param remowe Czy usunać
     */
    SurveyCreateAnswerComponent.prototype.manageAnswers = function (remowe) {
        // jesli typ pytania tekstowy usun wszystkie pola odpowiedzi
        if (remowe) {
            while (this.viewContainerRef.length > 0) {
                this.componentLoaderService.removeLastChild();
            }
            // jesli jesli typ odpowiedz nie jest juz tesktowy i nie ma zadnego pola odpowiedzi dodaj je
            // a takze nie istnieja zadne wczesniejzefiniowane odpowiedzi
        }
        else if (!remowe && this.viewContainerRef.length === 0 && this.answers.length === 0) {
            this.addAnswer();
        }
    };
    /**
     * Usun ostatnie pole odpowiedzi jesli jest wiecej niz jedno pole
     */
    SurveyCreateAnswerComponent.prototype.remoweAnswer = function () {
        if (this.viewContainerRef.length > 1) {
            this.componentLoaderService.removeLastChild();
            this.surveyService.onSurveyStructureChange();
        }
    };
    /**
     * Usun wybrane pole odpowiedzi jesli jest wiecej niz jedno pole
     */
    SurveyCreateAnswerComponent.prototype.remoweAnswerAt = function (index) {
        if (this.viewContainerRef.length > 1) {
            this.componentLoaderService.removeChildAt(index);
            this.answers.splice(index, 1);
            this.surveyService.onSurveyStructureChange();
            this.answerRemowedAtSource.next(index);
        }
    };
    SurveyCreateAnswerComponent.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
    };
    __decorate([
        Input(),
        __metadata("design:type", Observable)
    ], SurveyCreateAnswerComponent.prototype, "isTextAnswerObservable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], SurveyCreateAnswerComponent.prototype, "answers", void 0);
    __decorate([
        ViewChild('answersBlock', {
            read: ViewContainerRef
        }),
        __metadata("design:type", ViewContainerRef)
    ], SurveyCreateAnswerComponent.prototype, "viewContainerRef", void 0);
    SurveyCreateAnswerComponent = __decorate([
        Component({
            selector: 'app-survey-create-answer',
            templateUrl: './survey-create-answer.component.html',
            styleUrls: ['./survey-create-answer.component.css'],
            providers: [ComponentLoaderService]
        })
        /**
         * Komponent ktory jest skladownym elementem ankiety dostacza on mozliwosc wprowadzenia odpowiedzi ankiety
         */
        ,
        __metadata("design:paramtypes", [ComponentLoaderService, SurveyService])
    ], SurveyCreateAnswerComponent);
    return SurveyCreateAnswerComponent;
}());
export { SurveyCreateAnswerComponent };
//# sourceMappingURL=survey-create-answer.component.js.map