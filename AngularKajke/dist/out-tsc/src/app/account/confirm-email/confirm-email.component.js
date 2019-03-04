var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { Component } from '@angular/core';
import { catchError } from 'rxjs/operators';
var ConfirmEmailComponent = /** @class */ (function () {
    function ConfirmEmailComponent(userService, router) {
        var _this = this;
        this.userService = userService;
        this.router = router;
        this.errors = '';
        this.isConfirmed = false;
        // pobiera sciezkie Url w ktorej znajduje sie token do potwierdzenia adresu email
        userService.confirmEmail(router.url).pipe(catchError(userService.handleErrors))
            .subscribe(function (res) {
            if (res) {
                _this.isConfirmed = true;
            }
        }, function (errors) { return _this.errors = errors; });
    }
    ConfirmEmailComponent = __decorate([
        Component({
            selector: 'app-confirm-email',
            templateUrl: './confirm-email.component.html',
            styleUrls: ['./confirm-email.component.css']
        })
        /**
         * Komponent słuzy do potwierdzania adresu email uzytkownika
         */
        ,
        __metadata("design:paramtypes", [UserService, Router])
    ], ConfirmEmailComponent);
    return ConfirmEmailComponent;
}());
export { ConfirmEmailComponent };
//# sourceMappingURL=confirm-email.component.js.map