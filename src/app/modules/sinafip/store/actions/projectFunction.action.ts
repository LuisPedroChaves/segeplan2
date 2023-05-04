import { createAction, props } from '@ngrx/store';
import { ProjectFunction } from 'src/app/core/models/sinafip';


export const READ_PROJECTFUNCTIONS = createAction(
	'[PROJECTFUNCTIONS] Leer projectFunctions'
);

export const SET_PROJECTFUNCTIONS = createAction(
	'[PROJECTFUNCTIONS] Asignar projectFunctions',
	props<{ projectFunctions: ProjectFunction[] }>()
)
