import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { catchError, finalize } from 'rxjs/operators';
import { UserService } from '../../shared/services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-send-confirmation-link-form',
  templateUrl: './send-confirmation-link-form.component.html',
  styleUrls: ['./send-confirmation-link-form.component.css']
})

/**
 * Komponent odpowiada za widok  wysyłajacy link potwierdzajacy adres email
 */
export class SendConfirmationLinkFormComponent implements OnDestroy, OnInit {
  errors: string;
  isRequesting: boolean;
  sub: Subscription;
  confirmForm: FormGroup;
  isSent = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  get email() { return this.confirmForm.get('email'); }

  ngOnInit() {
    this.confirmForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // wyslil link potwierdzjacy
  sendLink() {
    this.isRequesting = true;
    this.errors = '';
    this.sub = this.userService.sendEmaiConfirmationLink(this.email.value).pipe(
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
