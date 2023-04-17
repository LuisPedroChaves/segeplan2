import { createAction, props } from '@ngrx/store';
import { IDenomination } from '../../../../core/models/configs/Denomination';

export const READ_DENOMINATIONS = createAction(
  '[DENOMINATION], Leer denominaciones'
)

export const SET_DENOMINATIONS = createAction(
  '[DENOMINATION], Asignar denominaciones',
  props<{ denominations: IDenomination[] }>()
)

export const CREATE_DENOMINATION = createAction(
  '[DENOMINATION], Crear nueva denominación',
  props<{ denomination: IDenomination }>()
)

export const SET_NEW_DENOMINATION = createAction(
  '[DENOMINATION], Asignar nueva denominación',
  props<{ denomination: IDenomination }>()
)

export const SET_DENOMINATION = createAction(
  '[DENOMINATION] Asignar denominación',
  props<{ denomination: IDenomination }>()
)

export const UPDATE_DENOMINATION = createAction(
  '[DENOMINATION], Editar denominación',
  props<{ denomination: IDenomination }>()
)

export const SET_EDIT_DENOMINATION = createAction(
  '[DENOMINATION], Asignar denominación editada',
  props<{ denomination: IDenomination }>()
)

export const DELETE_DENOMINATION = createAction(
  '[DENOMINATION], Eliminar denominación',
  props<{ idDenomination: string }>()
)

export const REMOVE_DENOMINATION = createAction(
  '[DENOMINATION], Quitar denominación',
  props<{ denomination: IDenomination }>()
)
