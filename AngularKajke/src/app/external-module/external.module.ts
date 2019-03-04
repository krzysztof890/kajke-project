import { SharedModule } from './../shared/shared.module';
import { routing } from './external.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SurveyWasCompletedComponent } from './survey-was-completed/survey-was-completed.component';
import { NewFillSurveyComponent } from './new-fill-survey/new-fill-survey.component';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    CommonModule,
    routing,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [SurveyWasCompletedComponent, NewFillSurveyComponent]
})
export class ExternalModule { }
