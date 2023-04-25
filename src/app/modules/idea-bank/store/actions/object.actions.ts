import { createAction, props } from '@ngrx/store';
import { IObject } from 'src/app/core/models/adicionales';


export const READ_OBJECTS = createAction(
	'[OBJECTS] Leer objects'
);

export const SET_OBJECTS = createAction(
	'[OBJECTS] Asignar objects',
	props<{ objects: IObject[] }>()
)
