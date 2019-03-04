import { NewFillSurveyComponent } from './new-fill-survey/new-fill-survey.component';
import { SurveyWasCompletedComponent } from './survey-was-completed/survey-was-completed.component';
import { RouterModule } from '@angular/router';
export var routing = RouterModule.forChild([
    { path: 'survey', component: NewFillSurveyComponent },
    { path: 'completed', component: SurveyWasCompletedComponent },
]);
//# sourceMappingURL=external.routing.js.map