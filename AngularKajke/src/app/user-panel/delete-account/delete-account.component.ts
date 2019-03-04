import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../shared/services/user.service';
import { UserPanelService } from '../user-panel.service';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit, OnDestroy {
  isRequesting = false;
  errors: string;
  sub: Subscription;
  deleteAccountForm: FormGroup;

  get password() { return this.deleteAccountForm.get('password'); }

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private userPanelService: UserPanelService, private router: Router) { }

  ngOnInit() {
    this.deleteAccountForm = this.formBuilder.group({
      password: ['', [Validators.required]]
    });
  }

  ngOnDestroy() {
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }
  onSubmit(value: any) {
    if (confirm('Na pewno chcesz usunąć swoje konto w serwisie ?')) {
      this.isRequesting = true;
      this.sub = this.userPanelService.deleteAccount({ password: value.password }).pipe(
        catchError(this.userService.handleErrors), finalize(() => this.isRequesting = false))
        .subscribe(
          res => {
            this.userService.logout();
            this.router.navigate(['/login']);
          }, errors => this.errors = errors
        );
    }
  }
}
