/**
 * Słuzy do wywoływania metody zdefiniowanego obiektu poza nim bez potrzeby publicznego przekazania referencji do obiektu.
 */
export class MethodHandler {
  /**
   * Jak uzywać:
   * value.przekazana_nazwa_metody(args? any[]);
   * Przyjmuje argumety funkcji w postaci tablicy any[].
   * Maksymalna liczba parametrow jaka może przyjmować metoda to 16.
   */
  public value: any;
  /**
   * @param handlerObject Obiekt ktory ma wywołac określona metode.
   * @param methodNames Nazwy metod ktore maja zostać przekazane.
   */
  public constructor(handlerObject: any, methodNames: string[]) {
    this.value = {};
    methodNames.forEach(methodName => {
      const trim = methodName.trim();
      if (handlerObject[trim]) {
        this.value[trim] = (args?: any[]) => {
          if (args !== undefined) {
            return handlerObject[trim]
              .call(handlerObject, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7],
                args[8], args[9], args[10], args[11],
                args[12], args[13], args[14], args[15]);
          } else {
            return handlerObject[trim].call(handlerObject);
          }
        };
      }
    });
  }
}
