import { PlatformLanguage } from '@hp/client/data/platform-data-bus';
import { PlatformLangDefinition } from '@hp/client/shared/core/configs/translations';

export function generateApplicationI18nModel<T = unknown>(
  langs: PlatformLangDefinition[],
  fieldsFactory: () => T,
): Record<PlatformLanguage, T> {
  return Object.fromEntries(
    langs.map(({ id }): [PlatformLanguage, T] => [id, fieldsFactory()]),
  ) as Record<PlatformLanguage, T>;
}
