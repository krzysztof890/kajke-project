import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { UserService } from '../services/user.service';

/**
 * Przchwytuje ządania http i sprawdza czy zostały poprawnie autoryzowane na serwerze api
 */
@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private route: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(event => { }, err => {
      // jesli żądanie nie zostało autoryzowane wyloguj uzytkownika( wiekoszosci przypadkow token wygasł a jesli użytkownik
      // probuje cos obejśc jego problem ze go wylogowało) i przekieruj na strone logowania
      if (err instanceof HttpErrorResponse && err.status === 401) {
        console.log('Nie autoryzowany dostęp. Nastapi przekierowanie na strone logowania');
        this.userService.logout();
        this.route.navigate(['login']);
      }
    });
  }
}
