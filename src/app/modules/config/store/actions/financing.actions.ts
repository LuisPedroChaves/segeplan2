import { createAction, props } from '@ngrx/store';
import { IFinancing } from 'src/app/core/models/configs/financing';

export const READ_FINANCINGS = createAction(
  '[FINANCING], Leer financiamientos'
)

export const SET_FINANCINGS = createAction(
  '[FINANCING], Asignar financiamientos',
  props<{ financings: IFinancing[] }>()
)

export const CREATE_FINANCING = createAction(
  '[FINANCING], Crear nueva financiamiento',
  props<{ financing: IFinancing }>()
)

export const SET_NEW_FINANCING = createAction(
  '[FINANCING], Asignar nueva financiamiento',
  props<{ financing: IFinancing }>()
)

export const SET_FINANCING = createAction(
  '[FINANCING] Asignar financiamiento',
  props<{ financing: IFinancing }>()
)

export const UPDATE_FINANCING = createAction(
  '[FINANCING], Editar financiamiento',
  props<{ financing: IFinancing }>()
)

export const SET_EDIT_FINANCING = createAction(
  '[financing], Asignar financiamiento editada',
  props<{ financing: IFinancing }>()
)

export const DELETE_FINANCING = createAction(
  '[FINANCING], Eliminar financiamiento',
  props<{ idfinancing: string }>()
)

export const REMOVE_FINANCING = createAction(
  '[FINANCING], Quitar financiamiento',
  props<{ financing: IFinancing }>()
)
