import { Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

export class PlatformDataField<T> {
  private readonly data$: BehaviorSubject<T>;

  constructor(
    initialData: T,
    private readonly destroyed$: Subject<void>,
  ) {
    this.data$ = new BehaviorSubject<T>(initialData);
  }

  public set(data: T): void {
    this.data$.next(data);
  }

  public get(): T {
    return this.data$.getValue();
  }

  public asObservable(): Observable<T> {
    return this.data$.pipe(takeUntil(this.destroyed$));
  }

  public asSignal(): Signal<T> {
    return toSignal(this.asObservable(), { requireSync: true });
  }
}
