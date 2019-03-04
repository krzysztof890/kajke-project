import { SurveyResults } from './../../shared/Models/survey-results';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { SurveyService } from '../../shared/services/survey.service';
import { Survey } from './../../shared/Models/survey';

@Component({
  selector: 'app-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.css']
})
export class SurveyResultsComponent implements OnInit, OnDestroy {
  survey: Survey;
  result: SurveyResults;
  isRequesting: boolean;
  link: string; // identyfikator ankiety
  subs: Array<Subscription> = [];
  error: string;

  constructor(private route: ActivatedRoute, private surveyService: SurveyService) {
  }

  ngOnInit() {
    this.isRequesting = true;
    // pobranie zmiennej z sciezki
    this.subs.push(this.route.queryParams.subscribe(params => this.link = params.link));
    // pobranie ankiety
    this.subs.push(this.surveyService.getSurvey(this.link)
      .pipe(catchError(this.surveyService.handleErrors), finalize(() => this.onCompleting()))
      .subscribe(res => {
        this.survey = res as Survey;
      },
        error => {
          this.error += error;
          this.isRequesting = false;
        }));
    // pobranie wynikow ankiety
    this.subs.push(this.surveyService.getSurveyResults(this.link)
      .pipe(catchError(this.surveyService.handleErrors), finalize(() => this.onCompleting()))
      .subscribe(res => {
        this.result = res as SurveyResults;
      },
        error => {
          this.error += error;
          this.isRequesting = false;
        }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  /**
   * Sprawdza czy dane zostały juz pobrane
   */
  onCompleting() {
    if (this.survey !== undefined && this.result !== undefined) {
      this.isRequesting = false;
    }
  }

  getQuestionResults(questionNumber: number) {
    return this.result.results.filter(item => item.questionNumber === questionNumber);
  }
}
