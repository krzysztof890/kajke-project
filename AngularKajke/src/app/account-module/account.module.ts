import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './account.routing';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ForgotpasswordFormComponent } from './forgot-password-form/forgot-password-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';
import { SendConfirmationLinkFormComponent } from './send-confirmation-link-form/send-confirmation-link-form.component';

@NgModule({
  declarations: [LoginFormComponent, RegisterFormComponent, ConfirmEmailComponent, SendConfirmationLinkFormComponent,
    ForgotpasswordFormComponent, ResetPasswordFormComponent],
  imports: [
    FormsModule,
    BrowserModule,
    CommonModule,
    routing,
    ReactiveFormsModule
  ],
  providers: []
})
/**
 * Moduł odpowiada za dostarczenie zestawu komponetow
 * ,ktore to sa wykorzystywane do stworzenia wyglady logowania, rejestracji itp..
 * i podstawowa logike ich obslugi
 */
export class AccountModule { }
