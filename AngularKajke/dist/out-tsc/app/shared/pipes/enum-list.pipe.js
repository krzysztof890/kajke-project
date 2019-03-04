var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var EnumKeyValueListPipe = /** @class */ (function () {
    function EnumKeyValueListPipe() {
        this.isValueProperty = function (key) { return parseInt(key, 10) >= 0; };
    }
    EnumKeyValueListPipe.prototype.transform = function (value, args) {
        var items = [];
        for (var key in value) {
            if (!this.isValueProperty(key)) {
                continue;
            }
            items.push({ key: key, value: value[key] });
        }
        return items;
    };
    EnumKeyValueListPipe = __decorate([
        Pipe({
            name: 'enumKeyValuelist'
        })
    ], EnumKeyValueListPipe);
    return EnumKeyValueListPipe;
}());
export { EnumKeyValueListPipe };
//# sourceMappingURL=enum-list.pipe.js.map