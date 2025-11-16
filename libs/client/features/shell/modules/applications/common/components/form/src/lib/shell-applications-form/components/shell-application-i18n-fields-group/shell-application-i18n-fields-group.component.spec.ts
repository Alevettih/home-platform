import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { ShellApplicationsI18nFieldsGroupComponent } from './shell-application-i18n-fields-group.component';

describe('ShellApplicationsI18nFieldsGroupComponent', (): void => {
  let component: ShellApplicationsI18nFieldsGroupComponent;
  let fixture: ComponentFixture<ShellApplicationsI18nFieldsGroupComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        ShellApplicationsI18nFieldsGroupComponent,
        TranslocoTestingModule.forRoot({
          langs: {
            'shell/en': {},
            'shell/ru': {},
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      ShellApplicationsI18nFieldsGroupComponent,
    );
    component = fixture.componentInstance;

    fixture.componentRef.setInput('isEditable', false);
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
