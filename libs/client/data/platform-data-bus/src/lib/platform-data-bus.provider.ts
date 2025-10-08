import { Provider } from '@angular/core';
import { PlatformDataBus } from './platform-data-bus.class';

export function providePlatformDataBus(): Provider {
  return {
    provide: PlatformDataBus,
    useValue: PlatformDataBus.getInstance(),
  };
}
