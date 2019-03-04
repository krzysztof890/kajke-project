var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ComponentLoaderService } from './../shared/services/component-loader.service';
import { SurveyManagerModule } from './../survey-manager-module/survey-manager.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './root/root.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../auth.guard';
import { routing } from './user.routing';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { SurveyCreateQuestionComponent } from '../survey-manager-module/survey-create-question/survey-create-question.component';
import { SurveyService } from '../survey-manager-module/survey.service';
import { UserSurveysComponent } from './user-surveys/user-surveys.component';
import { SharedModule } from '../shared/shared.module';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import { SurveyResultsComponent } from './survey-results/survey-results.component';
import { GenerateSurveyReportComponent } from './generate-survey-report/generate-survey-report.component';
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                routing,
                SurveyManagerModule,
                SharedModule
            ],
            declarations: [RootComponent, HomeComponent, CreateSurveyComponent, UserSurveysComponent, EditSurveyComponent, SurveyResultsComponent, GenerateSurveyReportComponent],
            providers: [AuthGuard, ComponentLoaderService, SurveyService],
            entryComponents: [SurveyCreateQuestionComponent] // komponenty ktore maja byc prekompilowane
        })
    ], UserModule);
    return UserModule;
}());
export { UserModule };
//# sourceMappingURL=user.module.js.map