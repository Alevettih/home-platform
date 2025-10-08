import { ComponentFixture, TestBed } from '@angular/core/testing';
import { providePlatformDataBus } from '@hp/client/data/platform-data-bus';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { ShellPlatformRootContainerComponent } from './shell-platform-root.component';

describe('ShellPlatformRootContainerComponent', (): void => {
  let component: ShellPlatformRootContainerComponent;
  let fixture: ComponentFixture<ShellPlatformRootContainerComponent>;

  beforeEach(async (): Promise<void> => {
    global.matchMedia = jest.fn(
      (): MediaQueryList => ({ matches: true }) as MediaQueryList,
    );
    await TestBed.configureTestingModule({
      imports: [
        ShellPlatformRootContainerComponent,
        TranslocoTestingModule.forRoot({
          langs: {
            'shell/en': {},
            'shell/ru': {},
          },
        }),
      ],
      providers: [providePlatformDataBus()],
    }).compileComponents();

    fixture = TestBed.createComponent(ShellPlatformRootContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
