import { SkipProperty } from '../classes/skip-property';
var Survey = /** @class */ (function () {
    function Survey(init) {
        Object.assign(this, init);
    }
    /**
     * Zwraca obiekt klasy serializowany do JSON
     */
    Survey.prototype.toJSON = function () {
        // nowa kolekcja pytan ktora nie bedzie posiadala pola questionErrors, poniewaz nie ma potrzeby serializacji tego pola
        var questions = [];
        for (var _i = 0, _a = this.Questions; _i < _a.length; _i++) {
            var item = _a[_i];
            questions.push(SkipProperty.skipKeys(item, ['questionErrors']));
        }
        // nowy obiekt ktory zawiera tylko te pola ktore maja zostac serializowane do json
        var obj = {
            name: this.Name,
            description: this.Description,
            questions: questions
        };
        return JSON.stringify(obj);
    };
    return Survey;
}());
export { Survey };
//# sourceMappingURL=survey.js.map