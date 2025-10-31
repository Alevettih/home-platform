import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { ShellApplicationsFormContainerComponent } from './shell-applications-form-container.component';

describe('ShellApplicationsFormContainerComponent', (): void => {
  let component: ShellApplicationsFormContainerComponent;
  let fixture: ComponentFixture<ShellApplicationsFormContainerComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        ShellApplicationsFormContainerComponent,
        TranslocoTestingModule.forRoot({
          langs: {
            'shell/en': {},
            'shell/ru': {},
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShellApplicationsFormContainerComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('model', undefined);
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
