import { SurveyService } from './../../shared/services/survey.service';
import { ConfigService } from './../../shared/utilities/config.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { MethodHandler } from '../../shared/classes/method-handler';

@Component({
  selector: 'app-manage-survey',
  templateUrl: './manage-survey.component.html',
  styleUrls: ['./manage-survey.component.css']
})
export class ManageSurveyComponent implements OnDestroy, OnInit {
  @Input()
  data: { name: string, link: string };
  @Input() closeHandler: MethodHandler;
  isRequesting: boolean;
  subscription: Subscription;
  errorMsg: string;
  shareSurvey: string;

  constructor(private surveyService: SurveyService, private router: Router, private configService: ConfigService) {
    this.subscription = surveyService.isRequestingObservable.subscribe(isRequesting => this.isRequesting = isRequesting);
  }

  ngOnInit(): void {
    this.shareSurvey = this.configService.getApURI() + '/survey?link=' + this.data.link;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Sluzy do usuwania wybranej ankiety z serwisu
   */
  remoweSurvey(): void {
    if (confirm('Czy na pewno chcesz usunąć ankiete ?')) {
      this.surveyService.remoweSurvey(this.data.link).pipe(catchError(this.surveyService.handleErrors)).subscribe(result => {
        if (result) {
          this.onClose();
        }
      }, error => {
        this.errorMsg = error;
      });
    }
  }

  /**
   * Pozbadz sie tego komponetu
   */
  onClose(): void {
    // usun komponent
    this.closeHandler.value.remowe([this.data]);
  }

  /**
   * Edytuj wybrana ankiete
   * Przeniesie do nowego widoku
   */
  editSurvey(): void {
    this.router.navigate(['/user/edit'], { queryParams: { link: this.data.link } });
  }

  fillSurvey(): void {
    this.router.navigate(['/survey'], { queryParams: { link: this.data.link } });
  }

  showSurveyResult(): void {
    this.router.navigate(['/user/results'], { queryParams: { link: this.data.link } });
  }

  generateSurveyReport(): void {
    this.router.navigate(['/user/report'], { queryParams: { link: this.data.link } });
  }
}
