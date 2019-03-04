var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
var DoughnutChartComponent = /** @class */ (function () {
    function DoughnutChartComponent() {
        this.doughnutChartType = 'doughnut';
    }
    DoughnutChartComponent.prototype.ngOnInit = function () {
        this.options = {
            legend: {
                display: false,
                labels: {
                    fontSize: 14
                }
            },
        };
        this.formattedLabels = this.formatLabels(this.doughnutChartLabels);
        // this.doughnutChartLabels.forEach( label => {
        //   this.formattedLabels.push(this.formatLabel(label, this.maxLabelSize));
        // });
    };
    DoughnutChartComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    DoughnutChartComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    DoughnutChartComponent.prototype.formatLabels = function (labels) {
        var result = [];
        for (var i = 0; i < labels.length; i++) {
            result.push((i + 1) + ' ' + labels[i].substring(0, 70) + '.... ');
        }
        return result;
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], DoughnutChartComponent.prototype, "doughnutChartLabels", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], DoughnutChartComponent.prototype, "doughnutChartData", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DoughnutChartComponent.prototype, "title", void 0);
    DoughnutChartComponent = __decorate([
        Component({
            selector: 'app-doughnut-chart',
            templateUrl: './doughnut-chart.component.html',
            styleUrls: ['./doughnut-chart.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], DoughnutChartComponent);
    return DoughnutChartComponent;
}());
export { DoughnutChartComponent };
//# sourceMappingURL=doughnut-chart.component.js.map