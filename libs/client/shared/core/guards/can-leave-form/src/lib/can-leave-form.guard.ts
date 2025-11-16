import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { translate } from '@jsverse/transloco';
import { TuiDialogService } from '@taiga-ui/core';
import { TUI_CONFIRM } from '@taiga-ui/kit';
import { Observable, of } from 'rxjs';
import { CanLeaveFormComponent } from './can-leave-form.types';

export const canLeaveForm: CanDeactivateFn<CanLeaveFormComponent> = (
  component: CanLeaveFormComponent,
): Observable<boolean> => {
  const dialog = inject(TuiDialogService);

  if (!component.isDirty) {
    return of(true);
  }

  return dialog.open<boolean>(TUI_CONFIRM, {
    label: translate('dialog.leaveForm.title'),
    dismissible: false,
    closeable: false,
    required: true,
    data: {
      content: translate('dialog.leaveForm.subtitle'),
      yes: translate('button.yes'),
      no: translate('button.no'),
    },
  });
};
