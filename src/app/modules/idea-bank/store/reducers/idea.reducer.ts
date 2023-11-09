import { Action, createReducer, on } from '@ngrx/store';

import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';
import * as actions from '../actions';
import { IAlternativeResult } from 'src/app/core/models/informationGeneral/AlternativeResult';
import { AppState } from 'src/app/core/store/app.reducer';

export interface IdeaState {
  ideas: GeneralInformation[],
  sendIdeas: GeneralInformation[],
  doneIdeas: GeneralInformation[],
  resultIdeas: IAlternativeResult[],
  idea: GeneralInformation
}

export interface IdeaStore extends AppState {
  idea: IdeaState
}

export const IDEA_STATE: IdeaState = {
  ideas: [],
  sendIdeas: [],
  doneIdeas: [],
  resultIdeas: [],
  idea: null!
}

const _IDEA_REDUCER = createReducer(IDEA_STATE,
  on(actions.SET_IDEAS, (state, { ideas }) => ({
    ...state,
    ideas: [...ideas],
  })),
  on(actions.SET_SEND_IDEAS, (state, { ideas }) => ({
    ...state,
    sendIdeas: [...ideas],
  })),
  on(actions.SET_DONE_IDEAS, (state, { ideas }) => ({
    ...state,
    doneIdeas: [...ideas],
  })),
  on(actions.SET_RESULT_IDEAS, (state, { alternatives }) => ({
    ...state,
    resultIdeas: [...alternatives],
  })),
  on(actions.SET_NEW_IDEA, (state, { idea }) => ({
    ...state,
    ideas: [...state.ideas, idea],
    idea: { ...idea }
  })),
  on(actions.SET_IDEA, (state, { idea }) => ({
    ...state,
    idea: { ...idea }
  })),
  on(actions.SET_IDEA_ALTERNATIVES, (state, { alternatives }) => ({
    ...state,
    ideas: state.ideas.map(idea => {

      const ALTERNATIVE = alternatives[alternatives.length - 1];

      if (idea.codigo === ALTERNATIVE.sectionBIId) {
        return {
          ...idea,
          alternatives: [...alternatives]
        }
      }

      return {
        ...idea
      }

    }),
    idea: {
      ...state.idea,
      alternatives: [...alternatives]
    }
  })),
  on(actions.SET_SEND_IDEA_ALTERNATIVES, (state, { alternatives }) => ({
    ...state,
    sendIdeas: state.sendIdeas.map(idea => {

      const ALTERNATIVE = alternatives[alternatives.length - 1];

      if (idea.codigo === ALTERNATIVE.sectionBIId) {
        return {
          ...idea,
          alternatives: [...alternatives]
        }
      }

      return {
        ...idea
      }

    }),
    idea: {
      ...state.idea,
      alternatives: [...alternatives]
    }
  })),
  on(actions.SET_SEND_IDEA, (state, { idea }) => ({
    ...state,
    ideas: state.ideas.filter(i => {
      return i.codigo !== idea.codigo
    }),
    sendIdeas: [...state.sendIdeas, idea]
  })),
  on(actions.SET_DONE_IDEA, (state, { idea }) => ({
    ...state,
    sendIdeas: state.sendIdeas.filter(i => {
      return i.codigo !== idea.codigo
    }),
    doneIdeas: [...state.doneIdeas, idea]
  })),
)

export function IdeaReducer(state: IdeaState, action: Action) {
  return _IDEA_REDUCER(state, action)
}
