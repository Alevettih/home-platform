import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { Observable, of } from 'rxjs';
import { ShellApplicationsHostUrlControl } from './shell-application-host-url-control.component';

describe('ShellApplicationsHostUrlControl', (): void => {
  let component: ShellApplicationsHostUrlControl;
  let fixture: ComponentFixture<ShellApplicationsHostUrlControl>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        ShellApplicationsHostUrlControl,
        TranslocoTestingModule.forRoot({
          langs: {
            'shell/en': {},
            'shell/ru': {},
          },
        }),
      ],
      providers: [
        {
          provide: HttpClient,
          useValue: {
            get: jest.fn(
              (): Observable<Record<string, string[]>> =>
                of({ test: ['test'] }),
            ),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShellApplicationsHostUrlControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
