import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, map, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/env/environment.prod';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class IntegrationsService {
  private API_URL = environment.root;
  private urlIntegrations = 'api/integrations/';

  constructor(
    private http: HttpClient,
    private snackBarService: SnackBarService
  ) { }

  getGeograficos(): Observable<any> {
    const url = this.API_URL + this.urlIntegrations + 'geograficos';
    let snackBarRef = this.snackBarService.loading()

    return this.http.get(url).pipe(
      finalize(() => snackBarRef.dismiss()),
      map((res: any) => {
        return res.data;
      }),
      catchError((err, caught) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
        return throwError(() => new Error('err'));
      }),
    );
  }

  getProcesos(): Observable<any> {
    const url = this.API_URL + this.urlIntegrations + 'procesos';
    let snackBarRef = this.snackBarService.loading()

    return this.http.get(url).pipe(
      finalize(() => snackBarRef.dismiss()),
      map((res: any) => {
        return res.data;
      }),
      catchError((err, caught) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
        return throwError(() => new Error('err'));
      }),
    );
  }

  getObjetos(): Observable<any> {
    const url = this.API_URL + this.urlIntegrations + 'objetos';
    let snackBarRef = this.snackBarService.loading()

    return this.http.get(url).pipe(
      finalize(() => snackBarRef.dismiss()),
      map((res: any) => {
        return res.data;
      }),
      catchError((err, caught) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
        return throwError(() => new Error('err'));
      }),
    );
  }

  getProductos(idEntidad: string): Observable<any> {
    const url = this.API_URL + this.urlIntegrations + `productos?idEntidad=${idEntidad}`;
    let snackBarRef = this.snackBarService.loading()

    return this.http.get(url).pipe(
      finalize(() => snackBarRef.dismiss()),
      map((res: any) => {
        return res.data;
      }),
      catchError((err, caught) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
        return throwError(() => new Error('err'));
      }),
    );
  }

  getTypeProjects(): Observable<any> {
    const url = this.API_URL + 'api/sinafip/type-projects';
    let snackBarRef = this.snackBarService.loading()

    return this.http.get(url).pipe(
      finalize(() => snackBarRef.dismiss()),
      map((res: any) => {
        return res.data;
      }),
      catchError((err, caught) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
        return throwError(() => new Error('err'));
      }),
    );
  }
}
