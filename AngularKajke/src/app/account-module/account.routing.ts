import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';
import { ForgotpasswordFormComponent } from './forgot-password-form/forgot-password-form.component';
import { SendConfirmationLinkFormComponent } from './send-confirmation-link-form/send-confirmation-link-form.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';

/**
 * Trasy rutingu modulu account
 */
export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'confirm', component: ConfirmEmailComponent },
  { path: 'sendconfirm', component: SendConfirmationLinkFormComponent },
  { path: 'forgotpassword', component: ForgotpasswordFormComponent },
  { path: 'reset', component: ResetPasswordFormComponent },
]);
