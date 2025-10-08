import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  effect,
  inject,
} from '@angular/core';
import { PlatformDataBus } from '@hp/client/data/platform-data-bus';
import {
  provideTranslocoScope,
  translateObjectSignal,
  TranslocoDirective,
} from '@jsverse/transloco';
import { TuiIcon } from '@taiga-ui/core';
import { TuiBlockStatus } from '@taiga-ui/layout';

@Component({
  imports: [TuiBlockStatus, TuiIcon, TranslocoDirective],
  selector: 'hp-example-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  providers: [provideTranslocoScope('example')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly bus = inject(PlatformDataBus);
  private readonly cdr = inject(ChangeDetectorRef);

  private readonly appInfo = translateObjectSignal('appInfo');

  constructor() {
    effect((): void => {
      const { title, subtitle } = this.appInfo();

      this.bus.appInfo.set({
        title,
        subtitle,
        icon: '@tui.octagon-alert',
      });

      this.cdr.markForCheck();
    });

    this.destroyRef.onDestroy((): void => {
      this.bus.appInfo.set(null);
    });
  }
}
