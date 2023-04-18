import { ActionReducerMap } from '@ngrx/store';

import { DrawerReducer, DrawerState } from './reducers/drawer.reducer';
import { SessionState, SessionReducer } from './reducers/session.reducer';
import { ProductReducer, ProductState } from './reducers';


export interface AppState {
   drawer: DrawerState
   session: SessionState,
   product: ProductState
}



export const appReducers: ActionReducerMap<AppState> = {
   drawer: DrawerReducer,
   session: SessionReducer,
   product: ProductReducer
};
