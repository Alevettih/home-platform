import { Component, input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { TuiDialogService } from '@taiga-ui/core';
import { Observable, of } from 'rxjs';
import { canLeaveForm } from './can-leave-form.guard';
import { CanLeaveFormComponent } from './can-leave-form.types';

class MockConfirmDialogService {
  constructor(private readonly dialogResult: boolean) {}

  public open(): Observable<boolean> {
    return of(this.dialogResult);
  }
}

@Component({ template: '<p>Form!</p>' })
class MockFormComponent implements CanLeaveFormComponent {
  public readonly dirty = input.required<boolean>();

  public get isDirty(): boolean {
    return this.dirty();
  }
}

@Component({ template: '<p>Base!</p>' })
class MockBaseComponent {}

describe('canLeavePageForm', (): void => {
  async function setup(
    dirty: boolean,
    dialogResult: boolean,
  ): Promise<RouterTestingHarness> {
    TestBed.configureTestingModule({
      imports: [
        TranslocoTestingModule.forRoot({
          langs: {
            'shell/en': {},
            'shell/ru': {},
          },
        }),
      ],
      providers: [
        {
          provide: TuiDialogService,
          useFactory: (): MockConfirmDialogService =>
            new MockConfirmDialogService(dialogResult),
        },
        provideRouter(
          [
            {
              path: 'form',
              data: { dirty },
              canDeactivate: [canLeaveForm],
              component: MockFormComponent,
            },
            { path: 'base', component: MockBaseComponent },
          ],
          withComponentInputBinding(),
        ),
      ],
    });

    return await RouterTestingHarness.create('/form');
  }

  it('Should navigate if does not dirty', async (): Promise<void> => {
    const harness = await setup(false, false);

    await harness.navigateByUrl('/base', MockBaseComponent);

    expect(harness.routeNativeElement?.textContent).toContain('Base!');
  });

  it('Should navigate if dirty and user confirm exit', async (): Promise<void> => {
    const harness = await setup(true, true);

    await harness.navigateByUrl('/base', MockBaseComponent);

    expect(harness.routeNativeElement?.textContent).toContain('Base!');
  });

  it('Should not navigate if dirty and user does not confirm exit', async (): Promise<void> => {
    const harness = await setup(true, false);

    await harness.navigateByUrl('/base', MockFormComponent);

    expect(harness.routeNativeElement?.textContent).toContain('Form!');
  });
});
