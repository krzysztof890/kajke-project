var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SurveyService } from './survey.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyCreateQuestionComponent } from './survey-create-question/survey-create-question.component';
import { SurveyCreateAnswerComponent } from './survey-create-answer/survey-create-answer.component';
import { AnswerComponent } from './answer/answer.component';
import { SurveyCreateHeaderComponent } from './survey-create-header/survey-create-header.component';
import { ManageSurveyComponent } from './manage-survey/manage-survey.component';
var SurveyManagerModule = /** @class */ (function () {
    function SurveyManagerModule() {
    }
    SurveyManagerModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                SharedModule
            ],
            exports: [SurveyCreateQuestionComponent, SurveyCreateHeaderComponent, ManageSurveyComponent],
            declarations: [SurveyCreateQuestionComponent, SurveyCreateAnswerComponent, AnswerComponent, SurveyCreateHeaderComponent,
                ManageSurveyComponent],
            providers: [SurveyService],
            entryComponents: [AnswerComponent]
        })
    ], SurveyManagerModule);
    return SurveyManagerModule;
}());
export { SurveyManagerModule };
//# sourceMappingURL=survey-manager.module.js.map