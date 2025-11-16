import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { ShellApplicationsFormComponent } from './shell-applications-form.component';

describe('ShellApplicationsFormComponent', (): void => {
  let component: ShellApplicationsFormComponent;
  let fixture: ComponentFixture<ShellApplicationsFormComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        ShellApplicationsFormComponent,
        TranslocoTestingModule.forRoot({
          langs: {
            'shell/en': {},
            'shell/ru': {},
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShellApplicationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
