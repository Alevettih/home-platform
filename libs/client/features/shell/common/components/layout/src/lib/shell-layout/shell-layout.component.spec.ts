import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { ShellLayoutComponent } from './shell-layout.component';

describe('ShellLayoutComponent', (): void => {
  let component: ShellLayoutComponent;
  let fixture: ComponentFixture<ShellLayoutComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ShellLayoutComponent, TranslocoTestingModule.forRoot({})],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ShellLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
