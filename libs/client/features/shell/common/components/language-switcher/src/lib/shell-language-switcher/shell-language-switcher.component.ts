import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  PlatformLanguage,
  PlatformDataBus,
} from '@hp/client/data/platform-data-bus';
import { TRANSLATION_LANGS } from '@hp/client/shared/core/configs/translations';
import { LangDefinition, TranslocoDirective } from '@jsverse/transloco';
import { TuiDropdown, TuiIcon } from '@taiga-ui/core';
import { TuiButton } from '@taiga-ui/core/components/button';
import { TuiDataList } from '@taiga-ui/core/components/data-list';
import { TuiTextfield } from '@taiga-ui/core/components/textfield';
import { TuiFlagPipe } from '@taiga-ui/core/pipes/flag';

@Component({
  selector: 'hp-shell-language-switcher',
  imports: [
    TuiButton,
    TuiDataList,
    TuiFlagPipe,
    TuiTextfield,
    TuiDropdown,
    TuiIcon,
    TranslocoDirective,
  ],
  templateUrl: './shell-language-switcher.component.html',
  styleUrl: './shell-language-switcher.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellLanguageSwitcherComponent {
  private readonly bus = inject(PlatformDataBus);

  protected readonly availableLangs = inject(TRANSLATION_LANGS);
  protected readonly language = this.bus.language.asSignal();

  public setLang(lang: LangDefinition): void {
    this.bus.language.set(lang.id as PlatformLanguage);
  }
}
