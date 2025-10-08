import { PlatformLanguage } from '@hp/client/data/platform-data-bus';
import { LangDefinition } from '@jsverse/transloco';
import { TuiCountryIsoCode, TuiLanguageName } from '@taiga-ui/i18n';

export interface PlatformLangDefinition extends LangDefinition {
  id: PlatformLanguage;
  label: TuiLanguageName;
  countryCode: TuiCountryIsoCode;
}
