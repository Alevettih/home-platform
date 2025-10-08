import { initFederation } from '@angular-architects/native-federation';

initFederation()
  .catch((err): void => console.error(err))
  .then((_): Promise<unknown> => import('./bootstrap'))
  .catch((err): void => console.error(err));
