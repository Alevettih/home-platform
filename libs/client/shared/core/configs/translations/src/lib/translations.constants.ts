import { InjectionToken } from '@angular/core';
import { PlatformLangDefinition } from './translations.types';

export const availableLangs: PlatformLangDefinition[] = [
  { id: 'en', label: 'english', countryCode: 'US' },
  { id: 'ru', label: 'russian', countryCode: 'RU' },
];

export const TRANSLATION_LANGS = new InjectionToken<PlatformLangDefinition[]>(
  'translation-langs',
  {
    factory: (): PlatformLangDefinition[] => availableLangs,
  },
);
