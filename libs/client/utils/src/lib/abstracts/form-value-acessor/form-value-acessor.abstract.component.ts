import { Directive, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormGroup,
  NonNullableFormBuilder,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { PROVIDED_GROUP } from './form-value-acessor.constants';

@Directive({})
export abstract class AbstractFormValueAccessorComponent<T extends object>
  implements ControlValueAccessor, Validator {
  protected readonly form: FormGroup = inject(PROVIDED_GROUP);
  protected readonly fb: NonNullableFormBuilder = inject(
    NonNullableFormBuilder,
  );

  constructor() {
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((v): void => {
      this.onChange(v);
      this.onTouched();
    });
  }

  public onChange = (_value: T): void => undefined;
  public onTouched = (): void => undefined;
  public onValidatorChange = (): void => undefined;

  public writeValue(value: T): void {
    this.form.setValue(value, { emitEvent: false });
  }

  public registerOnChange(fn: (_value: T) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  public setDisabledState(disabled: boolean): void {
    if (disabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  public validate(_control: FormGroup): ValidationErrors | null {
    return this.form.valid ? null : this.getAggregatedErrors();
  }

  private getAggregatedErrors(): ValidationErrors | null {
    const errors: ValidationErrors = {};

    Object.keys(this.form.controls).forEach((key: string): void => {
      const controlErrors = this.form.get(key)?.errors;
      if (controlErrors) {
        errors[key] = controlErrors;
      }
    });

    return Object.keys(errors).length > 0 ? { innerForm: errors } : null;
  }
}
