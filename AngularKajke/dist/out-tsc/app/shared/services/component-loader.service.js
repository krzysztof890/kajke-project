var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ComponentFactoryResolver, Injectable } from '@angular/core';
/**
 * Usługa ktora słuzy do dynamiczego generowania i dodawania komponetow angulara do wybranego kontenera
 */
var ComponentLoaderService = /** @class */ (function () {
    function ComponentLoaderService(factoryResolver) {
        this.factoryResolver = factoryResolver;
    }
    /**
     * Ustaw kontener do ktorego bedziesz dodawaj i usuwal komponenty
     * @param viewContainerRef
     */
    ComponentLoaderService.prototype.setRootViewContainerRef = function (viewContainerRef) {
        this.rootViewContainer = viewContainerRef;
    };
    /**
     * Dodaje konpoment do wybranego kontenera
     * @param componentType Typ komponetu ktory ma zostać dodany
     * @param inputs Lista wartosci klucz-wartosc ,ktore maja zostać powiaze z zmiennymi komponetu.
     */
    ComponentLoaderService.prototype.addChild = function (componentType, inputs) {
        var factory = this.factoryResolver.resolveComponentFactory(componentType);
        var component = factory.create(this.rootViewContainer.parentInjector);
        // sprawdz czy komponent posiada taka własciwosc i została ona zdefiniowa w inputs , ustaw jej wartosc po kluczu z inputs
        if (inputs) {
            for (var key in component.instance) {
                if (component.instance.hasOwnProperty(key) && inputs.hasOwnProperty(key)) {
                    component.instance[key] = inputs[key];
                }
            }
        }
        this.rootViewContainer.insert(component.hostView);
        return component;
    };
    /**
     * Usun ostatni element z kontenera
     */
    ComponentLoaderService.prototype.removeLastChild = function () {
        this.rootViewContainer.remove(this.rootViewContainer.length - 1);
    };
    /**
     * Usun wybrany element z kontenera
     */
    ComponentLoaderService.prototype.removeChildAt = function (value) {
        this.rootViewContainer.remove(value);
    };
    ComponentLoaderService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ComponentFactoryResolver])
    ], ComponentLoaderService);
    return ComponentLoaderService;
}());
export { ComponentLoaderService };
//# sourceMappingURL=component-loader.service.js.map