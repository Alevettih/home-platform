import { Route } from '@angular/router';
import { appInfoResolver } from '@hp/client/data/resolvers/app-info';
import { AppComponent } from './app.component';

export const appRoutes: Route[] = [
  {
    path: '',
    resolve: {
      appInfo: appInfoResolver({
        titleKey: 'appInfo.title',
        subtitleKey: 'appInfo.subtitle',
        icon: '@tui.octagon-alert',
      }, 'example')
    },
    component: AppComponent,
  },
];
