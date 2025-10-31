import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Application,
  ApplicationI18nFields,
  ApplicationMetadata,
  ApplicationMetadataFile,
} from '@hp/client/data/models';
import { generateApplicationI18nModel } from '@hp/client/features/shell/modules/applications/common/utils';
import { TRANSLATION_LANGS } from '@hp/client/shared/core/configs/translations';
import {
  AbstractFormValueAccessorComponent,
  CustomValidators,
  provideFormValueAccessor,
} from '@hp/client/utils';
import { TranslocoDirective } from '@jsverse/transloco';
import {
  TuiError,
  TuiExpandComponent,
  TuiLabel,
  TuiTextfield,
} from '@taiga-ui/core';
import { TuiAccordion, TuiFieldErrorPipe, TuiSwitch } from '@taiga-ui/kit';
import { TuiCard, TuiForm } from '@taiga-ui/layout';
import { ShellApplicationsHostUrlControl } from './components/shell-application-host-url-control/shell-application-host-url-control.component';
import { ShellApplicationsI18nGroupComponent } from './components/shell-application-i18n-group/shell-application-i18n-group.component';
import { ShellApplicationsMetadataGroupComponent } from './components/shell-application-metadata-group/shell-application-metadata-group.component';

@Component({
  selector: 'hp-shell-applications-form',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    TranslocoDirective,
    ShellApplicationsI18nGroupComponent,
    ShellApplicationsMetadataGroupComponent,
    TuiTextfield,
    TuiSwitch,
    TuiCard,
    TuiAccordion,
    TuiForm,
    TuiLabel,
    TuiError,
    TuiFieldErrorPipe,
    TuiExpandComponent,
    ShellApplicationsHostUrlControl,
  ],
  providers: [
    provideFormValueAccessor(
      ShellApplicationsFormComponent,
      (fb: NonNullableFormBuilder): FormGroup =>
        fb.group({
          id: fb.control(''),
          hostUrl: fb.control('', [
            Validators.required,
            Validators.maxLength(60),
            CustomValidators.path,
            CustomValidators.notEndsWith('/'),
            CustomValidators.nonDuplicatedSymbol('/'),
          ]),
          meta: fb.control<ApplicationMetadata>({
            id: '',
            selector: '',
            route: '',
            icon: '',
          }),
          i18n: fb.control(
            generateApplicationI18nModel(
              inject(TRANSLATION_LANGS),
              (): ApplicationI18nFields => ({ name: '', description: '' }),
            ),
          ),
        }),
    ),
  ],
  templateUrl: './shell-applications-form.component.html',
  styleUrl: './shell-applications-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellApplicationsFormComponent extends AbstractFormValueAccessorComponent<Application> {
  private readonly langs = inject(TRANSLATION_LANGS);

  protected readonly expanded = signal(false);
  protected readonly isEditableControl = this.fb.control(false);
  protected readonly isEditable = toSignal(
    this.isEditableControl.valueChanges,
    {
      initialValue: false,
    },
  );

  public onMetadataChange(metadata: ApplicationMetadataFile | null): void {
    const { hostUrl, id } = this.form.getRawValue();
    if (metadata) {
      const { name, description, ...meta } = metadata;
      this.form.reset({
        id,
        hostUrl,
        meta,
        i18n: generateApplicationI18nModel(
          this.langs,
          (): ApplicationI18nFields => ({
            name,
            description,
          }),
        ),
      });
      this.expanded.set(true);
    } else {
      this.form.reset({ id, hostUrl });
      this.expanded.set(false);
    }
  }
}
