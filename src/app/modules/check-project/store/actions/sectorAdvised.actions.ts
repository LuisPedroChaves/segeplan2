import { createAction, props } from '@ngrx/store';
import { ISectorAdvised } from 'src/app/core/models/sinafip/sectorAdvised';


export const READ_SECTORSADVISED = createAction(
	'[SECTORSADVISED] Leer sectors Advised'
);

export const SET_SECTORSADVISED = createAction(
	'[SECTORSADVISED] Asignar sectors advised',
	props<{ sectorsAdvised: ISectorAdvised[] }>()
)
