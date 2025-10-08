import { ComponentFixture, TestBed } from '@angular/core/testing';
import { providePlatformDataBus } from '@hp/client/data/platform-data-bus';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { ShellLanguageSwitcherComponent } from './shell-language-switcher.component';

describe('ShellLanguageSwitcherComponent', (): void => {
  let component: ShellLanguageSwitcherComponent;
  let fixture: ComponentFixture<ShellLanguageSwitcherComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        ShellLanguageSwitcherComponent,
        TranslocoTestingModule.forRoot({}),
      ],
      providers: [providePlatformDataBus()],
    }).compileComponents();

    fixture = TestBed.createComponent(ShellLanguageSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
