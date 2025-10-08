import { ComponentFixture, TestBed } from '@angular/core/testing';
import { providePlatformDataBus } from '@hp/client/data/platform-data-bus';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { ShellAppInfoComponent } from './shell-app-info.component';

describe('ShellAppInfoComponent', (): void => {
  let component: ShellAppInfoComponent;
  let fixture: ComponentFixture<ShellAppInfoComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ShellAppInfoComponent, TranslocoTestingModule.forRoot({
        langs: {
          'shell/en': {},
          'shell/ru': {},
        }
      })],
      providers: [providePlatformDataBus()],
    }).compileComponents();

    fixture = TestBed.createComponent(ShellAppInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
