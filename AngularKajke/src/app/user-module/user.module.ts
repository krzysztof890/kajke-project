import { BrowserModule } from '@angular/platform-browser';
import { ManageSurveyComponent } from './manage-survey/manage-survey.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentLoaderService } from './../shared/services/component-loader.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './root/root.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../auth.guard';
import { routing } from './user.routing';
import { SurveyService } from '../shared/services/survey.service';
import { UserSurveysComponent } from './user-surveys/user-surveys.component';
import { SharedModule } from '../shared/shared.module';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import { SurveyResultsComponent } from './survey-results/survey-results.component';
import { GenerateSurveyReportComponent } from './generate-survey-report/generate-survey-report.component';
import { CreateNewSurveyComponent } from './create-new-survey/create-new-survey.component';
import { SendEmailInvitesComponent } from './send-email-invites/send-email-invites.component';
import { ShowResultsComponent } from './show-results/show-results.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule
  ],
  declarations: [RootComponent, HomeComponent, UserSurveysComponent, EditSurveyComponent, SendEmailInvitesComponent,
    SurveyResultsComponent, GenerateSurveyReportComponent, CreateNewSurveyComponent, ManageSurveyComponent, ShowResultsComponent],
  providers: [AuthGuard, ComponentLoaderService, SurveyService]
})
export class UserModule { }
