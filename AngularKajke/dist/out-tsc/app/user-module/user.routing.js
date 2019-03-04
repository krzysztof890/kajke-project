import { GenerateSurveyReportComponent } from './generate-survey-report/generate-survey-report.component';
import { SurveyResultsComponent } from './survey-results/survey-results.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import { UserSurveysComponent } from './user-surveys/user-surveys.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { RouterModule } from '@angular/router';
import { RootComponent } from './root/root.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../auth.guard';
export var routing = RouterModule.forChild([
    {
        path: 'user',
        component: RootComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: HomeComponent },
            { path: 'home', component: HomeComponent },
            { path: 'create', component: CreateSurveyComponent },
            { path: 'surveys', component: UserSurveysComponent },
            { path: 'edit', component: EditSurveyComponent },
            { path: 'results', component: SurveyResultsComponent },
            { path: 'report', component: GenerateSurveyReportComponent }
        ]
    }
]);
//# sourceMappingURL=user.routing.js.map