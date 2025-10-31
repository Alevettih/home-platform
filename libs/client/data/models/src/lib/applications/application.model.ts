import { ApplicationI18n } from './application-i18n.model';
import { ApplicationMetadata } from './application-metadata.model';

export interface Application {
  id: string;
  hostUrl: string;
  meta: ApplicationMetadata;
  i18n: ApplicationI18n;
}
