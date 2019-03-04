var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './account.routing';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ForgotpasswordFormComponent } from './forgot-password-form/forgot-password-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';
import { SendConfirmationLinkFormComponent } from './send-confirmation-link-form/send-confirmation-link-form.component';
var AccountModule = /** @class */ (function () {
    /**
     * Moduł odpowiada za dostarczenie zestawu komponetow
     * ,ktore to sa wykorzystywane do stworzenia wyglady logowania, rejestracji itp..
     * i podstawowa logike ich obslugi
     */
    function AccountModule() {
    }
    AccountModule = __decorate([
        NgModule({
            declarations: [LoginFormComponent, RegisterFormComponent, ConfirmEmailComponent, SendConfirmationLinkFormComponent,
                ForgotpasswordFormComponent, ResetPasswordFormComponent],
            imports: [
                FormsModule,
                BrowserModule,
                CommonModule,
                routing,
            ],
            providers: []
        })
        /**
         * Moduł odpowiada za dostarczenie zestawu komponetow
         * ,ktore to sa wykorzystywane do stworzenia wyglady logowania, rejestracji itp..
         * i podstawowa logike ich obslugi
         */
    ], AccountModule);
    return AccountModule;
}());
export { AccountModule };
//# sourceMappingURL=account.module.js.map