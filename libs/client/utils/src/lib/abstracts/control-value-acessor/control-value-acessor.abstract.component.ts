import {
  afterNextRender,
  Directive,
  inject,
  Injector,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  NonNullableFormBuilder,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({})
export abstract class AbstractControlValueAccessorComponent<T>
  implements ControlValueAccessor, Validator {
  private readonly injector = inject(Injector, { self: true });

  protected readonly value = signal<T>(undefined as T);
  protected readonly disabled = signal(false);
  protected readonly fb: NonNullableFormBuilder = inject(
    NonNullableFormBuilder,
  );
  private ngControl: NgControl | null = null;

  constructor() {
    /**
     * Довольно-таки грязный хак, но это единственный способ заинжектить NgControl,
     * не вызвав циклическую зависимость.
     *
     * Собственно сам ngControl нужен толкьо для доступа к состоянию (invalid, touched, pristine и т.д.)
     * изнутри accssor'а.
     */

    afterNextRender((): void => {
      this.ngControl = this.injector.get(NgControl, null, { self: true });

      if (this.ngControl) {
        this.ngControl.valueAccessor = this;
      }
    });
  }

  protected get control(): FormControl<T> | undefined {
    return this.ngControl?.control as FormControl<T> | undefined;
  }

  protected get shouldHighlightInvalid(): boolean {
    return (this.control?.touched && this.control?.invalid) ?? false;
  }

  public onChange = (_value: T): void => undefined;
  public onTouched = (): void => undefined;
  public onValidatorChange = (): void => undefined;

  public onModelChange(value: T): void {
    this.writeValue(value);
    this.onChange(value);
  }

  public writeValue(value: T): void {
    this.value.set(value);
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
    this.disabled.set(disabled);
  }

  public validate(_control: FormControl): ValidationErrors | null {
    return null;
  }
}
