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
var PageViewerComponent = /** @class */ (function () {
    function PageViewerComponent() {
    }
    PageViewerComponent.prototype.ngOnInit = function () {
        this.listElementsPerPage = 5;
        this.initialize();
        this.setPage();
    };
    PageViewerComponent.prototype.nextPage = function () {
        if (this.currentPage !== this.maxPageCounter) {
            this.currentPage++;
            if (this.currentPage === this.maxPageCounter) {
                this.lastPage();
            }
            else {
                this.setPage();
            }
        }
    };
    PageViewerComponent.prototype.previousPage = function () {
        if (this.currentPage !== 1) {
            this.currentPage--;
            if (this.currentPage === 1) {
                this.firstPage();
            }
            else {
                this.setPage();
            }
        }
    };
    PageViewerComponent.prototype.lastPage = function () {
        this.currentPage = this.maxPageCounter;
        var index = (this.maxPageCounter - 1) * this.listElementsPerPage;
        this.currentListElements = this.listElements.slice(index, index + this.remainder);
    };
    PageViewerComponent.prototype.firstPage = function () {
        this.currentPage = 1;
        this.currentListElements = this.listElements.slice(this.currentPage - 1, this.listElementsPerPage);
    };
    PageViewerComponent.prototype.onInputChange = function (event) {
        if (this.currentPage <= 0) {
            this.firstPage();
        }
        else if (this.currentPage >= this.maxPageCounter) {
            this.lastPage();
        }
        else {
            this.setPage();
        }
    };
    PageViewerComponent.prototype.setPage = function () {
        var index = (this.currentPage - 1) * this.listElementsPerPage;
        this.currentListElements = this.listElements.slice(index, index + this.listElementsPerPage);
    };
    PageViewerComponent.prototype.onSelectChange = function () {
        this.initialize();
        this.setPage();
    };
    PageViewerComponent.prototype.initialize = function () {
        this.currentPage = 1;
        // sprawdz ile bedzie stron uzyskaj wyganae dane
        this.remainder = this.listElements.length % this.listElementsPerPage;
        if (this.remainder === 0) {
            this.maxPageCounter = this.listElements.length / this.listElementsPerPage;
            this.remainder = this.listElementsPerPage;
        }
        else {
            this.maxPageCounter = Math.floor(this.listElements.length / this.listElementsPerPage) + 1;
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PageViewerComponent.prototype, "listElements", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PageViewerComponent.prototype, "title", void 0);
    PageViewerComponent = __decorate([
        Component({
            selector: 'app-page-viewer',
            templateUrl: './page-viewer.component.html',
            styleUrls: ['./page-viewer.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], PageViewerComponent);
    return PageViewerComponent;
}());
export { PageViewerComponent };
//# sourceMappingURL=page-viewer.component.js.map