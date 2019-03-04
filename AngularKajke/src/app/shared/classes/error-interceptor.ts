import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

/**
 * Przchwytuje ządania http i obsługuje statusy błedow
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private route: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(event => { }, err => {
      if (err instanceof HttpErrorResponse) {
        switch (err.status) {
          case 0: {
            this.navigateToErrorPage('Daj jakas waidomosc ze padl serwer lub nie ma neta na zas');
            break;
          }
        }
      }
    });
  }

  private navigateToErrorPage(errorMessage: string) {
    this.route.navigate(['error'], { queryParams: { errorMessage: errorMessage } });
  }
}
