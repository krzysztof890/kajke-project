import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appPasswordMatchValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PasswordMatchValidatorDirective,
    multi: true
  }]
})
export class PasswordMatchValidatorDirective implements Validator {
  @Input()
  PasswordMatchValidator: string;
  constructor() { }

  validate(control: AbstractControl): { [key: string]: any } | null {
    const toCompare = control.parent.get(this.PasswordMatchValidator);
    if (toCompare && toCompare.value !== control.value) {
      return { 'notEqual': true };
    }
    return null;
  }
}
