import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import {
  PlatformAppInfo,
  PlatformDataBus,
} from '@hp/client/data/platform-data-bus';
import { translateObjectSignal } from '@jsverse/transloco';
import { TuiIcon, TuiTitle } from '@taiga-ui/core';
import { TuiFade } from '@taiga-ui/kit';

@Component({
  selector: 'hp-shell-app-info',
  imports: [TuiIcon, TuiTitle, TuiFade],
  templateUrl: './shell-app-info.component.html',
  styleUrl: './shell-app-info.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellAppInfoComponent {
  private readonly bus = inject(PlatformDataBus);
  private readonly defaultInfo = translateObjectSignal(
    'appInfo',
    {},
    'shell',
  ) as Signal<Omit<PlatformAppInfo, 'icon'>>;
  private readonly busInfo = this.bus.appInfo.asSignal();

  protected readonly info = computed(
    (): PlatformAppInfo => ({
      icon: '@tui.square-stack',
      ...this.defaultInfo(),
      ...this.busInfo(),
    }),
  );
}
