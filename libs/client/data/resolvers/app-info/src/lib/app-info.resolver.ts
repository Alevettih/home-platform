import { computed, effect, inject, signal, Signal } from '@angular/core';
import { ResolveFn } from '@angular/router';
import {
  PlatformAppInfo,
  PlatformDataBus,
} from '@hp/client/data/platform-data-bus';
import { translateSignal } from '@jsverse/transloco';
import { isEqual } from 'es-toolkit';
import { Observable } from 'rxjs';

type TranslatablePlatformAppInfo = Omit<PlatformAppInfo, 'title' | 'subtitle'> &
  Record<'titleKey' | 'subtitleKey', string>;

export function appInfoResolver(
  data: TranslatablePlatformAppInfo | null,
  scope?: string,
): ResolveFn<PlatformAppInfo | null> {
  return (): Observable<PlatformAppInfo | null> => {
    const bus = inject(PlatformDataBus);
    const appInfo = appInfoSignal(data);

    effect((): void => bus.appInfo.set(appInfo()));

    return bus.appInfo.asObservable();

    function appInfoSignal(
      appInfo: TranslatablePlatformAppInfo | null,
    ): Signal<PlatformAppInfo | null> {
      if (!appInfo) {
        return signal(appInfo);
      }

      const title = translateSignal<string>(appInfo.titleKey, {}, scope);
      const subtitle = translateSignal<string>(appInfo.subtitleKey, {}, scope);

      return computed(
        (): PlatformAppInfo => ({
          title: title(),
          subtitle: subtitle(),
          icon: appInfo?.icon,
        }),
        { equal: isEqual },
      );
    }
  };
}
