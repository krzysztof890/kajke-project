import { SurveyWasCompletedComponent } from './survey-was-completed/survey-was-completed.component';
import { FillSurveyComponent } from './fill-survey/fill-survey.component';
import { RouterModule } from '@angular/router';
export var routing = RouterModule.forChild([
    { path: 'survey', component: FillSurveyComponent },
    { path: 'completed', component: SurveyWasCompletedComponent }
]);
//# sourceMappingURL=external.routing.js.map