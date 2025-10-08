import { computed, contentChildren, Directive } from '@angular/core';
import { ShellLayoutHeaderGroupDirective } from './shell-layout-header-group.directive';

@Directive({
  standalone: true,
  selector: '[hpShellLayoutHeader]',
})
export class ShellLayoutHeaderDirective {
  private readonly groups = contentChildren(ShellLayoutHeaderGroupDirective);

  public readonly leftGroups = computed((): ShellLayoutHeaderGroupDirective[] =>
    this.groups().filter(({ position }): boolean => position() === 'left'),
  );
  public readonly middleGroups = computed(
    (): ShellLayoutHeaderGroupDirective[] =>
      this.groups().filter(({ position }): boolean => position() === 'middle'),
  );
  public readonly rightGroups = computed(
    (): ShellLayoutHeaderGroupDirective[] =>
      this.groups().filter(({ position }): boolean => position() === 'right'),
  );
}
