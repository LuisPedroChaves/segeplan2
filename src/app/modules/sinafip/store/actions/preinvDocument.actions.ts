import { createAction, props } from '@ngrx/store';
import { PreinvDocument } from 'src/app/core/models/sinafip';


export const READ_PREINVDOCUMENTS = createAction(
	'[PREINVDOCUMENTS] Leer preinvDocuments'
);

export const SET_PREINVDOCUMENTS = createAction(
	'[PREINVDOCUMENTS] Asignar preinvDocuments',
	props<{ preinvDocuments: PreinvDocument[] }>()
)
