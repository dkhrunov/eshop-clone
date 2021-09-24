import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export const matchPasswordsValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfirmation = control.get('passwordConfirmation');

  return password &&
    passwordConfirmation &&
    password.value === passwordConfirmation.value
    ? null
    : { passwordsDontMatch: true };
};
