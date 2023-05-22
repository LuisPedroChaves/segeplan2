import { createAction, props } from '@ngrx/store';
import { Departament } from 'src/app/core/models/adicionales';


export const READ_GEOGRAFICOS = createAction(
	'[GEOGRAFICOS] Leer geograficos',
  // props<{ geograficos: Departament[] }>()
);

export const SET_GEOGRAFICOS = createAction(
	'[GEOGRAFICOS] Asignar geograficos',
	props<{ geograficos: Departament[] }>()
)
