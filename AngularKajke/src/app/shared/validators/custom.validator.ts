import { Validator } from '../interfaces/validator';

/**
 * Przeprowadza walidacje podanej wartości przy użyciu zdefiniowanych walidatorow
 */
export class CustomValidator {
  errors: string;
  valid: boolean;

  constructor(value: any, validators: Validator[]) {
    // dopuki nie stwierdzono niezgodnosci wartości jest ona poprawna
    this.valid = true;
    this.errors = '';

    for (const validor of validators) {
      const result = validor.validate(value);
      if (!result.isValid) {
        // jesli stwierdzono niezgodność wartość nie jest poprawna i dodaj bład
        this.valid = false;
        this.errors += result.errorMessage + ' ';
      }
    }
  }
}
