import { loadRemoteModule } from '@angular-architects/native-federation';
import { Route, Routes } from '@angular/router';
import { ShellPlatformRootContainerComponent } from '@hp/client/features/shell/containers/platform-root';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ShellPlatformRootContainerComponent,
    children: [
      {
        path: 'apps',
        children: [],
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
