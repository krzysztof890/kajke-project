var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/internal/operators/finalize';
import { catchError } from 'rxjs/internal/operators/catchError';
var RegisterComponent = /** @class */ (function () {
  function RegisterComponent(userService, router) {
    this.userService = userService;
    this.router = router;
    this.isRegistered = false;
    this.submitted = false;
    this.credentials = { email: '', password: '' };
  }
  RegisterComponent.prototype.ngOnInit = function () {
  };
  RegisterComponent.prototype.register = function (_a) {
    var _this = this;
    var value = _a.value, valid = _a.valid;
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.userService.register(value.email, value.password)
        .pipe(finalize(function () { return _this.isRequesting = false; }), catchError(this.userService.handleErrors))
        .subscribe(function (result) {
          if (result) {
            _this.isRegistered = true;
          }
        }, function (error) { return _this.errors = error; });
    }
  };
  RegisterComponent = __decorate([
    Component({
      selector: 'app-register',
      templateUrl: './register.component.html',
      styleUrls: ['./register.component.css']
    }),
    __metadata("design:paramtypes", [UserService, Router])
  ], RegisterComponent);
  return RegisterComponent;
}());
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map
