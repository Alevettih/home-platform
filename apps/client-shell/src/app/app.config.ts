import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideShellPropertiesBus } from '@hp/client/data/platform-data-bus';
import { appRoutes } from '@hp/client/features/shell/routing';
import { provideTranslations } from '@hp/client/shared/core/configs/translations';
import { provideEventPlugins } from '@taiga-ui/event-plugins';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideEventPlugins(),
    provideShellPropertiesBus(),
    provideTranslations(),
  ],
};
