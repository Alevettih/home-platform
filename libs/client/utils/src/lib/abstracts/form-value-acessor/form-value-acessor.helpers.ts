import { Provider, Type } from '@angular/core';
import {
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NonNullableFormBuilder,
} from '@angular/forms';
import { AbstractFormValueAccessorComponent } from './form-value-acessor.abstract.component';
import { PROVIDED_GROUP } from './form-value-acessor.constants';

export function provideFormValueAccessor<T extends object>(
  component: Type<AbstractFormValueAccessorComponent<T>>,
  formGroupFactory: (fb: NonNullableFormBuilder) => FormGroup,
): Provider {
  return [
    {
      provide: PROVIDED_GROUP,
      useFactory: formGroupFactory,
      deps: [NonNullableFormBuilder],
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: component,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: component,
      multi: true,
    },
  ];
}
