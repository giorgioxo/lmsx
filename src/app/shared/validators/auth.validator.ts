import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { debounceTime, map, Observable, of, switchMap } from 'rxjs';

export function georgianNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && !/^[ა-ჰ]+$/.test(value)) {
      return { invalidGeorgianName: true };
    }
    return null;
  };
}

export function usernameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && (!/^[a-zA-Z0-9]+$/.test(value) || value.length < 8)) {
      return { invalidUsername: true };
    }
    return null;
  };
}

export function emailFormatValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return { invalidEmail: true };
    }
    return null;
  };
}

export function strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (
      value &&
      (value.length < 8 ||
        value.length > 60 ||
        !/[A-Z]/.test(value) ||
        !/[a-z]/.test(value) ||
        !/[0-9]/.test(value) ||
        !/[@$!%*?&]/.test(value))
    ) {
      return { weakPassword: true };
    }
    return null;
  };
}

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const newPassword = control.get('newPassword')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!newPassword || !confirmPassword) return null;

  return newPassword === confirmPassword ? null : { passwordMismatch: true };
};

export function usernameTakenValidator(
  authService: AuthService,
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value = control.value;

    if (!value) return of(null);

    return of(value).pipe(
      debounceTime(1000),
      switchMap((username) =>
        authService
          .checkUsernameExists(username)
          .pipe(map((isTaken) => (isTaken ? { usernameTaken: true } : null))),
      ),
    );
  };
}
export function emailTakenValidator(
  authService: AuthService,
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value = control.value;
    if (!value) return of(null);

    return of(value).pipe(
      debounceTime(1000),
      switchMap((email) =>
        authService
          .checkEmailExists(email)
          .pipe(map((isTaken) => (isTaken ? { emailTaken: true } : null))),
      ),
    );
  };
}
