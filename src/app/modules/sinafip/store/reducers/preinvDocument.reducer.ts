import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { PreinvDocument } from 'src/app/core/models/sinafip';
import { AppState } from 'src/app/core/store/app.reducer';

export interface PreinvDocumentState {
  preinvDocuments: PreinvDocument[],
}

export interface PreinvDocumentStore extends AppState {
  preinvDocument: PreinvDocumentState
}

export const PREINVDOCUMENT_STATE: PreinvDocumentState = {
  preinvDocuments: [],
}

const _PREINVDOCUMENT_REDUCER = createReducer(PREINVDOCUMENT_STATE,
  on(actions.SET_PREINVDOCUMENTS, (state, { preinvDocuments: preinvDocuments }) => ({
    ...state,
    preinvDocuments: [...preinvDocuments],
  })),
)

export function PreinvDocumentReducer(state: PreinvDocumentState, action: any) {
  return _PREINVDOCUMENT_REDUCER(state, action)
}
