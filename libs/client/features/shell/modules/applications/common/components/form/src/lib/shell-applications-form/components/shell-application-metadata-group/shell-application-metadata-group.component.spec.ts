import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { ShellApplicationsMetadataGroupComponent } from './shell-application-metadata-group.component';

describe('ShellApplicationsMetadataGroupComponent', (): void => {
  let component: ShellApplicationsMetadataGroupComponent;
  let fixture: ComponentFixture<ShellApplicationsMetadataGroupComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        ShellApplicationsMetadataGroupComponent,
        TranslocoTestingModule.forRoot({
          langs: {
            'shell/en': {},
            'shell/ru': {},
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShellApplicationsMetadataGroupComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('isEditable', false);
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
