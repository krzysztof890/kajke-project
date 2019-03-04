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

@NgModule({
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
export class AppModule { }
