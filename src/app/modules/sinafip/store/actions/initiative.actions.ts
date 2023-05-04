import { createAction, props } from '@ngrx/store';
import { FiltroSinafip } from 'src/app/core/models/adicionales/filtro-sinafip';
import { Activity } from 'src/app/core/models/sinafip/activity';
import { IRequest } from 'src/app/core/models/sinafip/request';

export const READ_INITIATIVES = createAction(
  '[INICIATIVA] Leer iniciativas actuales',
  props<{ filtro: FiltroSinafip }>()
)

export const SET_INITIATIVES = createAction(
  '[INICIATIVA] Asignar iniciativas actuales',
  props<{ initiatives: IRequest[] }>()
)

export const CREATE_INITIATIVE = createAction(
  '[INICIATIVA], Crear nueva iniciativa',
  props<{ initiative: IRequest, payload: any }>()
)

export const SET_NEW_INITIATIVE = createAction(
  '[INICIATIVA], Asignar nueva inciativa',
  props<{ initiative: IRequest }>()
)

export const SET_INITIATIVE = createAction(
  '[INICIATIVA] Asignar iniciativa',
  props<{ initiative: IRequest }>()
)

export const UPDATE_INITIATIVE = createAction(
  '[INICIATIVA], Editar iniciativa',
  props<{ initiative: IRequest }>()
)

export const SET_EDIT_INITIATIVE = createAction(
  '[INICIATIVA], Asignar iniciativa editada',
  props<{ initiative: IRequest }>()
)

export const DELETE_INITIATIVE = createAction(
  '[INICIATIVA], Eliminar iniciativa',
  props<{ id: string }>()
)

export const REMOVE_INITIATIVE = createAction(
  '[INICIATIVA], Quitar iniciativa',
  props<{ initiative: IRequest }>()
)

// activity

export const SET_ACTIVITIES = createAction(
  '[ACTIVIDAD], Asignar actividades',
  props<{ activities: Activity[] }>()
)

export const SET_ACTIVITY = createAction(
  '[ACTIVIDAD], Asignar actividad',
  props<{ activity: Activity }>()
)

export const REMOVE_ACTIVITY = createAction(
  '[ACTIVIDAD] Remover actividad del listado',
  props<{ activity: Activity }>()
)

export const DELETE_ACTIVITIES = createAction(
  '[ACTIVIDAD] Eliminar listado de actividades'
)
