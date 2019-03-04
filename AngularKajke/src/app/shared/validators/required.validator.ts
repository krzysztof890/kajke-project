import { Validator } from './../interfaces/validator';

/**
 * Sprawdza czy podany cia znakow nie jest pusty
 */
export class RequiredValidator implements Validator {
  constructor(private errorMessage?: string) { }

  validate(value: string): { isValid: boolean; errorMessage?: string; } {
    if (value.trim().length > 0) {
      return { isValid: true, errorMessage: null };
    } else {
      return { isValid: false, errorMessage: this.errorMessage };
    }
  }
}
