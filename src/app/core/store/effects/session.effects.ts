import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { LOGIN, SET_SESSION } from '../actions/session.actions';
import { throwError } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class SessionEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) { }

  loginEffect$ = createEffect(() => this.actions$.pipe(
    ofType(LOGIN),
    mergeMap(({ username, password }) => this.authService.login(username, password).pipe(
      map(data => {
        localStorage.setItem('segeplan-session', JSON.stringify(data));
        return SET_SESSION({ session: data });
      })
    ))
  ));
}
