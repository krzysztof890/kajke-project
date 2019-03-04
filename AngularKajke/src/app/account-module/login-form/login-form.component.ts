import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Credentials } from '../../shared/Models/credentials';
import { Router } from '@angular/router';
import { finalize, catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
/**
 * Komponent odpowiada logowanie uzytkownika do servisu
 */
export class LoginFormComponent implements OnDestroy {
  errors: string;
  isRequesting: boolean;
  submitted = false;
  credentials: Credentials = { email: '', password: '' };
  sub: Subscription;

  constructor(private userService: UserService, private router: Router) { }

  /**
   * Wysyła danie logowania do Api
   */
  login({ value, valid }: { value: Credentials, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.sub = this.userService.login(value.email, value.password)
        .pipe(
          finalize(() => this.isRequesting = false),
          catchError(this.userService.handleErrors)
        )
        .subscribe(
          result => {
            if (result) {
              // jesli sie udalo przekieruj na strone uzytkownika
              console.log(this.userService.getAuthorizationToken());
              this.router.navigate(['/user/home']);
            }
          },
          error => this.errors = error);
    }
  }

  ngOnDestroy(): void {
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }
}
