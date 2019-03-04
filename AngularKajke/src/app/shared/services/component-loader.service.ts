import { ComponentFactoryResolver, Injectable, ViewContainerRef, Type, ComponentRef } from '@angular/core';

/**
 * Usługa ktora słuzy do dynamiczego generowania i dodawania komponetow angulara do wybranego kontenera
 */
@Injectable()
export class ComponentLoaderService {
  rootViewContainer: ViewContainerRef;

  constructor(private factoryResolver: ComponentFactoryResolver) { }

  /**
   * Ustaw kontener do ktorego bedziesz dodawaj i usuwal komponenty
   * @param viewContainerRef
   */
  setRootViewContainerRef(viewContainerRef): void {
    this.rootViewContainer = viewContainerRef;
  }

  /**
   * Dodaje konpoment do wybranego kontenera
   * @param componentType Typ komponetu ktory ma zostać dodany
   * @param inputs Lista wartosci klucz-wartosc ,ktore maja zostać powiaze z zmiennymi komponetu.
   */
  addChild<T>(componentType: Type<T>, inputs?: { [key: string]: any; }): ComponentRef<T> {
    const factory = this.factoryResolver.resolveComponentFactory(componentType);
    const component = factory.create(this.rootViewContainer.parentInjector);

    // sprawdz czy komponent posiada taka własciwosc i została ona zdefiniowa w inputs , ustaw jej wartosc po kluczu z inputs
    if (inputs) {
      for (const key in component.instance) {
        if (component.instance.hasOwnProperty(key) && inputs.hasOwnProperty(key)) {
          component.instance[key] = inputs[key];
        }
      }
    }

    this.rootViewContainer.insert(component.hostView);
    return component;
  }

  /**
   * Usun ostatni element z kontenera
   */
  removeLastChild(): void {
    this.rootViewContainer.remove(this.rootViewContainer.length - 1);
  }
  /**
   * Usun wybrany element z kontenera
   */
  removeChildAt(value: number): void {
    this.rootViewContainer.remove(value);
  }
}
