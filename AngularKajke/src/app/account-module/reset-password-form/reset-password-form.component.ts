import { Subscription } from 'rxjs/internal/Subscription';
import { ResetPassword } from './../../shared/Models/reset.password';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { finalize } from '../../../../node_modules/rxjs/internal/operators/finalize';
import { catchError } from '../../../../node_modules/rxjs/internal/operators/catchError';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
/**
 * Komponent odpowiada zresetowania hasła użytkownika
 */
export class ResetPasswordFormComponent implements OnDestroy {
  errors: string;
  isRequesting: boolean;
  isReseted = false;
  submitted = false;
  resetPassword: ResetPassword = { email: '', password: '', code: '' };
  subs: Array<Subscription> = new Array<Subscription>();

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    // wyciaganie kodu tokena z url (praw ten syf, poprawiony sprawdz czy działa tak dla pewnosci potem)
    // const index = this.router.url.search('code=');
    // this.resetPassword.code = this.router.url.substring(index + 5);
    this.subs.push(this.route.queryParams.subscribe(params => this.resetPassword.code = params.code));
  }

  /**
   * Wysle dane do zresetowania hasla wybranego uzytkownika
   */
  reset({ value, valid }: { value: ResetPassword, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.subs.push(this.userService.resetPassword(value.email, value.password, this.resetPassword.code)
        .pipe(
          finalize(() => this.isRequesting = false),
          catchError(this.userService.handleErrors)
        )
        .subscribe(
          result => {
            if (result) {
              this.isReseted = true;
            }
          },
          error => this.errors = error));
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
