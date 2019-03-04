import { UserPanelService } from './../user-panel.service';
import { ValidationsOptions } from './../../shared/validators/validations-options';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, ValidationErrors, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '../../shared/services/user.service';
import { catchError, finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnDestroy {
  changePasswordForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  isRequesting = false;
  errors: string;
  sub: Subscription;

  passwordMinSize = ValidationsOptions.RequiredPasswordLength;
  get newPassword() { return this.changePasswordForm.get('newPassword'); }
  get matchNewPassword() { return this.changePasswordForm.get('matchNewPassword'); }
  get oldPassword() { return this.changePasswordForm.get('oldPassword'); }

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private userPanelService: UserPanelService, private router: Router) {
    this.changePasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(this.passwordMinSize)]],
      matchNewPassword: ['', [Validators.required]],
      oldPassword: ['', [Validators.required, Validators.minLength(this.passwordMinSize)]]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.newPassword.value;
    const confirmPass = group.controls.matchNewPassword.value;

    return pass === confirmPass ? null : { mismatch: true };
  }

  onSubmit(value: any) {
    this.isRequesting = true;
    this.sub = this.userPanelService.changePassword({ currentPassword: value.oldPassword, newPassword: value.newPassword })
      .pipe(catchError(this.userService.handleErrors), finalize(() => this.isRequesting = false))
      .subscribe(
        res => {
          if (res) {
            this.userService.logout();
            this.router.navigate(['/login']);
          }
        },
        errors => this.errors = errors
      );
  }

  ngOnDestroy() {
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }
}
