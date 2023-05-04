import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { Entity } from 'src/app/core/models/sinafip';
import { AppState } from 'src/app/core/store/app.reducer';

export interface EntityState {
    entities: Entity[],
}

export interface EntityStore extends AppState {
    entity: EntityState
}

export const ENTITY_STATE: EntityState = {
    entities: [],
}

const _ENTITY_REDUCER = createReducer(ENTITY_STATE,
  on(actions.SET_ENTITIES, (state, { entities: entities }) => ({
    ...state,
    entities: [...entities],
})),
)

export function EntityReducer(state: EntityState, action: any) {
    return _ENTITY_REDUCER(state, action)
}
