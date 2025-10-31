import { RouteBreadcrumbsService } from '@alevettih/ngx-route-breadcrumbs';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  inject,
  TemplateRef,
} from '@angular/core';
import { BreadcrumbsComponent } from '@hp/client/shared/core/components/breadcrumbs';
import { TuiNavigation } from '@taiga-ui/layout';
import { ToolbarLeftDirective } from './directives/toolbar-left.directive';
import { ToolbarMiddleDirective } from './directives/toolbar-middle.directive';
import { ToolbarRightDirective } from './directives/toolbar-right.directive';

@Component({
  selector: 'hp-toolbar',
  imports: [NgTemplateOutlet, BreadcrumbsComponent, TuiNavigation],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  protected readonly routeBreadcrumbs = inject(RouteBreadcrumbsService);

  protected readonly leftGroups = contentChildren(ToolbarLeftDirective, {
    read: TemplateRef,
  });
  protected readonly middleGroups = contentChildren(ToolbarMiddleDirective, {
    read: TemplateRef,
  });
  protected readonly rightGroups = contentChildren(ToolbarRightDirective, {
    read: TemplateRef,
  });
}
