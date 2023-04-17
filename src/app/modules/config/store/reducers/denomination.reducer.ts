import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { IDenomination } from 'src/app/core/models/configs/Denomination';
import { AppState } from 'src/app/core/store/app.reducer';

export interface DenominationState {
  denominations: IDenomination[],
  denomination: IDenomination
}

export interface DenominationStore extends AppState {
  denomination: DenominationState
}

export const DENOMINATION_STATE: DenominationState = {
  denominations: [],
  denomination: null!
}

const _DENOMINATION_REDUCER = createReducer(DENOMINATION_STATE,

  on(actions.SET_DENOMINATIONS, (state, { denominations }) => ({
    ...state,
    denominations: [...denominations],
  })),

  on(actions.SET_NEW_DENOMINATION, (state, { denomination }) => ({
    ...state,
    denominations: [...state.denominations, denomination]
  })),

  on(actions.SET_DENOMINATION, (state, { denomination }) => ({
    ...state,
    denomination: denomination ? denomination : null!
  })),

  on(actions.SET_EDIT_DENOMINATION, (state, { denomination }) => ({
    ...state,
    denominations: state.denominations.map(i => {

      if (i.codigo === denomination.codigo) {
        return {
          ...denomination
        }
      }

      return {
        ...i
      }

    })
  })),

  on(actions.REMOVE_DENOMINATION, (state, { denomination }) => ({
    ...state,
    denominations: state.denominations.filter(i => i.codigo !== denomination.codigo)
  })),

)

export function DenominationReducer(state: DenominationState, action: any) {
  return _DENOMINATION_REDUCER(state, action)
}
