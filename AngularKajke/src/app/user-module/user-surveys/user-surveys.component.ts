import { Subscription } from 'rxjs/internal/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SurveyService } from '../../shared/services/survey.service';
import { MethodHandler } from '../../shared/classes/method-handler';

@Component({
  selector: 'app-user-surveys',
  templateUrl: './user-surveys.component.html',
  styleUrls: ['./user-surveys.component.css']
})
export class UserSurveysComponent implements OnInit, OnDestroy {
  surveys: Array<{ name: string, link: string }>;
  isDownloading: boolean;
  subs: Array<Subscription> = new Array<Subscription>();
  closeHandler: MethodHandler;

  constructor(private surveyService: SurveyService) {
    this.subs.push(surveyService.isRequestingObservable.subscribe(isDownloading => this.isDownloading = isDownloading));
    // pobierz ankiety uzytkownika
    this.subs.push(this.surveyService.getUserSurveys()
      .subscribe(res => this.surveys = res));
    this.closeHandler = new MethodHandler(this, ['remowe']);
  }

  ngOnInit() {
  }

  /**
   * Usuwa wybrany element z tablicy surveys
   * @param obj element do usuniecia
   */
  remowe(obj: any) {
    const index = this.surveys.indexOf(obj);
    if (index !== -1) {
      this.surveys.splice(index, 1);
    }
  }
  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
