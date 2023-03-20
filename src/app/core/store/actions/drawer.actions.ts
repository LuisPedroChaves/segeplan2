import { createAction, props } from '@ngrx/store';

export const CHANGE_MENU_DRAWER = createAction(
  '[DRAWER] Cambiar estado del cajon para menu',
);

export const OPEN_DRAWER1 = createAction(
  '[DRAWER] Abir cajón',
  props<{ width1: string, component1: string }>()
);

export const CLOSE_DRAWER1 = createAction(
  '[DRAWER] Cerrar cajón',
)

export const OPEN_DRAWER2 = createAction(
  '[DRAWER] Abir cajón 2',
  props<{ width2: string, component2: string }>()
);

export const CLOSE_DRAWER2 = createAction(
  '[DRAWER] Cerrar cajón 2',
)
