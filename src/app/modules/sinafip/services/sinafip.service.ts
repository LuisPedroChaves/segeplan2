import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, map, throwError } from 'rxjs';
import { FiltroSinafip } from 'src/app/core/models/adicionales/filtro-sinafip';
import { AdmissionQuanty, IPriorizationMatrix, IRequest } from 'src/app/core/models/sinafip';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { UploadService } from 'src/app/core/services/upload.service';
import { environment } from 'src/env/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SinafipService {
  private API_URL = environment.root;
  private url = 'api/sinafip/';

  constructor(
    private http: HttpClient,
    private uploadService: UploadService,
    private snackBarService: SnackBarService
  ) { }

  getAllRequest(filtros?: FiltroSinafip): Observable<IRequest[]> {
    const url = this.API_URL + this.url + 'request/get-all';
    let snackBarRef = this.snackBarService.loading()

    if (filtros) {
      console.log(filtros);
      const httpParams = new HttpParams({ fromObject: { ...filtros } });


      return this.http.get(url, { params: httpParams }).pipe(
        finalize(() => snackBarRef.dismiss()),
        map((res: any) => res.data),
        catchError((err, caught) => {
          this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
          return throwError(() => new Error('err'));
        })
      )

    } else {
      return this.http.get(url).pipe(
        finalize(() => snackBarRef.dismiss()),
        map((res: any) => {
          return res.data;
        }),
        catchError((err, caught) => {
          this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
          return throwError(() => new Error('err'));
        })
      );
    }

  }

  getEntities(): Observable<any> {
    const url = this.API_URL + this.url + 'entities';

    let snackBarRef = this.snackBarService.loading()

    return this.http.get(url).pipe(
      finalize(() => snackBarRef.dismiss()),
      map((res: any) => {
        return res;
      }),
      catchError((err, caught) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
        return throwError(() => new Error('err'));
      }),
    );
  }

  getProjectFunction(): Observable<any> {
    const url = this.API_URL + this.url + 'project-function';

    let snackBarRef = this.snackBarService.loading()

    return this.http.get(url).pipe(
      finalize(() => snackBarRef.dismiss()),
      map((res: any) => {
        return res;
      }),
      catchError((err, caught) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
        return throwError(() => new Error('err'));
      }),
    );
  }

  getGeneralStudies(): Observable<any> {
    const url = this.API_URL + this.url + 'general-studies';

    let snackBarRef = this.snackBarService.loading()

    return this.http.get(url).pipe(
      finalize(() => snackBarRef.dismiss()),
      map((res: any) => {
        return res;
      }),
      catchError((err, caught) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
        return throwError(() => new Error('err'));
      }),
    );
  }

  getPreinvDocument(): Observable<any> {
    const url = this.API_URL + this.url + 'preinv-document';

    let snackBarRef = this.snackBarService.loading()

    return this.http.get(url).pipe(
      finalize(() => snackBarRef.dismiss()),
      map((res: any) => {
        return res;
      }),
      catchError((err, caught) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
        return throwError(() => new Error('err'));
      }),
    );
  }

  getModalityFinancing(): Observable<any> {
    const url = this.API_URL + this.url + 'modality-financing';

    let snackBarRef = this.snackBarService.loading()

    return this.http.get(url).pipe(
      finalize(() => snackBarRef.dismiss()),
      map((res: any) => {
        return res;
      }),
      catchError((err, caught) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
        return throwError(() => new Error('err'));
      }),
    );
  }


  getSectorAdvised(): Observable<any> {
    const url = this.API_URL + this.url + 'sector-adb';

    let snackBarRef = this.snackBarService.loading()

    return this.http.get(url).pipe(
      finalize(() => snackBarRef.dismiss()),
      map((res: any) => res),
      catchError((err, caught) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
        return throwError(() => new Error('err'));
      }),
    );
  }

  // http://localhost:3000/api/sinafip/request/denied/:idSolicitud
  //status pueden ser:  ['reception', 'analysis', 'denied'];
  updateStatus(status: string, idSolicitud: string): Observable<IRequest> {
    const url = `${this.API_URL}${this.url}request/${status}/${idSolicitud}`;

    let snackBarRef = this.snackBarService.loading()

    return this.http.put(url, '').pipe(
      map((res: any) => {
        this.snackBarService.show('SUCCESS', 'Iniciativa actualizada con éxito', 3000)
        return res.solicitud;
      }),
      catchError((err, caught) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
        return throwError(() => new Error('err'));
      }),
    );
  }

  createRequest(request: IRequest, payload: any): Observable<IRequest> {
    const url = this.API_URL + this.url + 'request/new';

    let snackBarRef = this.snackBarService.loading()

    return this.http.post(url, request).pipe(
      map((res: any) => {

        this.snackBarService.show('SUCCESS', 'Iniciativa creada con éxito', 3000)

        if (payload.documentProject && payload.documentProject.files) {
          this.uploadService.uploadFile(payload.documentProject.files[0], 'projectDocument', res.request.institution.id).then();
        }

        if (payload.tdr && payload.tdr.files) {
          this.uploadService.uploadFile(payload.tdr.files[0], 'tdr', res.request.requirementsDocuments.id).then();
        }

        if (payload.scheduleActiv && payload.scheduleActiv.files) {
          this.uploadService.uploadFile(payload.scheduleActiv.files[0], 'schedule', res.request.requirementsDocuments.id).then();
        }

        return res.request;
      }),
      catchError((err, caught) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
        return throwError(() => new Error('err'));
      }),
    )
  }

  saveRequestAdmission(idSolicitud: string, matrices: { admissionQuanty: AdmissionQuanty, priorizationMatrix?: IPriorizationMatrix }): Observable<IRequest> {
    const url = `${this.API_URL}${this.url}request/admission/${idSolicitud}`;

    let snackBarRef = this.snackBarService.loading()

    return this.http.post(url, matrices).pipe(
      map((res: any) => {
        this.snackBarService.show('SUCCESS', 'Matriz creada con éxito', 3000)
        return res;
      }),
      catchError((err, caught) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
        return throwError(() => new Error('err'));
      }),
    )
  }

  requestPriorizationData(idSolicitud: string): Observable<IRequest> {

    const url = `${this.API_URL}${this.url}request/data-priorization/${idSolicitud}`;

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
    )
  }
  getValuesOfMatrixPertinence(): Observable<any> {

    const url = this.API_URL + 'api/matrix/admission';
    let snackBarRef = this.snackBarService.loading()

    return this.http.get(url).pipe(
      finalize(() => snackBarRef.dismiss()),
      map((res: any) => {
        return res;
      }),
      catchError((err, caught) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
        return throwError(() => new Error('err'));
      }),
    );;
  }
}
