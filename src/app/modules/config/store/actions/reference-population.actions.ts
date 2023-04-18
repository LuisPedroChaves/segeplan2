import { createAction, props } from '@ngrx/store';
import { IReferencePopulation } from 'src/app/core/models/adicionales';

export const READ_REFERENCE_POPULATIONS = createAction(
  '[REFERENCE_POPULATION], Leer poblaciones'
)

export const SET_REFERENCE_POPULATIONS = createAction(
  '[REFERENCE_POPULATION], Asignar poblaciones',
  props<{ referencePopulations: IReferencePopulation[] }>()
)

export const CREATE_REFERENCE_POPULATION = createAction(
  '[REFERENCE_POPULATION], Crear nueva población',
  props<{ referencePopulation: IReferencePopulation }>()
)

export const SET_NEW_REFERENCE_POPULATION = createAction(
  '[REFERENCE_POPULATION], Asignar nueva población',
  props<{ referencePopulation: IReferencePopulation }>()
)

export const SET_REFERENCE_POPULATION = createAction(
  '[REFERENCE_POPULATION] Asignar población',
  props<{ referencePopulation: IReferencePopulation }>()
)

export const UPDATE_REFERENCE_POPULATION = createAction(
  '[REFERENCE_POPULATION], Editar población',
  props<{ referencePopulation: IReferencePopulation }>()
)

export const SET_EDIT_REFERENCE_POPULATION = createAction(
  '[REFERENCE_POPULATION], Asignar población editada',
  props<{ referencePopulation: IReferencePopulation }>()
)

export const DELETE_REFERENCE_POPULATION = createAction(
  '[REFERENCE_POPULATION], Eliminar población',
  props<{ idReferencePopulation: string }>()
)

export const REMOVE_REFERENCE_POPULATION = createAction(
  '[REFERENCE_POPULATION], Quitar población',
  props<{ referencePopulation: IReferencePopulation }>()
)
