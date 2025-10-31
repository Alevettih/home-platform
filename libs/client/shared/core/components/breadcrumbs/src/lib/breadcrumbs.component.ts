import {
  RouteBreadcrumb,
  RouteBreadcrumbsService,
} from '@alevettih/ngx-route-breadcrumbs';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { TuiItem } from '@taiga-ui/cdk';
import { TuiLink } from '@taiga-ui/core';
import { TuiBreadcrumbs } from '@taiga-ui/kit';

@Component({
  standalone: true,
  selector: 'hp-breadcrumbs',
  styleUrl: './breadcrumbs.component.less',
  templateUrl: './breadcrumbs.component.html',
  imports: [RouterLink, TranslocoDirective, TuiBreadcrumbs, TuiItem, TuiLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
  public readonly service = inject(RouteBreadcrumbsService);

  public readonly breadcrumbs = this.service.items;

  public readonly choose = output<RouteBreadcrumb>();

  public onBreadcrumbClick(
    event: MouseEvent,
    breadcrumb: RouteBreadcrumb,
  ): void {
    this.choose.emit(breadcrumb);
    breadcrumb.action?.(event);
  }
}
