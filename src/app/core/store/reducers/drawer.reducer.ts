import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions';
import { AppState } from '../app.reducer';

export interface DrawerState {
  menuDrawer: boolean,
  drawer1: boolean,
  width1: string,
  component1: string,
  drawer2: boolean,
  width2: string,
  component2: string,
  drawer3: boolean,
  width3: string,
  component3: string
}

export interface DrawerStore extends AppState {
  drawer: DrawerState
}

export const DRAWER_STATE: DrawerState = {
  menuDrawer: true,
  drawer1: false,
  width1: '90%',
  component1: '',
  drawer2: false,
  width2: '60%',
  component2: '',
  drawer3: false,
  width3: '30%',
  component3: '',
}

const _DRAWER_REDUCER = createReducer(DRAWER_STATE,

  on(actions.CHANGE_MENU_DRAWER, (state) => ({
    ...state, menuDrawer:
      !state.menuDrawer
  })),

  on(actions.OPEN_DRAWER1, (state, { width1, component1 }) => ({
    ...state,
    drawer1: true,
    width1,
    component1
  })),

  on(actions.CLOSE_DRAWER1, (state) => ({
    ...state,
    drawer1: false,
    width1: '90%',
    component1: ''
  })),

  on(actions.OPEN_DRAWER2, (state, { width2, component2 }) => ({
    ...state,
    drawer2: true,
    width2,
    component2
  })),

  on(actions.CLOSE_DRAWER2, (state) => ({
    ...state,
    drawer2: false,
    width2: '60%',
    component2: ''
  })),

)

export function DrawerReducer(state: any, action: any) {
  return _DRAWER_REDUCER(state, action)
}
