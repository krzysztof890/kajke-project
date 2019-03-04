var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { SurveyService } from './../../survey-manager-module/survey.service';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { finalize, catchError } from 'rxjs/operators';
import { AnswerType } from '../../shared/Models/answer-type.enum';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
var GenerateSurveyReportComponent = /** @class */ (function () {
    function GenerateSurveyReportComponent(route, surveyService) {
        this.route = route;
        this.surveyService = surveyService;
        this.subs = [];
        this.questionToReport = [];
    }
    GenerateSurveyReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isRequesting = true;
        // pobranie zmiennej z sciezki
        this.subs.push(this.route.queryParams.subscribe(function (params) { return _this.link = params.link; }));
        // pobranie ankiety
        this.subs.push(this.surveyService.getSurvey(this.link)
            .pipe(catchError(this.surveyService.handleErrors), finalize(function () { return _this.onCompleting(); }))
            .subscribe(function (res) {
            _this.survey = res;
        }, function (error) {
            _this.error += error;
            _this.isRequesting = false;
        }));
        // pobranie wynikow ankiety
        this.subs.push(this.surveyService.getSurveyResults(this.link)
            .pipe(catchError(this.surveyService.handleErrors), finalize(function () { return _this.onCompleting(); }))
            .subscribe(function (res) {
            _this.result = res;
        }, function (error) {
            _this.error += error;
            _this.isRequesting = false;
        }));
    };
    GenerateSurveyReportComponent.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
    };
    /**
     * Sprawdza czy dane zostały juz pobrane
     */
    GenerateSurveyReportComponent.prototype.onCompleting = function () {
        if (this.survey !== undefined && this.result !== undefined) {
            this.isRequesting = false;
        }
    };
    GenerateSurveyReportComponent.prototype.onCheckboxChange = function (value) {
        var index = this.questionToReport.lastIndexOf(value);
        if (index === -1) {
            this.questionToReport.push(value);
        }
        else {
            this.questionToReport.splice(index, 1);
        }
    };
    GenerateSurveyReportComponent.prototype.geTotalQuestionScore = function (question) {
        var results = this.result.results.filter(function (score) { return score.questionNumber === question.QuestionNumber; });
        var totalScore = 0;
        if (question.AnswerType == AnswerType.Tekstowy) {
            totalScore = results[0].answerResults.length;
        }
        else {
            results.forEach(function (result) { return totalScore += result.answerCounter; });
        }
        return totalScore;
    };
    GenerateSurveyReportComponent.prototype.getScore = function (questionNumber, aswerNumber) {
        var result = this.result.results.filter(function (score) { return score.questionNumber === questionNumber
            && score.answerNumber === aswerNumber; })[0];
        if (result !== undefined) {
            return result.answerCounter;
        }
        else {
            return 0;
        }
    };
    GenerateSurveyReportComponent.prototype.getAnswers = function (questionNumber) {
        var result = this.result.results.filter(function (score) { return score.questionNumber === questionNumber; })[0];
        return result.answerResults;
    };
    GenerateSurveyReportComponent.prototype.generateReport = function () {
        var _this = this;
        var pdfContent = [];
        // header
        pdfContent.push({ text: 'Raport dla Ankiety:', style: ['header', 'center'] });
        pdfContent.push({ text: this.survey.Name, style: ['header', 'center'] });
        // body, przeiteruj pytania ktore maja trafic do raportu
        this.questionToReport.forEach(function (question) {
            // nagłowek sekcji kazdego pytania
            pdfContent.push({ text: question.Query, style: ['query'] });
            pdfContent.push({ text: 'W na pytanie udzielono łącznie ' + _this.geTotalQuestionScore(question) + ' odpowiedzi.',
                style: ['queryCount'] });
            // ciało sekcji
            if (question.AnswerType != AnswerType.Tekstowy) { // przeiteruj wszystkie odpowiedzi
                for (var i = 0; i < question.Answers.length; i++) {
                    pdfContent.push({ text: question.Answers[i], margin: [10, 0, 0, 10] }); // dodaj tresc odpowiedzi
                    pdfContent.push({ text: ' Udzielono ' + _this.getScore(question.QuestionNumber, i + 1) + ' odpowiedzi.',
                        style: ['body'] });
                }
            }
            else {
                _this.getAnswers(question.QuestionNumber).forEach(function (answer) {
                    pdfContent.push({ text: answer, style: ['body'] }); // dodaj tresc udzielonej odpowiedzi na pytanie
                });
            }
        });
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        var pdf = {
            content: pdfContent,
            styles: {
                center: {
                    alignment: 'center'
                },
                header: {
                    fontSize: 17,
                    bold: true,
                    margin: [0, 5, 0, 20]
                },
                query: {
                    fontSize: 14,
                    bold: true,
                    margin: [0, 20, 0, 15]
                },
                queryCount: {
                    fontSize: 12,
                    bold: true,
                    margin: [0, 20, 0, 20]
                },
                body: {
                    fontSize: 11,
                    margin: [10, 0, 0, 10]
                }
            }
        };
        pdfMake.createPdf(pdf).download('raport.pdf');
    };
    __decorate([
        ViewChild('content'),
        __metadata("design:type", ElementRef)
    ], GenerateSurveyReportComponent.prototype, "content", void 0);
    GenerateSurveyReportComponent = __decorate([
        Component({
            selector: 'app-generate-survey-report',
            templateUrl: './generate-survey-report.component.html',
            styleUrls: ['./generate-survey-report.component.css']
        }),
        __metadata("design:paramtypes", [ActivatedRoute, SurveyService])
    ], GenerateSurveyReportComponent);
    return GenerateSurveyReportComponent;
}());
export { GenerateSurveyReportComponent };
//# sourceMappingURL=generate-survey-report.component.js.map