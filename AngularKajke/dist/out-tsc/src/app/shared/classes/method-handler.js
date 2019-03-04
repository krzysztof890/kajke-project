/**
 * Słuzy do wywoływania metody zdefiniowanego obiektu poza nim bez potrzeby publicznego przekazania referencji do obiektu.
 */
var MethodHandler = /** @class */ (function () {
    /**
     * @param handlerObject Obiekt ktory ma wywołac określona metode.
     * @param methodNames Nazwy metod ktore maja zostać przekazane.
     */
    function MethodHandler(handlerObject, methodNames) {
        var _this = this;
        this.value = {};
        methodNames.forEach(function (methodName) {
            var trim = methodName.trim();
            if (handlerObject[trim]) {
                _this.value[trim] = function (args) {
                    if (args !== undefined) {
                        return handlerObject[trim]
                            .call(handlerObject, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12], args[13], args[14], args[15]);
                    }
                    else {
                        return handlerObject[trim].call(handlerObject);
                    }
                };
            }
        });
    }
    return MethodHandler;
}());
export { MethodHandler };
//# sourceMappingURL=method-handler.js.map