var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, ElementRef, HostListener } from '@angular/core';
var AutoResizeTextAreaDirective = /** @class */ (function () {
    function AutoResizeTextAreaDirective(el) {
        this.el = el;
    }
    AutoResizeTextAreaDirective.prototype.onInput = function () {
        this.el.nativeElement.rows = Math.floor(this.el.nativeElement.value.length / this.charactersPerLine) + 1;
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AutoResizeTextAreaDirective.prototype, "charactersPerLine", void 0);
    __decorate([
        HostListener('input'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AutoResizeTextAreaDirective.prototype, "onInput", null);
    AutoResizeTextAreaDirective = __decorate([
        Directive({
            selector: '[appAutoResizeTextArea]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], AutoResizeTextAreaDirective);
    return AutoResizeTextAreaDirective;
}());
export { AutoResizeTextAreaDirective };
//# sourceMappingURL=auto-resize-text-area.directive.js.map