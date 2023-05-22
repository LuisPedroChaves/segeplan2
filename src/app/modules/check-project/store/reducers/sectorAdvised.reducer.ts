import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions';
import { ISectorAdvised } from 'src/app/core/models/sinafip/sectorAdvised';
import { AppState } from 'src/app/core/store/app.reducer';
import {SET_SECTORSADVISED} from 'src/app/modules/check-project/store/actions'


export interface SectorAdvisedState {
    sectorsAdvised: ISectorAdvised[],
}

export interface SectorAdvisedStore extends AppState {
    sectorAdvised: SectorAdvisedState
}

export const SECTORADVICED_STATE: SectorAdvisedState = {
    sectorsAdvised: [],
}

const _SECTORADVISED_REDUCER = createReducer(SECTORADVICED_STATE,
  on(actions.SET_SECTORSADVISED, (state, { sectorsAdvised: sectorsAdvised }) => ({
    ...state,
    sectorsAdvised: [...sectorsAdvised],
})),
)

export function SectorAdvisedReducer(state: SectorAdvisedState, action: any) {
    return _SECTORADVISED_REDUCER(state, action)
}
