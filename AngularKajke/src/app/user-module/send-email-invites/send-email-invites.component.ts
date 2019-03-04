import { SurveyService } from './../../shared/services/survey.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-send-email-invites',
  templateUrl: './send-email-invites.component.html',
  styleUrls: ['./send-email-invites.component.css']
})
export class SendEmailInvitesComponent implements OnInit, OnDestroy {
  @Input()
  link: string;
  email: string;
  emails = [];
  validEmail = true;
  isRequesting: boolean;
  subs: Subscription[] = [];

  constructor(private surveyService: SurveyService) {
  }

  ngOnInit() {
  }

  /**
   * Dodaj email do listy
   */
  addEmail() {
    const emails = this.email.split(' ');
    emails.forEach(element => {
      // walidacja
      this.validEmail = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$').test(element);
      if (this.validEmail) {
        this.emails.push(element);
      } else {
        return;
      }
    });
    this.email = ' ';
  }

  /**
   * Usuń email z listy
   */
  remowe(number: number) {
    this.emails.splice(number, 1);
  }

  sendEmailsInvites() {
    if (this.emails.length === 0) {
      return;
    }
    this.isRequesting = true;
    this.subs.push(this.surveyService.sendEmailsInvites(this.emails, this.link)
      .pipe(catchError(this.surveyService.handleErrors), finalize(() => { this.isRequesting = false; this.emails = []; }))
      .subscribe(
        res => {
          alert('Wysłano zaproszenia do ankiety!');
        },
        error => {
          alert(error);
        }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe);
  }
}
