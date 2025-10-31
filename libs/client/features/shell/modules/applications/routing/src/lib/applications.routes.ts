import { setBreadcrumb } from '@alevettih/ngx-route-breadcrumbs';
import { Route } from '@angular/router';
import { appInfoResolver } from '@hp/client/data/resolvers/app-info';
import { ShellApplicationsFormContainerComponent } from '@hp/client/features/shell/modules/applications/containers/form';
import { ShellApplicationsListContainerComponent } from '@hp/client/features/shell/modules/applications/containers/list';
import { canLeaveForm } from '@hp/client/shared/core/guards/can-leave-form';

export const appRoutes: Route[] = [
  {
    path: '',
    data: {
      breadcrumb: setBreadcrumb({
        key: 'applications.appInfo.title',
        params: { scope: 'shell' },
      }),
    },
    children: [
      {
        path: 'list',
        resolve: {
          appInfo: appInfoResolver(
            {
              titleKey: 'applications.appInfo.title',
              subtitleKey: 'applications.appInfo.subtitle',
              icon: '@tui.boxes',
            },
            'shell',
          ),
        },
        component: ShellApplicationsListContainerComponent,
      },
      {
        path: 'create',
        canDeactivate: [canLeaveForm],
        data: {
          breadcrumb: setBreadcrumb({
            key: 'applications.form.create.title',
            params: { scope: 'shell' },
          }),
        },
        resolve: {
          appInfo: appInfoResolver(
            {
              titleKey: 'applications.form.create.title',
              subtitleKey: 'applications.form.create.subtitle',
              icon: '@tui.package-plus',
            },
            'shell',
          ),
        },
        component: ShellApplicationsFormContainerComponent,
      },
      {
        path: 'edit/:id',
        canDeactivate: [canLeaveForm],
        data: {
          breadcrumb: setBreadcrumb({
            key: 'applications.form.edit.title',
            params: { scope: 'shell' },
          }),
        },
        resolve: {
          appInfo: appInfoResolver(
            {
              titleKey: 'applications.form.edit.title',
              subtitleKey: 'applications.form.edit.subtitle',
              icon: '@tui.package-plus',
            },
            'shell',
          ),
        },
        component: ShellApplicationsFormContainerComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
    ],
  },
];
