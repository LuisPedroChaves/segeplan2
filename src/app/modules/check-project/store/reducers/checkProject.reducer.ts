import { Action, createReducer, on } from '@ngrx/store';
import { ITrack } from 'src/app/core/models/seguimiento/progress';
import { IProject } from 'src/app/core/models/seguimiento/project';
import * as actions from '../actions';
import { AppState } from 'src/app/core/store/app.reducer';


export interface CheckProjectState {
  isMinistry: boolean,
  projects: IProject[],
  project: IProject,
  track: ITrack
}

export interface CheckProjectStore extends AppState {
  checkProject: CheckProjectState
}

export const CHECK_PROJECT_STATE: CheckProjectState = {
  isMinistry: false,
  projects: [],
  project: null!,
  track: null
}

const _CHECK_REDUCER_REDUCER = createReducer(CHECK_PROJECT_STATE,

  on(actions.CHANGE_IS_MINISTRY, (state, { isMinistry }) => ({
    ...state,
    isMinistry,
  })),

  on(actions.SET_CHECK_PROJECTS, (state, { checkProjects }) => ({
    ...state,
    projects: [...checkProjects]
  })),

  on(actions.SET_NEW_CHECK_PROJECT, (state, { checkProject }) => ({
    ...state,
    projects: [...state.projects, checkProject],
    project: { ...checkProject }
  })),

  on(actions.SET_PROJECT, (state, { checkProject }) => ({
    ...state,
    project: checkProject ? { ...checkProject } : null
  })),

  on(actions.SET_TRACKING, (state, { tracking }) => ({
    ...state,
    project: { ...state.project, tracking: [...tracking] }
  })),

  on(actions.SET_EDIT_PROJECT, (state, { checkProject }) => ({
    ...state,
    projects: state.projects.map(p => {
      console.log("🚀 ~ file: checkProject.reducer.ts:69 ~ on ~ checkProject:", checkProject)
      console.log("🚀 ~ file: checkProject.reducer.ts:69 ~ on ~ p:", p)
      if (p.id === checkProject.id) {
        return {
          ...checkProject
        }
      }

      return {
        ...p
      }

    })
  })),


  on(actions.REMOVE_PROJECT, (state, { id }) => ({
    ...state,
    projects: state.projects.filter(p => p.id !== id)
  })),

  // track
  on(actions.SET_TRACK, (state, { track }) => ({
    ...state,
    track: track ? { ...track } : null
  })),

  on(actions.REMOVE_TRACK, (state, { id }) => (
    {
      ...state,
      projects: state.projects.map(project => {
        // Filtramos los objetos de "tracking" para eliminar el que tiene el id específico
        const updatedTracking = project.tracking.filter(tracking => tracking.id !== id);
        // Retornamos el objeto de "projects" con el array de "tracking" actualizado
        return { ...project, tracking: updatedTracking };
      }),
      project: { ...state.project, tracking: state.project.tracking.filter(tracking => tracking.id !== id) }
    })),
)

export function CheckProjectReducer(state: CheckProjectState, action: Action) {
  return _CHECK_REDUCER_REDUCER(state, action)
}
