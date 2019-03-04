import { UserService } from './../../shared/services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserPanelService } from '../user-panel.service';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-confirm-email-change',
  templateUrl: './confirm-email-change.component.html',
  styleUrls: ['./confirm-email-change.component.css']
})
export class ConfirmEmailChangeComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  errors;
  value: { newEmail: string, code: string };
  isSuccessful = false;

  constructor(private userPanelService: UserPanelService, private route: ActivatedRoute, private userService: UserService) {
    console.log('weszło');
  }

  ngOnInit() {
    this.subs.push(this.route.queryParams.subscribe(params => {
      this.value = { newEmail: params.newemail, code: params.code };
    }));
    this.subs.push(this.userPanelService.changeEmail(this.value).pipe(catchError(this.userPanelService.handleErrors)).
      subscribe(
        res => {
          this.isSuccessful = true;
          this.userService.logout();
        },
        errors => this.errors = errors
      ));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
