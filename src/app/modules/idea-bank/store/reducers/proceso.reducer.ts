import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { Procesos } from 'src/app/core/models/adicionales';
import { AppState } from 'src/app/core/store/app.reducer';

export interface ProcesoState {
  procesos: Procesos,
}

export interface ProcesoStore extends AppState {
  proceso: ProcesoState
}

export const PROCESO_STATE: ProcesoState = {
  procesos: { noFormaCapital: [], formaCapital: [] },
}

const _PROCESO_REDUCER = createReducer(PROCESO_STATE,
  on(actions.SET_PROCESOS, (state, { procesos: procesos }) => (
    {
      ...state,
      procesos: procesos,
    })),
)

export function ProcesoReducer(state: ProcesoState, action: any) {
  return _PROCESO_REDUCER(state, action)
}
