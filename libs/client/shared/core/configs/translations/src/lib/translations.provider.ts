import {
  EnvironmentProviders,
  isDevMode,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { provideTranslocoLocale } from '@jsverse/transloco-locale';
import { availableLangs } from './translations.constants';
import { setLanguage } from './translations.initializer';
import { TranslationsHttpLoader } from './translations.loader';

export function provideTranslations(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideTransloco({
      loader: TranslationsHttpLoader,
      config: {
        availableLangs,
        reRenderOnLangChange: true,
        fallbackLang: 'en',
        defaultLang: 'ru',
        prodMode: !isDevMode(),
      },
    }),
    provideTranslocoLocale({
      langToLocaleMapping: {
        en: 'en-US',
        es: 'ru',
      },
    }),
    provideAppInitializer(setLanguage),
  ]);
}
