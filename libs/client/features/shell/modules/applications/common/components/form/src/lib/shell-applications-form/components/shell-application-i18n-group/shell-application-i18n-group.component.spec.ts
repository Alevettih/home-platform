import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { ShellApplicationsI18nGroupComponent } from './shell-application-i18n-group.component';

describe('ShellApplicationsI18nGroupComponent', (): void => {
  let component: ShellApplicationsI18nGroupComponent;
  let fixture: ComponentFixture<ShellApplicationsI18nGroupComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        ShellApplicationsI18nGroupComponent,
        TranslocoTestingModule.forRoot({
          langs: {
            'shell/en': {},
            'shell/ru': {},
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShellApplicationsI18nGroupComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('isEditable', false);
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
