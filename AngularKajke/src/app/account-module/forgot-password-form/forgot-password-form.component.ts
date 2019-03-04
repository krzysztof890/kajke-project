import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { finalize } from 'rxjs/internal/operators/finalize';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.css']
})

// Komponent ten odpowiada za wysłanie adresu Url na email potrzebnego do zresetowania hasła użytkownika
export class ForgotpasswordFormComponent implements OnDestroy, OnInit {
  errors: string;
  isRequesting: boolean;
  sub: Subscription;
  passwordForm: FormGroup;
  isSent = false;
  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  get email() { return this.passwordForm.get('email'); }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  /**
   * Wyslil link potwierdzjacy
   */
  sendLink() {
    this.isRequesting = true;
    this.errors = '';
    this.sub = this.userService.forgotPassword(this.email.value).pipe(
      finalize(() => this.isRequesting = false),
      catchError(this.userService.handleErrors))
      .subscribe(
        res => {
          this.isSent = true;
        },
        errors => {
          this.errors = errors;
        });
  }

  ngOnDestroy(): void {
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }
}
