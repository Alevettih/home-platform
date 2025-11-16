import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { appInfoResolver } from '@hp/client/data/resolvers/app-info';
import { ShellPlatformRootContainerComponent } from '@hp/client/features/shell/containers/platform-root';

export const appRoutes: Routes = [
  {
    path: '',
    component: ShellPlatformRootContainerComponent,
    children: [
      {
        path: 'apps',
        resolve: {
          appInfo: appInfoResolver(null),
        },
        loadChildren: (): Promise<Routes> =>
          import('@hp/client/features/shell/modules/applications/routing').then(
            (m): Routes => m.appRoutes,
          ),
      },
      {
        path: 'example',
        loadChildren: (): Promise<Routes> =>
          loadRemoteModule('example', './Routes').then(
            (m): Routes => m.appRoutes,
          ),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'apps',
  },
];
