var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
var AnswerComponent = /** @class */ (function () {
    function AnswerComponent() {
        this.BindingProperty = null;
        this.value = null;
    }
    AnswerComponent.prototype.ngOnInit = function () {
        // jesli jest to edycja ankiety trzeba powiazac juz z istniejaca odpowiedza
        if (this.value !== null) {
            this.index = this.BindingProperty.indexOf(this.value);
        }
        else { // jesli tworzy sie nowa ankieta od zera
            this.BindingProperty.push('');
            this.index = this.BindingProperty.length - 1;
        }
    };
    AnswerComponent.prototype.ngOnDestroy = function () {
        // poniewaz elementy kontenera sa usuwane od konca kiedy ma zostac usuniety ten komponent
        // usun powiazany z nia elelent tablicy czyli de facto ostatni element tablicy
        // narazie nie ma potrzeby usuwania po okreslonym indeksie
        this.BindingProperty.pop();
    };
    AnswerComponent = __decorate([
        Component({
            selector: 'app-answer',
            template: "\n  <input type=\"text\" [(ngModel)] ='BindingProperty[index]' placeholder='Podaj tre\u015B\u0107 odpowiedzi'>\n  ",
            styles: ['input { display: block; }']
        })
        /**
         * Komponent ktory skladowa do tworzenia pytan ankiety
         */
        ,
        __metadata("design:paramtypes", [])
    ], AnswerComponent);
    return AnswerComponent;
}());
export { AnswerComponent };
//# sourceMappingURL=answer.component.js.map