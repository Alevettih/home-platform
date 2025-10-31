import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  public static path(control: AbstractControl): ValidationErrors | null {
    const isValid = /^\/[a-zA-Z0-9\-_/]*$/gm.test(control.value);

    return isValid ? null : { path: true };
  }

  public static selector(control: AbstractControl): ValidationErrors | null {
    const isValid = /^[a-zA-Z0-9\-_]*$/gm.test(control.value);

    return isValid ? null : { selector: true };
  }

  public static notStartsWith(value: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = !control.value?.startsWith(value);

      return isValid ? null : { notStartsWith: { value } };
    };
  }

  public static notEndsWith(value: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = !control.value?.endsWith(value);

      return isValid ? null : { notEndsWith: { value } };
    };
  }

  public static nonDuplicatedSymbol(symbol: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validationRegExp = new RegExp(`[\\${symbol}}]{2}`, 'gm');
      const isInvalid = validationRegExp?.test(control.value);

      return isInvalid ? { nonDuplicatedSymbol: { symbol } } : null;
    };
  }

  public static invalidSymbols(
    invalidSymbols: string[] = [
      '?',
      ';',
      '{',
      '}',
      '[',
      ']',
      '|',
      '\\',
      '`',
      `'`,
      '"',
    ],
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validationRegExp = new RegExp(
        `[${invalidSymbols.join('\\')}]`,
        'gm',
      );
      const isInvalid = validationRegExp?.test(control.value);

      return isInvalid
        ? { invalidSymbols: { symbols: invalidSymbols } }
        : null;
    };
  }
}
