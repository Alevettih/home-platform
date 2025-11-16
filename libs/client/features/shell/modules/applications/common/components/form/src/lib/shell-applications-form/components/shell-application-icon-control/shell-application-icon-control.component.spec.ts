import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { ShellApplicationsIconControl } from './shell-application-icon-control.component';

describe('ShellApplicationsIconControl', (): void => {
  let component: ShellApplicationsIconControl;
  let fixture: ComponentFixture<ShellApplicationsIconControl>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        ShellApplicationsIconControl,
        TranslocoTestingModule.forRoot({
          langs: {
            'shell/en': {},
            'shell/ru': {},
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShellApplicationsIconControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
