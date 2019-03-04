var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AnswerProvided } from './../../shared/Models/answer-provided';
import { ValidationsOptions } from './../../shared/validators/validations-options';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../shared/utilities/config.service';
import { UserService } from '../../shared/services/user.service';
import { AnswerType } from '../../shared/Models/answer-type.enum';
import { SurveyService } from '../../shared/services/survey.service';
var NewFillSurveyComponent = /** @class */ (function () {
    function NewFillSurveyComponent(route, router, formBuilder, surveyService, configService, http, userService) {
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
        this.surveyService = surveyService;
        this.configService = configService;
        this.http = http;
        this.userService = userService;
        this.answerTypes = AnswerType;
        this.subscriptions = new Array();
        this.maxLengthOfTheAnswer = ValidationsOptions.MaxLengthOfTheAnswer;
    }
    Object.defineProperty(NewFillSurveyComponent.prototype, "Questions", {
        get: function () {
            return this.fillSurveyForm.get('Questions');
        },
        enumerable: true,
        configurable: true
    });
    NewFillSurveyComponent.prototype.ngOnInit = function () {
        var _this = this;
        // pobranie zmiennej z sciezki
        this.subscriptions.push(this.route.queryParams.subscribe(function (params) { return _this.link = params.link; }));
        // pobranie ankiety
        this.subscriptions.push(this.surveyService.getSurvey(this.link).pipe(catchError(this.surveyService.handleErrors))
            .subscribe(function (res) {
            _this.survey = res;
            _this.initializeSurvey();
        }, function (error) {
            _this.error = error;
        }));
    };
    NewFillSurveyComponent.prototype.initializeSurvey = function () {
        var _this = this;
        this.fillSurveyForm = this.formBuilder.group({
            Questions: this.formBuilder.array([])
        });
        this.survey.Questions.forEach(function (question) {
            var item = _this.formBuilder.group({
                QuestionNumber: question.QuestionNumber,
                AnswerType: question.AnswerType.valueOf()
            });
            switch (question.AnswerType) {
                case AnswerType.Jednokrotny:
                    item.setControl('AnswerNumber', _this.formBuilder.control(''));
                    if (!question.IsOptional) {
                        item.get('AnswerNumber').setValidators(Validators.required);
                    }
                    break;
                case AnswerType.Wielokrotny:
                    var controls_1 = [];
                    question.Answers.forEach(function (answer) {
                        controls_1.push(_this.formBuilder.control(false));
                    });
                    item.setControl('CheckBoxes', _this.formBuilder.array(controls_1));
                    if (!question.IsOptional) {
                        item.get('CheckBoxes').setValidators(_this.validCheckBoxes);
                    }
                    break;
                case AnswerType.Tekstowy:
                    item.setControl('AnswerResult', _this.formBuilder.control(''));
                    if (!question.IsOptional) {
                        item.get('AnswerResult').setValidators(Validators.required);
                    }
                    break;
            }
            _this.Questions.push(item);
        });
    };
    NewFillSurveyComponent.prototype.onSubmit = function (value) {
        var _this = this;
        var answersProvided = [];
        value.Questions.forEach(function (element) {
            switch (element.AnswerType) {
                case AnswerType.Jednokrotny:
                    if (element.AnswerNumber > 0) {
                        answersProvided.push(element);
                    }
                    break;
                case AnswerType.Wielokrotny:
                    for (var i = 0; i < element.CheckBoxes.length; i++) {
                        if (element.CheckBoxes[i]) {
                            answersProvided.push(new AnswerProvided({
                                AnswerNumber: i + 1,
                                AnswerType: AnswerType.Wielokrotny,
                                QuestionNumber: element.QuestionNumber,
                            }));
                        }
                    }
                    break;
                case AnswerType.Tekstowy:
                    if (element.AnswerResult.trim().length > 0) {
                        answersProvided.push(element);
                    }
                    break;
            }
        });
        this.isRequesting = true;
        this.subscriptions.push(this.fillSurvey(this.link, JSON.stringify({ AnswersProvided: answersProvided }))
            .pipe(catchError(this.surveyService.handleErrors), finalize(function () { return _this.isRequesting = false; }))
            .subscribe(function (res) { return _this.router.navigate(['/completed'], { queryParams: { link: _this.link } }); }, function (error) { return alert(error); }));
    };
    NewFillSurveyComponent.prototype.fillSurvey = function (link, body) {
        // ustawienie nagłowka, token jest wymaganu do autoryzacji
        var header = new HttpHeaders({
            'Content-Type': 'application/json', 'Authorization': this.userService.getAuthorizationToken(),
            'link': link
        });
        return this.http.post(this.configService.getApiURI() + '/Survey/FillSurvey', body, { headers: header, observe: 'body', responseType: 'json' });
    };
    NewFillSurveyComponent.prototype.getCheckboxes = function (index) {
        return this.Questions.at(index).get('CheckBoxes');
    };
    NewFillSurveyComponent.prototype.validCheckBoxes = function (checkBoxes) {
        var result = false;
        checkBoxes.value.forEach(function (element) {
            if (element) {
                result = true;
                return;
            }
        });
        return result ? null : { required: true };
    };
    NewFillSurveyComponent = __decorate([
        Component({
            selector: 'app-new-fill-survey',
            templateUrl: './new-fill-survey.component.html',
            styleUrls: ['./new-fill-survey.component.css']
        }),
        __metadata("design:paramtypes", [ActivatedRoute, Router, FormBuilder, SurveyService,
            ConfigService, HttpClient, UserService])
    ], NewFillSurveyComponent);
    return NewFillSurveyComponent;
}());
export { NewFillSurveyComponent };
//# sourceMappingURL=new-fill-survey.component.js.map