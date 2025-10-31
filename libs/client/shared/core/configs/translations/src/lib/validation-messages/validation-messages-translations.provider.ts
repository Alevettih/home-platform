import { inject, Provider } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { PolymorpheusContent } from '@taiga-ui/polymorpheus';
import { Observable } from 'rxjs';

export function provideValidationMessageTranslations(): Provider[] {
  return [
    {
      provide: TUI_VALIDATION_ERRORS,
      useFactory: translationsFactory,
    },
  ];
}

function translationsFactory(): Record<
  string,
  PolymorpheusContent | Observable<PolymorpheusContent>
> {
  const translate = inject(TranslocoService);

  return {
    required: (): Observable<string> =>
      translate.selectTranslate('error.required'),
    maxlength: ({
      requiredLength,
    }: Record<'requiredLength', string>): Observable<string> =>
      translate.selectTranslate('error.maxLength', { requiredLength }),
    minlength: ({
      requiredLength,
    }: Record<'requiredLength', string>): Observable<string> =>
      translate.selectTranslate('error.minLength', { requiredLength }),
    path: (): Observable<string> => translate.selectTranslate('error.path'),
    selector: (): Observable<string> => translate.selectTranslate('error.selector'),
    notStartsWith: ({
      value,
    }: Record<'value', string>): Observable<string> =>
      translate.selectTranslate('error.notStartsWith', { value }),
    notEndsWith: ({
      value,
    }: Record<'value', string>): Observable<string> =>
      translate.selectTranslate('error.notEndsWith', { value }),
    nonDuplicatedSymbol: ({
      symbol,
    }: Record<'symbol', string>): Observable<string> =>
      translate.selectTranslate('error.nonDuplicatedSymbol', {
        symbol,
      }),
    invalidSymbols: ({
      invalidSymbols,
    }: Record<'invalidSymbols', string[]>): Observable<string> =>
      translate.selectTranslate('error.invalidSymbols', {
        invalidSymbols,
      }),
  };
}
