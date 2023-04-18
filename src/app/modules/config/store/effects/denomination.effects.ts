import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from 'rxjs/operators';

import * as actions from '../actions'
import { DenominationService } from '../../services/denomination.service';


@Injectable()
export class DenominationsEffects {

  constructor(
    private actions$: Actions,
    private denominationService: DenominationService
  ) { }


  read = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_DENOMINATIONS),
        mergeMap(
          () => this.denominationService.read()
            .pipe(
              map(denominations => actions.SET_DENOMINATIONS({ denominations }))
            )
        ),
      )
  )

  create = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.CREATE_DENOMINATION),
        mergeMap(
          ({ denomination }) => this.denominationService.create(denomination)
            .pipe(
              map(denomination => actions.SET_NEW_DENOMINATION({ denomination }))
            )
        ),
      )
  )

  update = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.UPDATE_DENOMINATION),
        mergeMap(
          ({ denomination }) => this.denominationService.update(denomination)
            .pipe(
              map(denomination => actions.SET_EDIT_DENOMINATION({ denomination }))
            )
        ),
      )
  )

  delete = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.DELETE_DENOMINATION),
        mergeMap(
          ({ idDenomination }) => this.denominationService.delete(idDenomination)
            .pipe(
              map(denomination => actions.REMOVE_DENOMINATION({ denomination }))
            )
        ),
      )
  )
}
