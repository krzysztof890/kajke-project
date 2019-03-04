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
import { ValidationsOptions } from '../../shared/validators/validations-options';
var AnswerComponent = /** @class */ (function () {
    function AnswerComponent() {
        this.BindingProperty = null;
        this.value = null;
        this.maxLengthOfTheAnswer = ValidationsOptions.MaxLengthOfTheAnswer;
        this.handler = null;
        this.changeIndex = null;
        this.addButton = false;
    }
    /**
     * Dodaj nowe pole odpowiedzi
     */
    AnswerComponent.prototype.addAnswer = function () {
        this.addButton = !this.handler.value.addAnswer();
    };
    /**
     * usun obecne pole odpowiedzi
     */
    AnswerComponent.prototype.deleteAnswer = function () {
        this.handler.value.remoweAnswerAt([this.index]);
    };
    AnswerComponent.prototype.ngOnInit = function () {
        var _this = this;
        // jesli jest to edycja ankiety trzeba powiazac juz z istniejaca odpowiedza
        if (this.value !== null) {
            this.index = this.BindingProperty.indexOf(this.value);
        }
        else { // jesli tworzy sie nowa ankieta od zera
            this.BindingProperty.push('');
            this.index = this.BindingProperty.length - 1;
        }
        this.initializeAddButton();
        this.sub = this.changeIndex.subscribe(function (index) {
            if (_this.index > index) {
                _this.index--;
            } // jesli to jest teraz ostatnia odpowiedz dodaj addButton
            _this.initializeAddButton();
        });
    };
    /**
     * Sprawdz czy wystapiła konieczniść dodania przycisku addButton
     */
    AnswerComponent.prototype.initializeAddButton = function () {
        if (this.index === this.BindingProperty.length - 1) {
            this.addButton = true;
        }
    };
    AnswerComponent.prototype.ngOnDestroy = function () {
        // poniewaz elementy kontenera sa usuwane od konca kiedy ma zostac usuniety ten komponent
        // usun powiazany z nia elelent tablicy czyli de facto ostatni element tablicy
        // narazie nie ma potrzeby usuwania po okreslonym indeksie
        this.sub.unsubscribe();
    };
    AnswerComponent = __decorate([
        Component({
            selector: 'app-answer',
            templateUrl: './answer.component.html',
            styleUrls: ['./answer.component.css']
        })
        /**
         * Komponent ktorego zadaniem jest obsługa pojedynczego bloku do utworzenia odpowiedzi pytania ankiety.
         */
        ,
        __metadata("design:paramtypes", [])
    ], AnswerComponent);
    return AnswerComponent;
}());
export { AnswerComponent };
//# sourceMappingURL=answer.component.js.map