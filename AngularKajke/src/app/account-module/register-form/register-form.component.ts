import { ValidationsOptions } from './../../shared/validators/validations-options';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { Credentials } from '../../shared/Models/credentials';
import { finalize } from 'rxjs/internal/operators/finalize';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
/**
 * Komponent odpowiada za rejestracje uzytkownika w serwisie
 */
export class RegisterFormComponent implements OnDestroy, OnInit {
  errors: string;
  isRequesting: boolean;
  isRegistered = false;
  sub: Subscription;
  registerForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get passwordMatch() { return this.registerForm.get('passwordMatch'); }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(ValidationsOptions.RequiredPasswordLength)]],
      passwordMatch: ['', [Validators.required]]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.passwordMatch.value;

    return pass === confirmPass ? null : { mismatch: true };
  }
  /**
   * Wyslil dane uzytkownika do rejestracji
   */
  register() {
    console.log('weszo');
    this.isRequesting = true;
    this.errors = '';
    this.sub = this.userService.register(this.email.value, this.password.value)
      .pipe(
        finalize(() => this.isRequesting = false),
        catchError(this.userService.handleErrors)
      )
      .subscribe(
        result => {
          if (result) {
            this.isRegistered = true;
          }
        },
        error => this.errors = error);
  }

  ngOnDestroy(): void {
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }
}
