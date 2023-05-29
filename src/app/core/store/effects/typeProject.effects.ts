import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from 'rxjs/operators';


import * as actions from '../actions';
import { IntegrationsService } from "../../services/integrations.service";
import { ITypeProject } from "../../models/adicionales/typeProject";

@Injectable()
export class TypeProjectEffects {

  constructor(
    private integrationsService: IntegrationsService,
    private actions$: Actions,
  ) { }


  readTypeProjects = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_TYPEPROJECTS),
        mergeMap(
          () => this.integrationsService.getTypeProjects()
            .pipe(
              map((typeProjects:ITypeProject[]) => {
                console.log(typeProjects)
                return actions.SET_TYPEPROJECTS({ typeProjects }
                )})
            )
        )
      )
  )
}
