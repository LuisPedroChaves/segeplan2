import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, tap } from 'rxjs/operators';
import * as actions from '../actions';
import { SinafipService } from "../../services/sinafip.service";

@Injectable()
export class InitiativeEffects {

  constructor(
    private sinafipService: SinafipService,
    private actions$: Actions,
  ) { }

  read = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_INITIATIVES),
        mergeMap(
          (filtro) => this.sinafipService.getAllRequest(filtro.filtro)
            .pipe(
              map(initiatives => actions.SET_INITIATIVES({ initiatives }))
            )
        ),
      )
  )

  create = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.CREATE_INITIATIVE),
        mergeMap(
          ({ initiative, payload }) => this.sinafipService.createRequest(initiative, payload)
            .pipe(
              map(initiative => actions.SET_NEW_INITIATIVE({ initiative }))
            )
        ),
      )
  )

  update = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.UPDATE_INITIATIVE),
        mergeMap(
          ({ initiative }) => this.sinafipService.updateStatus(initiative.status, initiative.id) // TODO: Actualizar por endpoint para editar toda la solicitud
            .pipe(
              map(initiative => actions.SET_EDIT_INITIATIVE({ initiative }))
            )
        ),
      )
  )

}
