import { Action, createReducer, on } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.reducer';
import { IdeaAlternative } from 'src/app/core/models/alternative/ideaAlternative';
import * as actions from '../actions';

export interface AlternativeState {
  alternative: IdeaAlternative;
}

export interface AlternativeStore extends AppState {
  alternative: AlternativeState;
}

export const ALTERNATIVE_STATE: AlternativeState = {
  alternative: null!,
};

const _ALTERNATIVE_REDUCER = createReducer(
  ALTERNATIVE_STATE,

  on(actions.SET_ALTERNATIVE, (state, { alternative }) => ({
    ...state,
    alternative: alternative ? { ...alternative } : null,
    dataGeos: alternative?.geoArea ? [...alternative.geoArea.dataGeo] : [],
  }))
);

export function AlternativeReducer(state: AlternativeState, action: Action) {
  return _ALTERNATIVE_REDUCER(state, action);
}
