import { Subject } from 'rxjs';
import {
  PlatformAppInfo,
  PlatformLanguage,
  PlatformTheme,
} from './platform-data-bus.types';
import { PlatformDataField } from './platform-data-field.class';

declare global {
  interface Window {
    __PLATFORM_DATA_BUS__?: PlatformDataBus;
  }
}

export class PlatformDataBus {
  private readonly destroyed$ = new Subject<void>();

  public readonly appInfo = new PlatformDataField<PlatformAppInfo | null>(
    null,
    this.destroyed$,
  );
  public readonly language = new PlatformDataField<PlatformLanguage | null>(
    null,
    this.destroyed$,
  );
  public readonly theme = new PlatformDataField<PlatformTheme | null>(
    null,
    this.destroyed$,
  );

  public static register(): void {
    window.__PLATFORM_DATA_BUS__ = new PlatformDataBus();
  }

  public static isRegistered(): boolean {
    return (
      '__PLATFORM_DATA_BUS__' in window &&
      window?.__PLATFORM_DATA_BUS__ instanceof PlatformDataBus
    );
  }

  public static getInstance(): PlatformDataBus {
    if (!PlatformDataBus.isRegistered()) {
      PlatformDataBus.register();
    }

    return window.__PLATFORM_DATA_BUS__ as PlatformDataBus;
  }

  public static unregister(): void {
    this.getInstance()?.destroyed$?.next();
    this.getInstance()?.destroyed$?.complete();

    delete window.__PLATFORM_DATA_BUS__;
  }
}
