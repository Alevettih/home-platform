import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import {
  TranslocoDirective,
} from '@jsverse/transloco';
import { TuiIcon } from '@taiga-ui/core';
import { TuiBlockStatus } from '@taiga-ui/layout';

@Component({
  imports: [TuiBlockStatus, TuiIcon, TranslocoDirective],
  selector: 'hp-example-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent { }
