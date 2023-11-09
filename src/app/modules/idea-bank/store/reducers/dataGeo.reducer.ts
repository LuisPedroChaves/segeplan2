import { Action, createReducer, on } from '@ngrx/store';
import { DataGeo } from 'src/app/core/models/alternative/DataGeo';
import { AppState } from 'src/app/core/store/app.reducer';
import {
  DELETE_DATA_GEOS,
  REMOVE_DATA_GEO,
  SET_DATA_GEO,
} from '../actions/dataGeo.actions';

export interface DataGeoState {
  dataGeos: DataGeo[];
}

export interface DataGeoStore extends AppState {
  dataGeo: DataGeoState;
}

export const DATA_GEO_STATE: DataGeoState = {
  dataGeos: [],
};

const _DATA_GEO_REDUCER = createReducer(
  DATA_GEO_STATE,

  on(SET_DATA_GEO, (state, { dataGeo }) => ({
    ...state,
    dataGeos: [...state.dataGeos, dataGeo],
  })),

  on(REMOVE_DATA_GEO, (state, { index }) => ({
    ...state,
    dataGeos: [
      ...state.dataGeos.slice(0, index),
      ...state.dataGeos.slice(index + 1),
    ],
  })),

  on(DELETE_DATA_GEOS, (state) => ({
    ...state,
    dataGeos: [],
  }))
);

export function DataGeoReducer(state: DataGeoState, action: Action) {
  return _DATA_GEO_REDUCER(state, action);
}
