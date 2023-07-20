import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/env/environment';
import { catchError, finalize, map, Observable, Subject, throwError } from 'rxjs';
import { IProject } from 'src/app/core/models/seguimiento/project';
import { ITrack } from 'src/app/core/models/seguimiento/progress';
import { IFiltroCheckProjects } from 'src/app/core/models/adicionales/filtro-check-projects';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class ChekProjectService {
  private API_URL = environment.root;
  private url = 'api/seguimiento/';

  constructor(
    private http: HttpClient,
    private snackBarService: SnackBarService
  ) { }

  getAllProjects(filtros: IFiltroCheckProjects): Observable<any> {
    const url = this.API_URL + this.url + 'project/get-all';

    let snackBarRef = this.snackBarService.loading()

    return this.http.get(url,
      {
        params: new HttpParams({ fromObject: { ...filtros } })
      })
      .pipe(
        finalize(() => snackBarRef.dismiss()),
        map((res: any) => {
          return res?.projects;
        }),
        catchError((err, caught) => {
          this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000) //cambio se elimino null
          return throwError(() => new Error('err'));
        })
      );
  }

  getProjectById(idProject: string): Observable<any> {

    const url = this.API_URL + this.url + 'project/' + idProject;
    let snackBarRef = this.snackBarService.loading()

    return this.http.get(url).pipe(
      finalize(() => snackBarRef.dismiss()),
      map((res: any) => {
        return res.project;
      }),
      catchError((err, caught) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000) //cambio se elimino null
        return throwError(() => new Error('err'));
      })
    );
  }

  createProject(project: IProject): Observable<IProject> {
    const url = this.API_URL + this.url + 'project/new';
    let snackBarRef = this.snackBarService.loading()

    return this.http.post(url, project).pipe(
      map((res: any) => {
        this.snackBarService.show('SUCCESS', 'Proyecto creado con éxito', 1500) //cambio se elimino null
        return res.project;
      }),
      catchError((err, caught) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000) //cambio se elimino null
        return throwError(() => new Error('err'));
      })
    )
  }

  addTrack(track: ITrack, idProject: string): Observable<IProject> {
    console.log("🚀 ~ file: chek-project.service.ts:77 ~ ChekProjectService ~ addTrack ~ track:", track)
    const url = this.API_URL + this.url + 'project/track/' + idProject;
    let snackBarRef = this.snackBarService.loading()

    return this.http.post(url, track).pipe(
      map((project: any) => {  //se cambio IProject por any
        this.snackBarService.show('SUCCESS', 'Seguimiento creado con éxito', 1500) //cambio se elimino null
        return project;
      }),
      catchError((err, caught) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000) //cambio se elimino null
        return throwError(() => new Error('err'));
      })
    )
  }

}