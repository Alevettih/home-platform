import { effect, inject } from '@angular/core';
import {
  PlatformLanguage,
  PlatformDataBus,
} from '@hp/client/data/platform-data-bus';
import { getBrowserLang, TranslocoService } from '@jsverse/transloco';
import { TuiLanguageName, TuiLanguageSwitcherService } from '@taiga-ui/i18n';
import { TRANSLATION_LANGS } from './translations.constants';
import { PlatformLangDefinition } from './translations.types';

export function setLanguage(): Promise<unknown> {
  const transloco: TranslocoService = inject(TranslocoService);
  const switcher: TuiLanguageSwitcherService = inject(
    TuiLanguageSwitcherService,
  );
  const bus: PlatformDataBus = inject(PlatformDataBus);
  const availableLangs = inject(TRANSLATION_LANGS);
  const activeLang = bus.language.asSignal();

  bus.language.set(getBrowserLang() as PlatformLanguage);

  effect((): void => {
    const lang = activeLang() as PlatformLanguage;

    transloco.setActiveLang(lang);
    switcher.setLanguage(getTuiLanguageName(availableLangs, lang));
  });

  return Promise.resolve();
}

function getTuiLanguageName(
  availableLangs: PlatformLangDefinition[],
  language: PlatformLanguage,
): TuiLanguageName {
  return availableLangs.find((lang): boolean => lang.id === language)
    ?.label as TuiLanguageName;
}
