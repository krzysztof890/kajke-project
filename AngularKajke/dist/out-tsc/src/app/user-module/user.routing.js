import { CreateNewSurveyComponent } from './create-new-survey/create-new-survey.component';
import { GenerateSurveyReportComponent } from './generate-survey-report/generate-survey-report.component';
import { SurveyResultsComponent } from './survey-results/survey-results.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import { UserSurveysComponent } from './user-surveys/user-surveys.component';
import { RouterModule } from '@angular/router';
import { RootComponent } from './root/root.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../auth.guard';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
export var routing = RouterModule.forChild([
    {
        path: 'user',
        component: RootComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: HomeComponent },
            { path: 'home', component: HomeComponent },
            { path: 'surveys', component: UserSurveysComponent },
            { path: 'edit', component: EditSurveyComponent },
            { path: 'results', component: SurveyResultsComponent },
            { path: 'report', component: GenerateSurveyReportComponent },
            { path: 'create', component: CreateNewSurveyComponent },
            { path: '**', component: PageNotFoundComponent }
        ]
    }
]);
//# sourceMappingURL=user.routing.js.map