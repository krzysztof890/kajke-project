var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var UserPanelModule = /** @class */ (function () {
    function UserPanelModule() {
    }
    UserPanelModule = __decorate([
        NgModule({
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
    ], UserPanelModule);
    return UserPanelModule;
}());
export { UserPanelModule };
//# sourceMappingURL=user-panel.module.js.map