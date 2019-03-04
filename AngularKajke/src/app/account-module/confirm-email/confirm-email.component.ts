import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})

/**
 * Komponent słuzy do potwierdzania adresu email uzytkownika
 */
export class ConfirmEmailComponent implements OnDestroy {
  isConfirmed = false;
  sub: Subscription;
  errors;

  constructor(private userService: UserService, private router: Router) {
    // pobiera sciezkie Url w ktorej znajduje sie token do potwierdzenia adresu email
    this.sub = userService.confirmEmail(router.url).pipe(catchError(userService.handleErrors))
      .subscribe(
        res => {
          if (res) {
            this.isConfirmed = true;
          }
        },
        errors => this.errors = errors);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
