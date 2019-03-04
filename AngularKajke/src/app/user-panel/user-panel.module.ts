import { SharedModule } from './../shared/shared.module';
import { UserPanelService } from './user-panel.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './root/root.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { routing } from './user-panel.routing';
import { AuthGuard } from '../auth.guard';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ConfirmEmailChangeComponent } from './confirm-email-change/confirm-email-change.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [RootComponent, ChangePasswordComponent, HomeComponent, DeleteAccountComponent, ChangeEmailComponent,
    ConfirmEmailChangeComponent],
  providers: [AuthGuard, UserPanelService]
})
export class UserPanelModule { }
