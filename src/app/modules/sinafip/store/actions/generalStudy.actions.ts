import { createAction, props } from '@ngrx/store';
import { GeneralStudy } from 'src/app/core/models/sinafip';


export const READ_GENERALSTUDIES = createAction(
	'[GENERALSTUDIES] Leer generalStudies'
);

export const SET_GENERALSTUDIES = createAction(
	'[GENERALSTUDIES] Asignar generalStudies',
	props<{ generalStudies: GeneralStudy[] }>()
)
