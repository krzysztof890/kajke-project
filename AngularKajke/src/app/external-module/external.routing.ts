import { NewFillSurveyComponent } from './new-fill-survey/new-fill-survey.component';
import { SurveyWasCompletedComponent } from './survey-was-completed/survey-was-completed.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'survey', component: NewFillSurveyComponent },
  { path: 'completed', component: SurveyWasCompletedComponent },
]);
