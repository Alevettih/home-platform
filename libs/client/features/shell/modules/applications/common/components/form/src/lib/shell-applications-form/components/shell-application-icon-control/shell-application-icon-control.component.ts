import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AbstractControlValueAccessorComponent,
  provideControlValueAccessor,
} from '@hp/client/utils';
import { TranslocoDirective } from '@jsverse/transloco';
import {
  TuiButton,
  TuiDataList,
  TuiGroup,
  TuiIcon,
  TuiScrollable,
  TuiTextfield,
} from '@taiga-ui/core';
import { TuiChevron, TuiComboBox, TuiFilterByInputPipe } from '@taiga-ui/kit';
import ICONS from './icons.json';

@Component({
  selector: 'hp-shell-application-icon-control',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiTextfield,
    TuiChevron,
    TuiComboBox,
    TuiDataList,
    ScrollingModule,
    TuiScrollable,
    TuiFilterByInputPipe,
    TuiButton,
    TuiIcon,
    TranslocoDirective,
  ],
  providers: [provideControlValueAccessor(ShellApplicationsIconControl)],
  hostDirectives: [TuiGroup],
  templateUrl: './shell-application-icon-control.component.html',
  styleUrl: './shell-application-icon-control.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellApplicationsIconControl extends AbstractControlValueAccessorComponent<string> {
  protected readonly icons = Object.keys(ICONS);

  public readonly readOnly = input(false);
}
