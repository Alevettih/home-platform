import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, contentChild, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import {
  TuiAsideComponent,
  TuiAsideItemDirective,
  TuiNavigation,
} from '@taiga-ui/layout';
import { ShellLayoutAsideDirective } from './directives/shell-layout-aside.directive';
import { ShellLayoutHeaderDirective } from './directives/shell-layout-header.directive';

@Component({
  selector: 'hp-shell-layout',
  imports: [
    TuiAsideComponent,
    TuiAsideItemDirective,
    TuiNavigation,
    RouterLink,
    NgTemplateOutlet,
    TranslocoDirective,
  ],
  templateUrl: './shell-layout.component.html',
  styleUrl: './shell-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellLayoutComponent {
  protected readonly header = contentChild(ShellLayoutHeaderDirective);
  protected readonly aside = contentChild(ShellLayoutAsideDirective);
  protected readonly expanded = signal(false);

  protected handleToggle(): void {
    this.expanded.update((e): boolean => !e);
  }
}
