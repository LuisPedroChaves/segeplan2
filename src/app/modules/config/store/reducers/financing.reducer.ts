import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { AppState } from 'src/app/core/store/app.reducer';
import { IFinancing } from 'src/app/core/models/configs/financing';

export interface FinancingState {
  financings: IFinancing[],
  financing: IFinancing
}

export interface FinancingStore extends AppState {
  financing: FinancingState
}

export const FINANCING_STATE: FinancingState = {
  financings: [],
  financing: null!
}

const _FINANCING_REDUCER = createReducer(FINANCING_STATE,

  on(actions.SET_FINANCINGS, (state, { financings }) => ({
    ...state,
    financings: [...financings],
  })),

  on(actions.SET_NEW_FINANCING, (state, { financing }) => ({
    ...state,
    financings: [...state.financings, financing]
  })),

  on(actions.SET_FINANCING, (state, { financing }) => ({
    ...state,
    financing: financing ? financing : null!
  })),

  on(actions.SET_EDIT_FINANCING, (state, { financing }) => ({
    ...state,
    financings: state.financings.map(i => {

      if (i.id === financing.id) {
        return {
          ...financing
        }
      }

      return {
        ...i
      }

    })
  })),

  on(actions.REMOVE_FINANCING, (state, { financing }) => ({
    ...state,
    financings: state.financings.filter(i => i.id !== financing.id)
  })),

)

export function FinancingReducer(state: FinancingState, action: any) {
  return _FINANCING_REDUCER(state, action)
}
