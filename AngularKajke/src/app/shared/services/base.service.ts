import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Podstawa dla usług ktore beda musialy obslugiwac bledy zwrocone z serwera
 */
export abstract class BaseService {
  constructor() { }

  /**
   *  Metoda sluzy do wyłuskania błedow i ich zwrocenia
   */
  handleErrors(error: any): any {
    // jesli blad serwera przeleci wszystki tablice z bledami i obrobi do jedno stringa
    let errorModel = '';
    for (const key in error.error) {
      if (error.error.hasOwnProperty(key)) {
        errorModel += error.error[key].toString() + ' \n ';
      }
    }
    return throwError(errorModel);
  }
}
