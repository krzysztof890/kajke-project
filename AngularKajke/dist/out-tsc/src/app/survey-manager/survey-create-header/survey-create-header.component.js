var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Survey } from './../../shared/Models/survey';
import { Component, Input } from '@angular/core';
var SurveyCreateHeaderComponent = /** @class */ (function () {
    function SurveyCreateHeaderComponent() {
    }
    SurveyCreateHeaderComponent.prototype.ngOnInit = function () {
        // inicjalizacja pol ankiety
        if (this.survey.Name === undefined || this.survey.Description === undefined) {
            this.survey.Name = '';
            this.survey.Description = '';
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Survey)
    ], SurveyCreateHeaderComponent.prototype, "survey", void 0);
    SurveyCreateHeaderComponent = __decorate([
        Component({
            selector: 'app-survey-create-header',
            templateUrl: './survey-create-header.component.html',
            styleUrls: ['./survey-create-header.component.css']
        })
        /**
         * Komponent ktory sluzy do tworzenia nagłowka ankiety
         */
        ,
        __metadata("design:paramtypes", [])
    ], SurveyCreateHeaderComponent);
    return SurveyCreateHeaderComponent;
}());
export { SurveyCreateHeaderComponent };
//# sourceMappingURL=survey-create-header.component.js.map