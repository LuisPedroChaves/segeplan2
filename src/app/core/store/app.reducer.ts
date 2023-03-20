import { ActionReducerMap } from '@ngrx/store';

import { DrawerReducer, DrawerState } from './reducers/drawer.reducer';
// import { SessionState, SessionReducer } from './reducers/session.reducer';


export interface AppState {
   drawer: DrawerState
  //  session: SessionState
}



export const appReducers: ActionReducerMap<AppState> = {
   drawer: DrawerReducer,
  //  session: SessionReducer
};
