import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Survey } from '../../shared/Models/survey';
import { SurveyService } from '../../shared/services/survey.service';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css']
})
export class EditSurveyComponent implements OnInit, OnDestroy {
  survey: Survey;
  isRequesting: boolean;
  link: string; // identyfikator ankiety
  subs: Array<Subscription> = [];
  error: string;

  constructor(private route: ActivatedRoute, private surveyService: SurveyService) {
    this.subs.push(surveyService.isRequestingObservable.subscribe(isRequesting => this.isRequesting = isRequesting));
  }

  ngOnInit() {
    // pobranie zmiennej z sciezki
    this.subs.push(this.route.queryParams.subscribe(params => this.link = params.link));
    // pobranie ankiety
    this.subs.push(this.surveyService.getSurvey(this.link)
      .pipe(catchError(this.surveyService.handleErrors)).subscribe(res => {
        this.survey = res as Survey;
      },
        error => {
          this.error = error;
        }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
