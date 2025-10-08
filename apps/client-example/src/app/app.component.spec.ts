import { TestBed } from '@angular/core/testing';
import { providePlatformDataBus } from '@hp/client/data/platform-data-bus';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { AppComponent } from './app.component';

describe('AppComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, TranslocoTestingModule.forRoot({})],
      providers: [providePlatformDataBus()],
    }).compileComponents();
  });

  it('should create', (): void => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
