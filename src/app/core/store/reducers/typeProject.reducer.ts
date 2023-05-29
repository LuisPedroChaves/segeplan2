import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions';
import { AppState } from '../app.reducer';
import { ITypeProject } from '../../models/adicionales/typeProject';

export interface TypeProjectState {
    typeProjects: ITypeProject[],
}

export interface TypeProjectStore extends AppState {
    typeProject: TypeProjectState
}

export const TYPEPROJECT_STATE: TypeProjectState = {
    typeProjects: [],
}

const _TYPEPROJECT_REDUCER = createReducer(TYPEPROJECT_STATE,
    on(actions.SET_TYPEPROJECTS, (state, { typeProjects: typeProjects }) => ({
        ...state,
        typeProjects: [...typeProjects],
    })),
)

export function TypeProjectReducer(state: TypeProjectState, action: any) {
    return _TYPEPROJECT_REDUCER(state, action)
}
