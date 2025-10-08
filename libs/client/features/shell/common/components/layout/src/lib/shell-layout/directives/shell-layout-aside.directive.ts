import { contentChildren, Directive } from '@angular/core';
import { ShellLayoutNavItemDirective } from './shell-layout-nav-item.directive';

@Directive({
  standalone: true,
  selector: '[hpShellLayoutAside]',
})
export class ShellLayoutAsideDirective {
  public readonly navigationItems = contentChildren(
    ShellLayoutNavItemDirective,
  );
}
