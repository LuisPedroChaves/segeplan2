import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, tap } from 'rxjs/operators';


import * as actions from '../actions';
import { SinafipService } from "../../../sinafip/services/sinafip.service";

@Injectable()
export class SectorAdvisedEffects {

  constructor(
    private sinafipService: SinafipService,
    private actions$: Actions,
  ) { }


  readSectorsAdvised = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_SECTORSADVISED),
        mergeMap(
          () => this.sinafipService.getSectorAdvised()
            .pipe(
              tap((sectorsAdvised) => console.log(sectorsAdvised)
              ),
              map(sectorsAdvised => {
                return actions.SET_SECTORSADVISED({ sectorsAdvised })
              })
            )
        )
      )
  )
}
