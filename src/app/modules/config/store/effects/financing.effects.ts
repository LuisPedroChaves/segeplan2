import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from 'rxjs/operators';

import * as actions from '../actions'
import { FinancingService } from "../../services/financing.service";


@Injectable()
export class FinancingEffects {

  constructor(
    private actions$: Actions,
    private financingService: FinancingService
  ) { }


  read = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_FINANCINGS),
        mergeMap(
          () => this.financingService.read()
            .pipe(
              map(financings => actions.SET_FINANCINGS({ financings }))
            )
        ),
      )
  )

  create = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.CREATE_FINANCING),
        mergeMap(
          ({ financing }) => this.financingService.create(financing)
            .pipe(
              map(financing => actions.SET_NEW_FINANCING({ financing }))
            )
        ),
      )
  )

  update = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.UPDATE_FINANCING),
        mergeMap(
          ({ financing }) => this.financingService.update(financing)
            .pipe(
              map(financing => actions.SET_EDIT_FINANCING({ financing }))
            )
        ),
      )
  )

  delete = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.DELETE_FINANCING),
        mergeMap(
          ({ idfinancing }) => this.financingService.delete(idfinancing)
            .pipe(
              map(financing => actions.REMOVE_FINANCING({ financing }))
            )
        ),
      )
  )
}
