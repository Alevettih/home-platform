import { AsyncPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApplicationMetadata } from '@hp/client/data/models';
import {
  AbstractFormValueAccessorComponent,
  CustomValidators,
  provideFormValueAccessor,
} from '@hp/client/utils';
import { TranslocoDirective } from '@jsverse/transloco';
import { TuiError, TuiTextfield } from '@taiga-ui/core';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { TuiForm } from '@taiga-ui/layout';
import { ShellApplicationsIconControl } from '../shell-application-icon-control/shell-application-icon-control.component';

@Component({
  selector: 'hp-shell-applications-metadata-group',
  templateUrl: './shell-application-metadata-group.component.html',
  styleUrl: './shell-application-metadata-group.component.less',
  imports: [
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    TuiTextfield,
    TuiError,
    TuiFieldErrorPipe,
    TuiForm,
    TranslocoDirective,
    ShellApplicationsIconControl,
  ],
  providers: [
    provideFormValueAccessor(
      ShellApplicationsMetadataGroupComponent,
      (fb: NonNullableFormBuilder): FormGroup =>
        fb.group({
          id: fb.control('', [
            Validators.required,
            Validators.maxLength(60),
            CustomValidators.selector,
            CustomValidators.notStartsWith('-'),
          ]),
          selector: fb.control('', [
            Validators.required,
            Validators.maxLength(60),
            CustomValidators.selector,
            CustomValidators.notStartsWith('-'),
          ]),
          route: fb.control('', [
            Validators.required,
            Validators.maxLength(60),
            CustomValidators.path,
            CustomValidators.notEndsWith('/'),
            CustomValidators.nonDuplicatedSymbol('/'),
          ]),
          icon: fb.control('', [
            Validators.required,
            Validators.maxLength(60),
            CustomValidators.selector,
            CustomValidators.notStartsWith('-'),
          ]),
        }),
    ),
  ],
})
export class ShellApplicationsMetadataGroupComponent extends AbstractFormValueAccessorComponent<ApplicationMetadata> {
  public readonly isEditable = input.required<boolean>();
}
