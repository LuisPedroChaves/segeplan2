import { Injectable } from '@angular/core';
import { environment } from '../../../../env/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { FiltroIdeaReport } from '../models/filterToReport';
import { Observable, catchError, finalize, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private API_URL = environment.root;
  private urlReport = 'api/report/';


  constructor(
    private http: HttpClient,
    private snackBarService: SnackBarService
  ) { }


  getIdeasReport(filtros: FiltroIdeaReport): Observable<any> {
    const url = this.API_URL + this.urlReport + 'ideas-general';
    let snackBarRef = this.snackBarService.loading()

    console.log(filtros)
    const httpParams = new HttpParams({ fromObject: { ...filtros } });

    return this.http.get(url, { params: httpParams }).pipe(
      finalize(() => snackBarRef.dismiss()),
      map((res: any) => {
        console.log("🚀 ~ file: report.service.ts:33 ~ ReportService ~ map ~ res:", res)
        return res.data;
      }),
      catchError((err) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
        return throwError(() => new Error('err'));
      }),
    )
  }

}
