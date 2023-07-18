import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';

import * as actions from '../actions';
import { ChekProjectService } from 'src/app/modules/check-project/services/chek-project.service';

@Injectable()
export class CheckProjectEffects {
  constructor(
    private checkProjectService: ChekProjectService,
    private actions$: Actions
  ) {}

  readProjects = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.READ_CHECK_PROJECTS),
      mergeMap(({ filtros }) =>
        this.checkProjectService
          .getAllProjects(filtros)
          .pipe(
            map((checkProjects) =>
              actions.SET_CHECK_PROJECTS({ checkProjects })
            )
          )
      )
    )
  );

  createProject = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.CREATE_CHECK_PROJECT),
      mergeMap(({ checkProject }) =>
        this.checkProjectService
          .createProject(checkProject)
          .pipe(
            map((checkProject) =>
              actions.SET_NEW_CHECK_PROJECT({ checkProject })
            )
          )
      )
    )
  );

  // TODO: falta endpoint para editar proyecto
  // editProject = createEffect(
  //   () => this.actions$
  //     .pipe(
  //       ofType(actions.UPDATE_PROJECT),
  //       mergeMap(
  //         ({ checkProject }) => this.checkProjectService.create(checkProject)
  //           .pipe(
  //             map(checkProject => actions.SET_NEW_CHECK_PROJECT({ checkProject }))
  //           )
  //       )
  //     )
  // )

  editProject = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.DELETE_PROJECT),
      mergeMap(({ id }) =>
        this.checkProjectService
          .delete(id)
          .pipe(map((resp) => actions.REMOVE_PROJECT({ id })))
      )
    )
  );
}
