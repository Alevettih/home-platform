import { Directive, input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[hpShellLayoutNavItem]',
})
export class ShellLayoutNavItemDirective {
  public readonly id = input(Math.random().toString(16).replace('.', ''));

  public readonly label = input.required<string>();
  public readonly icon = input.required<string>();
  public readonly link = input.required<string>();
}
