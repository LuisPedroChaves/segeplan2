import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from 'rxjs/operators';


import * as actions from '../actions';
import { IdeaService } from "../../services/idea.service";
import { OPEN_DRAWER1 } from '../../../../core/store/actions/drawer.actions';

@Injectable()
export class IdeaEffects {

  constructor(
    private ideaService: IdeaService,
    private actions$: Actions,
  ) { }

  readIdeas = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_IDEAS),
        //TODO: AGREGAR A LOS FILTROS EL ID DE LA INSTITUCION CUANDO SE TENGA EL LOGIN
        mergeMap(
          (filtro) => this.ideaService.getIdeas(filtro.filtro)
            .pipe(
              map(ideas => actions.SET_IDEAS({ ideas }))
            )
        )
      )
  )

  readSendIdeas = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_SEND_IDEAS),
        mergeMap(
          (filtro) => this.ideaService.getIdeas(filtro.filtro)
            .pipe(
              map(ideas => actions.SET_SEND_IDEAS({ ideas }))
            )
        )
      )
  )

  readDoneIdeas = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_DONE_IDEAS),
        mergeMap(
          (filtro) => this.ideaService.getIdeas(filtro.filtro)
            .pipe(
              map(ideas => actions.SET_DONE_IDEAS({ ideas }))
            )
        )
      )
  )

  readResultIdeas = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_RESULT_IDEAS),
        mergeMap(
          (filtro) => this.ideaService.getResults(filtro.filtro)
            .pipe(
              map(alternatives => actions.SET_RESULT_IDEAS({ alternatives }))
            )
        )
      )
  )

  createIdea = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.CREATE_IDEA),
        mergeMap(
          ({ idea, viewDetails }) => this.ideaService.sendGeneralInformation(idea)
            .pipe(
              map(idea => actions.SET_NEW_IDEA({ idea, viewDetails }))
            )
        )
      )
  )

  updateCreatedIdea = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.UPDATE_CREATED_IDEA),
        mergeMap(
          ({ idea }) => this.ideaService.submitToQualify(idea.codigo) // Enviar para Calificar,
            .pipe(
              map(idea2 => actions.SET_SEND_IDEA({ idea }))
            )
        )
      )
  )

  updateSendIdea = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.UPDATE_SEND_IDEA),
        mergeMap(
          ({ idea }) => this.ideaService.qualifiedIdea(idea.codigo) // Enviar para Calificar,
            .pipe(
              map(idea2 => actions.SET_DONE_IDEA({ idea }))
            )
        )
      )
  )

}
