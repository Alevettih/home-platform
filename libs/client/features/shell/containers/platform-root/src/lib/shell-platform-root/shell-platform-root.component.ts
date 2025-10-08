import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlatformDataBus } from '@hp/client/data/platform-data-bus';
import { ShellAppInfoComponent } from '@hp/client/features/shell/common/components/app-info';
import { ShellLanguageSwitcherComponent } from '@hp/client/features/shell/common/components/language-switcher';
import {
  ShellLayoutAsideDirective,
  ShellLayoutComponent,
  ShellLayoutHeaderDirective,
  ShellLayoutHeaderGroupDirective,
  ShellLayoutNavItem,
  ShellLayoutNavItemDirective,
} from '@hp/client/features/shell/common/components/layout';
import { ShellThemeSwitcherComponent } from '@hp/client/features/shell/common/components/theme-switcher';
import { TuiRoot } from '@taiga-ui/core';

@Component({
  selector: 'hp-shell-platform-root-container',
  imports: [
    RouterModule,
    TuiRoot,
    ShellAppInfoComponent,
    ShellLayoutComponent,
    ShellLayoutHeaderDirective,
    ShellLayoutHeaderGroupDirective,
    ShellLayoutAsideDirective,
    ShellLayoutNavItemDirective,
    ShellLanguageSwitcherComponent,
    ShellThemeSwitcherComponent,
  ],
  templateUrl: './shell-platform-root.component.html',
  styleUrl: './shell-platform-root.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellPlatformRootContainerComponent {
  private readonly bus = inject(PlatformDataBus);

  protected readonly theme = this.bus.theme.asSignal();
  protected readonly navigationItems: ShellLayoutNavItem[] = [
    { icon: '@tui.octagon-alert', link: '/example', label: 'Example' },
  ];
}
