import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { ProjectFunction } from 'src/app/core/models/sinafip';
import { AppState } from 'src/app/core/store/app.reducer';

export interface ProjectFunctionState {
    projectFunctions: ProjectFunction[],
}

export interface ProjectFunctionStore extends AppState {
    projectFunction: ProjectFunctionState
}

export const PROJECTFUNCTION_STATE: ProjectFunctionState = {
    projectFunctions: [],
}

const _PROJECTFUNCTION_REDUCER = createReducer(PROJECTFUNCTION_STATE,
  on(actions.SET_PROJECTFUNCTIONS, (state, { projectFunctions: projectFunctions }) => ({
    ...state,
    projectFunctions: [...projectFunctions],
})),
)

export function ProjectFunctionReducer(state: ProjectFunctionState, action: any) {
    return _PROJECTFUNCTION_REDUCER(state, action)
}
