var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AutoResizeTextAreaDirective } from './directives/auto-resize-text-area.directive';
import { FormsModule } from '@angular/forms';
import { EnumKeyValueListPipe } from './pipes/enum-list.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { PasswordMatchValidatorDirective } from './directives/password-match-validator.directive';
import { ChartsModule } from 'ng2-charts';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { PageViewerComponent } from './components/page-viewer/page-viewer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
var SharedModule = /** @class */ (function () {
    /**
     * Moduł ktory udastepnia elementy wspoldzielone
     */
    function SharedModule() {
    }
    SharedModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                ChartsModule,
                FormsModule,
                MatButtonModule,
                MatChipsModule,
                MatInputModule,
                MatIconModule
            ],
            declarations: [EnumKeyValueListPipe, LoaderComponent, PasswordMatchValidatorDirective, DoughnutChartComponent, PageViewerComponent,
                AutoResizeTextAreaDirective,
                PageNotFoundComponent],
            exports: [MatButtonModule, MatChipsModule, MatInputModule, MatIconModule, PageNotFoundComponent,
                EnumKeyValueListPipe, LoaderComponent, DoughnutChartComponent, PageViewerComponent, AutoResizeTextAreaDirective]
        })
        /**
         * Moduł ktory udastepnia elementy wspoldzielone
         */
    ], SharedModule);
    return SharedModule;
}());
export { SharedModule };
//# sourceMappingURL=shared.module.js.map