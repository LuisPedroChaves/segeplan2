import { Action, createReducer, on } from '@ngrx/store';
import { DataGeo } from 'src/app/core/models/alternative/DataGeo';
import { AppState } from 'src/app/core/store/app.reducer';
import { IdeaAlternative } from 'src/app/core/models/alternative/ideaAlternative';
import * as actions from '../actions';
import { SET_DATA_GEO, DELETE_DATA_GEOS, REMOVE_DATA_GEO } from '../actions';

export interface AlternativeState {
  alternative: IdeaAlternative,
  dataGeos: DataGeo[]
}

export interface AlternativeStore extends AppState {
  alternative: AlternativeState
}

export const ALTERNATIVE_STATE: AlternativeState = {
  alternative: null!,
  dataGeos: []
}

const _ALTERNATIVE_REDUCER = createReducer(ALTERNATIVE_STATE,

  on(actions.SET_ALTERNATIVE, (state, { alternative }) => ({
    ...state,
    alternative: alternative ? { ...alternative } : null,
    dataGeos: alternative?.geoArea ? [...alternative.geoArea.dataGeo] : []
  })),


  on(SET_DATA_GEO, (state, { dataGeo }) => ({
    ...state,
    dataGeos: [...state.dataGeos, dataGeo]
  })),

  on(REMOVE_DATA_GEO, (state, { index }) => ({
    ...state,
    dataGeos: [
      ...state.dataGeos.slice(0, index),
      ...state.dataGeos.slice(index + 1),
    ]
  })),

  on(DELETE_DATA_GEOS, (state) => ({
    ...state,
    dataGeos: []
  })),
)

export function AlternativeReducer(state: AlternativeState, action: Action) {
  return _ALTERNATIVE_REDUCER(state, action)
}
