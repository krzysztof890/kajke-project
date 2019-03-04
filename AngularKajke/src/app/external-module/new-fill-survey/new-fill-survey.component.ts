import { AnswerProvided } from './../../shared/Models/answer-provided';
import { ValidationsOptions } from './../../shared/validators/validations-options';
import { Survey } from './../../shared/Models/survey';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, from } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../shared/utilities/config.service';
import { UserService } from '../../shared/services/user.service';
import { AnswerType } from '../../shared/Models/answer-type.enum';
import { SurveyService } from '../../shared/services/survey.service';

@Component({
  selector: 'app-new-fill-survey',
  templateUrl: './new-fill-survey.component.html',
  styleUrls: ['./new-fill-survey.component.css']
})
export class NewFillSurveyComponent implements OnInit {
  answerTypes = AnswerType;
  fillSurveyForm: FormGroup;
  isRequesting: boolean;
  subscriptions: Array<Subscription> = new Array<Subscription>();
  link: string;
  survey: Survey;
  error: string;
  maxLengthOfTheAnswer = ValidationsOptions.MaxLengthOfTheAnswer;

  get Questions() {
    return this.fillSurveyForm.get('Questions') as FormArray;
  }

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private surveyService: SurveyService,
    private configService: ConfigService, private http: HttpClient, private userService: UserService) { }

  ngOnInit() {
    // pobranie zmiennej z sciezki
    this.subscriptions.push(this.route.queryParams.subscribe(params => this.link = params.link));
    // pobranie ankiety
    this.subscriptions.push(this.surveyService.getSurvey(this.link).pipe(catchError(this.surveyService.handleErrors))
      .subscribe(res => {
        this.survey = res as Survey;
        this.initializeSurvey();
      }, error => {
        this.error = error;
      }));
  }

  initializeSurvey() {
    this.fillSurveyForm = this.formBuilder.group({
      Questions: this.formBuilder.array([])
    });
    this.survey.Questions.forEach(question => {
      const item = this.formBuilder.group({
        QuestionNumber: question.QuestionNumber,
        AnswerType: question.AnswerType.valueOf()
      });
      switch (question.AnswerType) {
        case AnswerType.Jednokrotny:
          item.setControl('AnswerNumber', this.formBuilder.control(''));
          if (!question.IsOptional) {
            item.get('AnswerNumber').setValidators(Validators.required);
          }
          break;
        case AnswerType.Wielokrotny:
          const controls = [];
          question.Answers.forEach(answer => {
            controls.push(this.formBuilder.control(false));
          });
          item.setControl('CheckBoxes', this.formBuilder.array(controls));
          if (!question.IsOptional) {
            item.get('CheckBoxes').setValidators(this.validCheckBoxes);
          }
          break;
        case AnswerType.Tekstowy:
          item.setControl('AnswerResult', this.formBuilder.control(''));
          if (!question.IsOptional) {
            item.get('AnswerResult').setValidators(Validators.required);
          }
          break;
      }
      this.Questions.push(item);
    });
  }

  onSubmit(value: any) {
    const answersProvided = [];
    value.Questions.forEach(element => {
      switch (element.AnswerType) {
        case AnswerType.Jednokrotny:
          if (element.AnswerNumber > 0) {
            answersProvided.push(element as AnswerProvided);
          }
          break;
        case AnswerType.Wielokrotny:
          for (let i = 0; i < element.CheckBoxes.length; i++) {
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
            answersProvided.push(element as AnswerProvided);
          }
          break;
      }
    });
    this.isRequesting = true;
    this.subscriptions.push(this.fillSurvey(this.link, JSON.stringify({ AnswersProvided: answersProvided }))
      .pipe(catchError(this.surveyService.handleErrors), finalize(() => this.isRequesting = false))
      .subscribe(
        res => this.router.navigate(['/completed'], { queryParams: { link: this.link } }),
        error => alert(error)
      ));
  }

  fillSurvey(link: string, body: string): Observable<object> {
    // ustawienie nagłowka, token jest wymaganu do autoryzacji
    const header = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': this.userService.getAuthorizationToken(),
      'link': link
    });

    return this.http.post(this.configService.getApiURI() + '/Survey/FillSurvey', body,
      { headers: header, observe: 'body', responseType: 'json' });
  }

  getCheckboxes(index: number) {
    return this.Questions.at(index).get('CheckBoxes') as FormArray;
  }

  validCheckBoxes(checkBoxes: FormArray) {
    let result = false;
    checkBoxes.value.forEach(element => {
      if (element) {
        result = true;
        return;
      }
    });
    return result ? null : { required: true };
  }
}
