import { createAction, props } from '@ngrx/store';
import { Entity } from 'src/app/core/models/sinafip/entity';


export const READ_ENTITIES = createAction(
	'[ENTITIES] Leer entities',
  // props<{ entities: Entity }>()
);

export const SET_ENTITIES = createAction(
	'[ENTITIES] Asignar entities',
	props<{ entities: Entity[] }>()
)
