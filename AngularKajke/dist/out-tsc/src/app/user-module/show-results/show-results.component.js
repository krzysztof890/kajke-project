var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Question } from './../../shared/Models/question';
import { Component, Input } from '@angular/core';
import { AnswerType } from '../../shared/Models/answer-type.enum';
var ShowResultsComponent = /** @class */ (function () {
    function ShowResultsComponent() {
    }
    ShowResultsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.question.AnswerType.toString() !== AnswerType.Tekstowy.toString()) {
            this.results = [];
            // posortuj wyniki
            this.surveyResults.sort(function (a, b) {
                if (a.answerNumber < b.answerNumber) {
                    return -1;
                }
                else {
                    return 1;
                }
            });
            // nastepnie dodaj je do nowej tablicy aby potem przekaz je do wykresu
            this.surveyResults.forEach(function (item) { return _this.results.push(item.answerCounter); });
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Question)
    ], ShowResultsComponent.prototype, "question", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ShowResultsComponent.prototype, "surveyResults", void 0);
    ShowResultsComponent = __decorate([
        Component({
            selector: 'app-show-results',
            templateUrl: './show-results.component.html',
            styleUrls: ['./show-results.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], ShowResultsComponent);
    return ShowResultsComponent;
}());
export { ShowResultsComponent };
//# sourceMappingURL=show-results.component.js.map