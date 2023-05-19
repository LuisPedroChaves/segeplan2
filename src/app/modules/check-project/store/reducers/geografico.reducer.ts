import { createReducer, on } from '@ngrx/store';
import { Departament } from 'src/app/core/models/adicionales/department';

import * as actions from '../actions';
import { AppState } from 'src/app/core/store/app.reducer';

export interface GeograficoState {
    geograficos: Departament[],
}

export interface GeograficoStore extends AppState {
    geografico: GeograficoState
}

export const GEOGRAFICO_STATE: GeograficoState = {
    geograficos: [],
}

const _GEOGRAFICO_REDUCER = createReducer(GEOGRAFICO_STATE,
  on(actions.SET_GEOGRAFICOS, (state, { geograficos: geograficos }) => ({
    ...state,
    geograficos: [...geograficos],
})),
)

export function GeograficoReducer(state: GeograficoState, action: any) {
    return _GEOGRAFICO_REDUCER(state, action)
}
