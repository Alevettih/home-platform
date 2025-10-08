import { Directive, inject, input, TemplateRef } from '@angular/core';
import { ShellLayoutHeaderGroupPosition } from '../shell-layout.types';

@Directive({
  standalone: true,
  selector: '[hpShellLayoutHeaderGroup]',
})
export class ShellLayoutHeaderGroupDirective {
  public readonly templateRef = inject(TemplateRef);

  public readonly id = input(Math.random().toString(16).replace('.', ''));
  public readonly position = input.required<ShellLayoutHeaderGroupPosition>({
    alias: 'hpShellLayoutHeaderGroup',
  });
}
