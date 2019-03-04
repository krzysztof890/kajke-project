import { Validator } from '../interfaces/validator';

/**
 * Sprawdza czy podany string nie jest dłuższy niż okreslona wartosc
 */
export class MaxLengthValidator implements Validator {
  constructor(private maxLength: number, private errorMessage?: string) { }
  validate(value: string): { isValid: boolean; errorMessage: string; } {
    if (value.length > this.maxLength) {
      return { isValid: false, errorMessage: this.errorMessage };
    } else {
      return { isValid: true, errorMessage: '' };
    }
  }
}
