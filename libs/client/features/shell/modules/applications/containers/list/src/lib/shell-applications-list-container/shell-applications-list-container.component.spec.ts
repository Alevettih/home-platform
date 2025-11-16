import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShellApplicationsListContainerComponent } from './shell-applications-list-container.component';

describe('ShellApplicationsListContainerComponent', (): void => {
  let component: ShellApplicationsListContainerComponent;
  let fixture: ComponentFixture<ShellApplicationsListContainerComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ShellApplicationsListContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShellApplicationsListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
