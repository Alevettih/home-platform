import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Application, ApplicationI18nFields } from '@hp/client/data/models';
import { ShellApplicationsFormComponent } from '@hp/client/features/shell/modules/applications/common/components/form';
import { generateApplicationI18nModel } from '@hp/client/features/shell/modules/applications/common/utils';
import {
  ToolbarComponent,
  ToolbarRightDirective,
} from '@hp/client/shared/core/components/toolbar';
import { TRANSLATION_LANGS } from '@hp/client/shared/core/configs/translations';
import { CanLeaveFormComponent } from '@hp/client/shared/core/guards/can-leave-form';
import { provideTranslocoScope, TranslocoDirective } from '@jsverse/transloco';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';
import { TuiNavigation } from '@taiga-ui/layout';

@Component({
  selector: 'hp-shell-applications-form-container',
  imports: [
    ReactiveFormsModule,
    ShellApplicationsFormComponent,
    ToolbarComponent,
    TuiNavigation,
    TuiAppearance,
    TuiButton,
    TranslocoDirective,
    ToolbarRightDirective,
  ],
  providers: [provideTranslocoScope('shell')],
  templateUrl: './shell-applications-form-container.component.html',
  styleUrl: './shell-applications-form-container.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellApplicationsFormContainerComponent
  implements CanLeaveFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly modelControl = this.fb.control<Application>({
    id: '',
    hostUrl: '',
    meta: {
      id: '',
      icon: '',
      route: '',
      selector: '',
    },
    i18n: generateApplicationI18nModel(
      inject(TRANSLATION_LANGS),
      (): ApplicationI18nFields => ({ name: '', description: '' }),
    ),
  });

  public readonly model = input.required<Application | undefined>();

  constructor() {
    effect((): void => {
      this.modelControl.reset(this.model());
    });
  }

  public get isDirty(): boolean {
    return this.modelControl.dirty;
  }

  public get isSaveEnabled(): boolean {
    return this.modelControl.valid && this.modelControl.dirty;
  }

  public onSave(): void {
    console.log(this.modelControl.getRawValue());
  }
}
