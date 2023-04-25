import { createAction, props } from '@ngrx/store';
import { Procesos } from 'src/app/core/models/adicionales';

export const READ_PROCESOS = createAction(
	'[PROCESOS] Leer procesos'
);

export const SET_PROCESOS = createAction(
	'[PROCESOS] Asignar procesos',
	props<{ procesos: Procesos }>()
)
