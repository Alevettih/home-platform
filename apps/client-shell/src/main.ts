import { initFederation } from '@angular-architects/native-federation';

initFederation({
  example: '/host-example/remoteEntry.json',
})
  .catch((err): void => console.error(err))
  .then((_): Promise<unknown> => import('./bootstrap'))
  .catch((err): void => console.error(err));
