var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SharedModule } from './../shared/shared.module';
import { routing } from './external.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SurveyWasCompletedComponent } from './survey-was-completed/survey-was-completed.component';
import { NewFillSurveyComponent } from './new-fill-survey/new-fill-survey.component';
var ExternalModule = /** @class */ (function () {
    function ExternalModule() {
    }
    ExternalModule = __decorate([
        NgModule({
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
    ], ExternalModule);
    return ExternalModule;
}());
export { ExternalModule };
//# sourceMappingURL=external.module.js.map