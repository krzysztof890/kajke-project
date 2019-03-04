import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserPanelService } from '../user-panel.service';
import { Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit, OnDestroy {
  changeEmailForm: FormGroup;
  errors: string;
  sub: Subscription;
  isRequesting = false;

  get newEmail() { return this.changeEmailForm.get('newEmail'); }

  constructor(private formBuilder: FormBuilder, private userPanelService: UserPanelService) { }

  ngOnInit() {
    this.changeEmailForm = this.formBuilder.group({
      newEmail: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnDestroy() {
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }

  onSubmit(value: any) {
    this.isRequesting = true;
    this.sub = this.userPanelService.sendChangeEmailLink({ email: value.newEmail })
      .pipe(catchError(this.userPanelService.handleErrors), finalize(() => this.isRequesting = false))
      .subscribe(
        res => {
          if (res) {
            alert('Zobacz swoja skrzynke pocztową aby dokończyć zmiane adresu email.');
          }
        },
        errors => this.errors = errors
      );
  }
}
