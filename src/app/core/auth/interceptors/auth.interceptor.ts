import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, switchMap, throwError } from 'rxjs'
import * as buffer from 'buffer';;
import { AuthService } from '../services/auth.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { ISession } from '../../models/adicionales';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBarService: SnackBarService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const SESSION = this.authService.getSession()
    const TOKEN = SESSION ? SESSION.token : null
    const RENEWING_TOKEN = SESSION ? SESSION.renewingToken : false

    // Si el token está próximo a expirar o ya ha expirado, obtener un nuevo token
    // Y si la request no esta renovando el token
    if (TOKEN && !RENEWING_TOKEN) {

      const BASE64_TOKEN = TOKEN.split('.')[1];
      const STRING_TOKEN = buffer.Buffer.from(BASE64_TOKEN, 'base64').toString()
      const EXP_DATE = JSON.parse(STRING_TOKEN).exp

      // se convierte la fecha de expiración a fecha
      const EXP_TOKEN = new Date(EXP_DATE * 1000);

      const NOW = new Date();
      // acá debemos colocar el 75% del tiempo que tarda el token en vencer
      // esto sirve para renovar el token antes de vencer, siempre y cuando el usuario este utilizando el sistema.
      // formula: horas * 60 * 60 * 1000
      NOW.setTime(NOW.getTime() + (3 * 60 * 60 * 1000));

      if (EXP_TOKEN.getTime() <= NOW.getTime()) {
        // se renueva el token
        SESSION.renewingToken = true
        localStorage.setItem('segeplan-session', JSON.stringify(SESSION));
        return this.handleRefreshToken(request, next, SESSION)
      }

    }

    // El token actual es válido, continuar con la solicitud saliente
    const TOKEN_REQUEST = this.addTokenAuthrization(request, TOKEN)

    return next.handle(TOKEN_REQUEST)
      .pipe(
        catchError(err => {

          if (err.status === 401) {
            this.router.navigate(['/session']);
            localStorage.removeItem('segeplan-session');
            this.snackBarService.show('DANGER', err.error.error ? err.error.error : err.statusText, 5000)
            return throwError(() => new Error(err));
          }

          this.snackBarService.show('DANGER', err.error.error ? err.error.error : err.message, 5000)
          return throwError(() => new Error(err.error))
        })
      );


  }

  handleRefreshToken(request: HttpRequest<unknown>, next: HttpHandler, session: ISession) {

    return this.authService.refreshToken()
      .pipe(
        switchMap((resp: any) => {

          const NEW_TOKEN = resp['token'];

          session.token = NEW_TOKEN;
          session.renewingToken = false
          localStorage.setItem('segeplan-session', JSON.stringify(session));

          return next.handle(this.addTokenAuthrization(request, NEW_TOKEN))

        }),
        catchError(err => {
          this.router.navigate(['/session']);
          localStorage.removeItem('segeplan-session');
          return throwError(() => new Error(err));
        })
      )

  }

  addTokenAuthrization(request: HttpRequest<unknown>, token: string) {

    if (token) {
      return request.clone({ headers: request.headers.set('Content-Type', 'application/json').set('Authorization', `Bearer ${token}`) })
    }

    return request
  }
}
