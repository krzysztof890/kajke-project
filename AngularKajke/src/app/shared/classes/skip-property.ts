export abstract class SkipProperty {
  /**
  * Zwraca obiekt ktory nie zawiera pol i method zawartych w tablicy keys
  * @param obj Obiekt na ktorym chcesz przeprowadzic operacje
  * @param keys Lista własciwości, ktore maja zostać pominiete
  * @returns Nowy obiekt, ktory zawiera wyłacznie elementy nie zawarte w tablicy keys
  */
  public static skipKeys(obj: any, keys: string[]): object {
    const item = {};
    for (const key in obj) {
      if (keys.indexOf(key) === -1) {
        item[key] = obj[key];
      }
    }
    return item;
  }
}
