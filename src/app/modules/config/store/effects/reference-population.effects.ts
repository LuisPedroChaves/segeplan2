import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, tap } from 'rxjs/operators';
import * as actions from '../actions'
import { ReferencePopulationService } from "../../services/reference-population.service";


@Injectable()
export class ReferencePopulationEffects {

  constructor(
    private actions$: Actions,
    private referencePopulationService: ReferencePopulationService
  ) { }


  read = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_REFERENCE_POPULATIONS),
        mergeMap(
          () => this.referencePopulationService.read()
            .pipe(
              map(referencePopulations => actions.SET_REFERENCE_POPULATIONS({ referencePopulations }))
            )
        ),
      )
  )

  create = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.CREATE_REFERENCE_POPULATION),
        mergeMap(
          ({ referencePopulation }) => this.referencePopulationService.create(referencePopulation)
            .pipe(
              map(referencePopulation => actions.SET_NEW_REFERENCE_POPULATION({ referencePopulation }))
            )
        ),
      )
  )

  update = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.UPDATE_REFERENCE_POPULATION),
        mergeMap(
          ({ referencePopulation }) => this.referencePopulationService.update(referencePopulation)
            .pipe(
              map(referencePopulation => actions.SET_EDIT_REFERENCE_POPULATION({ referencePopulation }))
            )
        ),
      )
  )

  delete = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.DELETE_REFERENCE_POPULATION),
        mergeMap(
          ({ idReferencePopulation }) => this.referencePopulationService.delete(idReferencePopulation)
            .pipe(
              map(referencePopulation => actions.REMOVE_REFERENCE_POPULATION({ referencePopulation }))
            )
        ),
      )
  )
}
