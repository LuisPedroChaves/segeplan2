import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { ModalityFinancing } from 'src/app/core/models/sinafip';
import { AppState } from 'src/app/core/store/app.reducer';

export interface ModalityFinancingState {
  modalityFinancings: ModalityFinancing[],
}

export interface ModalityFinancingStore extends AppState {
  modalityFinancing: ModalityFinancingState
}

export const MODALITYFINANCING_STATE: ModalityFinancingState = {
  modalityFinancings: [],
}

const _MODALITYFINANCING_REDUCER = createReducer(MODALITYFINANCING_STATE,
  on(actions.SET_MODALITYFINANCINGS, (state, { modalityFinancings: modalityFinancings }) => ({
    ...state,
    modalityFinancings: [...modalityFinancings],
  })),
)

export function ModalityFinancingReducer(state: ModalityFinancingState, action: any) {
  return _MODALITYFINANCING_REDUCER(state, action)
}
