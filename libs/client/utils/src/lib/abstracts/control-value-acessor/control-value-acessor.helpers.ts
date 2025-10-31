import { Provider, Type } from '@angular/core';
import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { AbstractControlValueAccessorComponent } from './control-value-acessor.abstract.component';

export function provideControlValueAccessor<T>(
  component: Type<AbstractControlValueAccessorComponent<T>>,
): Provider {
  return [
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
