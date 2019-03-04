var SkipProperty = /** @class */ (function () {
  function SkipProperty() {
  }
  /**
  * Zwraca obiekt ktory nie zawiera pol i method zawartych w tablicy keys
  * @param obj Obiekt na ktorym chcesz przeprowadzic operacje
  * @param keys Lista własciwości, ktore maja zostać pominiete
  * @returns Nowy obiekt, ktory zawiera wyłacznie elementy nie zawarte w tablicy keys
  */
  SkipProperty.skipKeys = function (obj, keys) {
    var item = {};
    for (var key in obj) {
      if (keys.indexOf(key) === -1) {
        item[key] = obj[key];
      }
    }
    return item;
  };
  return SkipProperty;
}());
export { SkipProperty };
//# sourceMappingURL=skip-property.js.map
