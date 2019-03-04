var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { UserService } from './../../shared/services/user.service';
import { Component } from '@angular/core';
import { UserPanelService } from '../user-panel.service';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
var ConfirmEmailChangeComponent = /** @class */ (function () {
    function ConfirmEmailChangeComponent(userPanelService, route, userService) {
        this.userPanelService = userPanelService;
        this.route = route;
        this.userService = userService;
        this.subs = [];
        this.isSuccessful = false;
        console.log('weszło');
    }
    ConfirmEmailChangeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subs.push(this.route.queryParams.subscribe(function (params) {
            _this.value = { newEmail: params.newemail, code: params.code };
        }));
        this.subs.push(this.userPanelService.changeEmail(this.value).pipe(catchError(this.userPanelService.handleErrors)).
            subscribe(function (res) {
            _this.isSuccessful = true;
            _this.userService.logout();
        }, function (errors) { return _this.errors = errors; }));
    };
    ConfirmEmailChangeComponent.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
    };
    ConfirmEmailChangeComponent = __decorate([
        Component({
            selector: 'app-confirm-email-change',
            templateUrl: './confirm-email-change.component.html',
            styleUrls: ['./confirm-email-change.component.css']
        }),
        __metadata("design:paramtypes", [UserPanelService, ActivatedRoute, UserService])
    ], ConfirmEmailChangeComponent);
    return ConfirmEmailChangeComponent;
}());
export { ConfirmEmailChangeComponent };
//# sourceMappingURL=confirm-email-change.component.js.map