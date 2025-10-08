import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import {
  PlatformDataBus,
  PlatformTheme,
} from '@hp/client/data/platform-data-bus';
import { TranslocoDirective } from '@jsverse/transloco';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'hp-shell-theme-switcher',
  imports: [TuiButton, TranslocoDirective],
  templateUrl: './shell-theme-switcher.component.html',
  styleUrl: './shell-theme-switcher.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellThemeSwitcherComponent {
  private readonly bus = inject(PlatformDataBus);

  protected readonly theme = this.bus.theme.asSignal();

  constructor() {
    effect((): void => {
      if (!this.theme()) {
        this.bus.theme.set(
          matchMedia?.('(prefers-color-scheme: dark)')?.matches
            ? 'dark'
            : 'light',
        );
      }
    });
  }

  protected toggleTheme(theme: PlatformTheme): void {
    this.bus.theme.set(theme === 'dark' ? 'light' : 'dark');
  }
}
