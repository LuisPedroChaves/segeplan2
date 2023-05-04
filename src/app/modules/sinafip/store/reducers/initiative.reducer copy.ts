import { Action, createReducer, on } from '@ngrx/store';
import { IRequest } from 'src/app/core/models/sinafip/request';
import { Activity } from 'src/app/core/models/sinafip/activity';
import { AppState } from 'src/app/core/store/app.reducer';
import * as actions from '../actions'

export interface InitiativeState {
  initiatives: IRequest[],
  initiative: IRequest,
  activities: Activity[]
}

export interface InitiativeStore extends AppState {
  initiative: InitiativeState
}

export const INITIATIVE_STATE: InitiativeState = {
  initiatives: [],
  initiative: null!,
  activities: []
}

const _INITIATIVE_REDUCER = createReducer(INITIATIVE_STATE,

  // initiative

  on(actions.SET_INITIATIVES, (state, { initiatives }) => ({
    ...state,
    initiatives: [...initiatives],
  })),

  on(actions.SET_NEW_INITIATIVE, (state, { initiative }) => ({
    ...state,
    initiatives: [initiative, ...state.initiatives]
  })),

  on(actions.SET_INITIATIVE, (state, { initiative }) => ({
    ...state,
    initiative: initiative ? initiative : null!
  })),

  on(actions.SET_EDIT_INITIATIVE, (state, { initiative }) => ({
    ...state,
    initiatives: state.initiatives.map(c => {

      if (c.id === initiative.id) {
        return {
          ...initiative
        }
      }

      return {
        ...c
      }

    })
  })),

  on(actions.REMOVE_INITIATIVE, (state, { initiative }) => ({
    ...state,
    initiatives: state.initiatives.filter(c => c.id !== initiative.id)
  })),

  // activity

  on(actions.SET_ACTIVITIES, (state, { activities }) => ({
    ...state,
    activities: [...activities]
  })),

  on(actions.SET_ACTIVITY, (state, { activity }) => ({
    ...state,
    activities: [...state.activities, activity]
  })),

  on(actions.REMOVE_ACTIVITY, (state, { activity }) => ({
    ...state,
    activities: state.activities.filter(item => item.id !== activity.id)
  })),

  on(actions.DELETE_ACTIVITIES, (state) => ({
    ...state,
    activities: []
  })),

)

export function InitiativeReducer(state: InitiativeState, action: Action) {
  return _INITIATIVE_REDUCER(state, action)
}
