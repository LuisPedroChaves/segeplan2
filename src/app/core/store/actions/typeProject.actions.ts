import { createAction, props } from '@ngrx/store';
import { ITypeProject } from '../../models/adicionales/typeProject';


export const READ_TYPEPROJECTS = createAction(
	'[TYPEPROJECTS] Leer typeProjects',
	props<{ filtro: string }>()
);

export const SET_TYPEPROJECTS = createAction(
	'[TYPEPROJECTS] Asignar typeProjects',
	props<{ typeProjects: ITypeProject[] }>()
)
