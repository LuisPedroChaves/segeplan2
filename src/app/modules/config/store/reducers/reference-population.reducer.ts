import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { AppState } from 'src/app/core/store/app.reducer';
import { IReferencePopulation } from 'src/app/core/models/adicionales';

export interface ReferencePopulationState {
  referencePopulations: IReferencePopulation[],
  referencePopulation: IReferencePopulation
}

export interface referencePopulationstore extends AppState {
  referencePopulation: ReferencePopulationState
}

export const REFERENCE_POPULATION_STATE: ReferencePopulationState = {
  referencePopulations: [],
  referencePopulation: null!
}

const _REFERENCE_POPULATION_REDUCER = createReducer(REFERENCE_POPULATION_STATE,

  on(actions.SET_REFERENCE_POPULATIONS, (state, { referencePopulations }) => ({
    ...state,
    referencePopulations: [...referencePopulations],
  })),

  on(actions.SET_NEW_REFERENCE_POPULATION, (state, { referencePopulation }) => ({
    ...state,
    referencePopulations: [...state.referencePopulations, referencePopulation]
  })),

  on(actions.SET_REFERENCE_POPULATION, (state, { referencePopulation }) => ({
    ...state,
    referencePopulation: referencePopulation ? referencePopulation : null!
  })),

  on(actions.SET_EDIT_REFERENCE_POPULATION, (state, { referencePopulation }) => ({
    ...state,
    referencePopulations: state.referencePopulations.map(i => {

      if (i.codigo === referencePopulation.codigo) {
        return {
          ...referencePopulation
        }
      }

      return {
        ...i
      }

    })
  })),

  on(actions.REMOVE_REFERENCE_POPULATION, (state, { referencePopulation }) => ({
    ...state,
    referencePopulations: state.referencePopulations.filter(i => i.codigo !== referencePopulation.codigo)
  })),

)

export function ReferencePopulationReducer(state: ReferencePopulationState, action: any) {
  return _REFERENCE_POPULATION_REDUCER(state, action)
}
