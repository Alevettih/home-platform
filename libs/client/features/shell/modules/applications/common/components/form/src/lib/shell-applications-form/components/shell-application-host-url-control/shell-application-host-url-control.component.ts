import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ApplicationMetadataFile } from '@hp/client/data/models';
import {
  AbstractControlValueAccessorComponent,
  provideControlValueAccessor,
} from '@hp/client/utils';
import { TranslocoDirective } from '@jsverse/transloco';
import {
  TuiAppearanceOptions,
  TuiButton,
  TuiGroup,
  TuiHintDirective,
  TuiIcon,
  TuiLoader,
  TuiTextfield,
  TuiTextfieldComponent,
} from '@taiga-ui/core';
import { TuiTooltip } from '@taiga-ui/kit';
import { distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'hp-shell-application-host-url-control',
  imports: [
    FormsModule,
    TuiGroup,
    TuiTextfieldComponent,
    TuiTextfield,
    TuiIcon,
    TuiTooltip,
    TuiButton,
    TuiLoader,
    TuiHintDirective,
    TranslocoDirective,
  ],
  providers: [provideControlValueAccessor(ShellApplicationsHostUrlControl)],
  templateUrl: './shell-application-host-url-control.component.html',
  styleUrl: './shell-application-host-url-control.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellApplicationsHostUrlControl extends AbstractControlValueAccessorComponent<string> {
  private readonly http = inject(HttpClient);

  protected readonly isLoading = signal(false);
  protected readonly metadataStatus =
    signal<TuiAppearanceOptions['appearance']>('info');
  protected readonly metadataSearchIcon = computed<string>((): string => {
    switch (this.metadataStatus()) {
      case 'positive':
        return '@tui.package-check';
      case 'negative':
        return '@tui.package-x';
      default:
      case 'info':
        return '@tui.package-search';
    }
  });

  public readonly readOnly = input(false);
  public readonly metadataChange = output<ApplicationMetadataFile | null>();

  constructor() {
    super();

    toObservable(this.value)
      .pipe(
        distinctUntilChanged(),
        takeUntilDestroyed(),
        filter((): boolean => this.metadataStatus() !== 'info'),
      )
      .subscribe((): void => this.metadataStatus.set('info'));
  }

  public updateMetadata(): void {
    this.isLoading.set(true);
    this.http
      .get<ApplicationMetadataFile>(`${this.value()}/app.metadata.json`, {
        responseType: 'json',
      })
      .subscribe({
        next: (metadata): void => {
          this.isLoading.set(false);
          this.metadataChange.emit(metadata);
          this.metadataStatus.set('positive');
        },
        error: (): void => {
          this.isLoading.set(false);
          this.metadataChange.emit(null);
          this.metadataStatus.set('negative');
        },
      });
  }
}
