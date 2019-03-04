var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { UserPanelModule } from './user-panel/user-panel.module';
import { ExternalModule } from './external-module/external.module';
import { FooterComponent } from './footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UserModule } from './user-module/user.module';
import { AppComponent } from './app.component';
import { UserService } from './shared/services/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccountModule } from './account-module/account.module';
import { HomeComponent } from './home/home.component';
import { Http } from '@angular/http';
import { routing } from './app.routing';
import { HeaderComponent } from './header/header.component';
import './shared/extensions/array-extensions';
import { ConfigService } from './shared/utilities/config.service';
import { AuthorizationInterceptor } from './shared/classes/authorization-interceptor';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ErrorInterceptor } from './shared/classes/error-interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent,
                HomeComponent,
                HeaderComponent,
                FooterComponent,
                ErrorPageComponent
            ],
            imports: [
                BrowserModule,
                HttpClientModule,
                AccountModule,
                routing,
                UserModule,
                ExternalModule,
                UserPanelModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserAnimationsModule,
            ],
            providers: [UserService, Http, ConfigService, { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },
                { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map