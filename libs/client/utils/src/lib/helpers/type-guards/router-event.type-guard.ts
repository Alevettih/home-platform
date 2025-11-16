import { ActivationEnd, Event, NavigationEnd } from '@angular/router';

export type CheckFunction<T extends Event> = (event: Event) => event is T;

export const isNavigationEnd: CheckFunction<NavigationEnd> = (
  event: Event,
): event is NavigationEnd => event instanceof NavigationEnd;

export const isActivationEnd: CheckFunction<ActivationEnd> = (
  event: Event,
): event is ActivationEnd => event instanceof ActivationEnd;
