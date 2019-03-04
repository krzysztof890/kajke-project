/**
 * Klasa ktore przechowuje wiadomosci wyswietlane w przypadku nieudanej walidacji danych
 */
var ValidatorMessages = /** @class */ (function () {
    function ValidatorMessages() {
    }
    /**
     * Wiadmośc ktora informuje o tym że pole jest wymagane
     */
    ValidatorMessages.RequiredField = ' Pole nie może pozostać puste lub nie wybrane';
    /**
     * Wiadomość ktora informuje o tym ze przekroczona maksymalna dlugośc
     * @length długość jaka przekroczona
     */
    ValidatorMessages.MaximumLengthEexceeded = function (length) { return ' Przekroczono maksymalną długość ' + length + ' znakow '; };
    return ValidatorMessages;
}());
export { ValidatorMessages };
//# sourceMappingURL=validator-messages.js.map