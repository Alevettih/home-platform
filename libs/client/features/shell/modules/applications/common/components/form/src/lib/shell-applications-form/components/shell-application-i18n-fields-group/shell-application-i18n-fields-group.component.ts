import { AsyncPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApplicationI18nFields } from '@hp/client/data/models';
import {
  AbstractFormValueAccessorComponent,
  CustomValidators,
  provideFormValueAccessor,
} from '@hp/client/utils';
import { TranslocoDirective } from '@jsverse/transloco';
import { TuiError, TuiTextfield } from '@taiga-ui/core';
import { TuiFieldErrorPipe, TuiTextarea } from '@taiga-ui/kit';
import { TuiForm } from '@taiga-ui/layout';

@Component({
  selector: 'hp-shell-applications-i18n-fields-group',
  templateUrl: './shell-application-i18n-fields-group.component.html',
  styleUrl: './shell-application-i18n-fields-group.component.less',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    TuiTextfield,
    TuiTextarea,
    TuiError,
    TuiFieldErrorPipe,
    TranslocoDirective,
    TuiForm,
  ],
  providers: [
    provideFormValueAccessor<ApplicationI18nFields>(
      ShellApplicationsI18nFieldsGroupComponent,
      (fb: NonNullableFormBuilder): FormGroup =>
        fb.group({
          name: fb.control('', [
            Validators.required,
            Validators.maxLength(100),
            CustomValidators.invalidSymbols()
          ]),
          description: fb.control('', [
            Validators.required,
            Validators.maxLength(300),
          ]),
        }),
    ),
  ],
})
export class ShellApplicationsI18nFieldsGroupComponent extends AbstractFormValueAccessorComponent<ApplicationI18nFields> {
  public readonly isEditable = input.required<boolean>();
}
