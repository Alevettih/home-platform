import { PlatformLanguage } from '@hp/client/data/platform-data-bus';

export interface ApplicationI18nFields {
  name: string;
  description: string;
}

export type ApplicationI18n = Record<PlatformLanguage, ApplicationI18nFields>;
