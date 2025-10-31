import { Component, computed, inject, input, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApplicationI18n, ApplicationI18nFields } from '@hp/client/data/models';
import { generateApplicationI18nModel } from '@hp/client/features/shell/modules/applications/common/utils';
import {
  PlatformLangDefinition,
  TRANSLATION_LANGS,
} from '@hp/client/shared/core/configs/translations';
import {
  AbstractFormValueAccessorComponent,
  provideFormValueAccessor,
} from '@hp/client/utils';
import { TranslocoDirective } from '@jsverse/transloco';
import { TuiFlagPipe, TuiIcon } from '@taiga-ui/core';
import { TuiSegmented, TuiTooltip } from '@taiga-ui/kit';
import { ShellApplicationsI18nFieldsGroupComponent } from '../shell-application-i18n-fields-group/shell-application-i18n-fields-group.component';

@Component({
  selector: 'hp-shell-applications-i18n-group',
  templateUrl: './shell-application-i18n-group.component.html',
  styleUrl: './shell-application-i18n-group.component.less',
  imports: [
    ReactiveFormsModule,
    TranslocoDirective,
    ShellApplicationsI18nFieldsGroupComponent,
    TuiSegmented,
    TuiIcon,
    TuiTooltip,
    TuiFlagPipe,
  ],
  providers: [
    provideFormValueAccessor<ApplicationI18n>(
      ShellApplicationsI18nGroupComponent,
      (fb: NonNullableFormBuilder): FormGroup =>
        fb.group(
          generateApplicationI18nModel(
            inject(TRANSLATION_LANGS),
            (): FormControl<ApplicationI18nFields> =>
              fb.control({ name: '', description: '' }),
          ),
        ),
    ),
  ],
})
export class ShellApplicationsI18nGroupComponent extends AbstractFormValueAccessorComponent<ApplicationI18n> {
  protected readonly langs = inject(TRANSLATION_LANGS);
  protected readonly currentLangIndex = signal(0);
  protected readonly currentLang = computed(
    (): PlatformLangDefinition => this.langs[this.currentLangIndex()],
  );

  public readonly isEditable = input.required<boolean>();
}
