import { createAction, props } from '@ngrx/store';
import { ModalityFinancing } from 'src/app/core/models/sinafip';


export const READ_MODALITYFINANCINGS = createAction(
	'[MODALITYFINANCINGS] Leer modalityFinancings'
);

export const SET_MODALITYFINANCINGS = createAction(
	'[MODALITYFINANCINGS] Asignar modalityFinancings',
	props<{ modalityFinancings: ModalityFinancing[] }>()
)
