import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, map, throwError } from 'rxjs';
import { FiltroIdeas } from 'src/app/core/models/adicionales';
import { IdeaAlternative, IdeaAlternativeOne, IdeaAlternativeTwo, Qualification } from 'src/app/core/models/alternative';
import { GeneralInformation } from 'src/app/core/models/informationGeneral';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { environment } from 'src/env/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  private API_URL = environment.root;
  private urlGeneralInformation = 'api/general/information';
  private urlGetResultsAlternatives = 'api/alternative/get-results';
  private urlIdeas = 'api/general/';
  private urlAlternative = 'api/alternative/';

  constructor(
    private http: HttpClient,
    private snackBarService: SnackBarService
  ) { }

  sendGeneralInformation(generalInformationSend: GeneralInformation): Observable<any> {
    const url = this.API_URL + this.urlGeneralInformation;
    let snackBarRef = this.snackBarService.loading()

    return this.http.post(url, generalInformationSend).pipe(
      map((res: any) => {
        this.snackBarService.show('SUCCESS', 'Idea creada con éxito', 1500)
        return res.information;
      }),
      catchError((err, caught) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
        return throwError(() => new Error('err'));
      }),
    );
  }

  getIdeas(filtros?: FiltroIdeas): Observable<any> {
    const url = this.API_URL + this.urlGeneralInformation;
    let snackBarRef = this.snackBarService.loading()

    if (filtros) {
      console.log(filtros)
      const httpParams = new HttpParams({ fromObject: { ...filtros } });

      return this.http.get(url, { params: httpParams }).pipe(
        finalize(() => snackBarRef.dismiss()),
        map((res: any) => {
          return res.generalInformations;
        }),
        catchError((err, caught) => {
          this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
          return throwError(() => new Error('err'));
        }),
      )
    }
    else {
      return this.http.get(url).pipe(
        finalize(() => snackBarRef.dismiss()),
        map((res: any) => {
          return res.generalInformations;
        }),
        catchError((err, caught) => {
          this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
          return throwError(() => new Error('err'));
        }),
      )
    }

  }


  getResults(filtros?: FiltroIdeas): Observable<any> {
    const url = this.API_URL + this.urlGetResultsAlternatives;
    let snackBarRef = this.snackBarService.loading()

    if (filtros) {
      console.log(filtros)
      const httpParams = new HttpParams({ fromObject: { ...filtros } });

      return this.http.get(url, { params: httpParams }).pipe(
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
    else {
      return this.http.get(url).pipe(
        finalize(() => snackBarRef.dismiss()),
        map((res: any) => {
          return res.generalInformations;
        }),
        catchError((err, caught) => {
          this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
          return throwError(() => new Error('err'));
        }),
      )
    }

  }

  sendAlternative(alternative: IdeaAlternative): Observable<IdeaAlternative> {
    const url = this.API_URL + this.urlAlternative;
    let snackBarRef = this.snackBarService.loading()

    return this.http.post(url, alternative).pipe(
      map((res: any) => {
        this.snackBarService.show('SUCCESS', 'Alternativa creada con éxito', 1500)
        return res.alternative;
      }),
      catchError((err, caught) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
        return throwError(() => new Error('err'));
      }),
    );
  }

  sendFirstPartAlternative(alternative: IdeaAlternativeOne): Observable<IdeaAlternative> {
    const url = this.API_URL + this.urlAlternative;
    let snackBarRef = this.snackBarService.loading()

    return this.http.post(url, alternative).pipe(
      map((res: any) => {
        this.snackBarService.show('SUCCESS', 'Cambios guardados con éxito', 1500)
        return res.alternative;
      }),
      catchError((err, caught) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
        return throwError(() => new Error('err'));
      }),
    );
  }

  sendSecondPartAlternative(alternative: IdeaAlternativeTwo): Observable<IdeaAlternative> {
    const url = this.API_URL + this.urlAlternative;
    let snackBarRef = this.snackBarService.loading()

    return this.http.post(url, alternative).pipe(
      map((res: any) => {
        this.snackBarService.show('SUCCESS', 'Cambios guardados con éxito', 1500)
        return res.alternative;
      }),
      catchError((err, caught) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
        return throwError(() => new Error('err'));
      }),
    );
  }

  getDenomination(): Observable<any> {
    const url = this.API_URL + this.urlAlternative + 'denomination';
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

  getReferencePopulation(): Observable<any> {
    const url = this.API_URL + this.urlAlternative + 'referencePopulation';
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

  getAlternatives(idIdea: string): Observable<any> {
    const url = this.API_URL + this.urlAlternative + idIdea;
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

  getMatrizPertinencia(idAlternative: string): Observable<any> {
    const url = this.API_URL + this.urlAlternative + 'pertinencia/' + idAlternative;
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

  getMatrizPreinversion(idAlternative: string): Observable<any> {
    const url = this.API_URL + this.urlAlternative + 'preinversion/' + idAlternative;
    let snackBarRef = this.snackBarService.loading()

    return this.http.get(url).pipe(
      finalize(() => snackBarRef.dismiss()),
      map((res: any) => {
        return res.preInversion;
      }),
      catchError((err, caught) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
        return throwError(() => new Error('err'));
      }),
    );
  }

  submitToQualify(idIdea: string): Observable<any> {
    const url = this.API_URL + this.urlIdeas + 'send-idea/' + idIdea;
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

  qualifiedIdea(idIdea: string): Observable<any> {
    const url = this.API_URL + this.urlIdeas + 'return-idea/' + idIdea;
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

  saveMatrixPertinence(matrixPertinence: Qualification): Observable<any> {
    const url = this.API_URL + this.urlAlternative + 'send-pertinencia/';
    let snackBarRef = this.snackBarService.loading()

    return this.http.post(url, matrixPertinence).pipe(
      map((res: any) => {
        this.snackBarService.show('SUCCESS', 'Matriz creada con éxito', 1500)
        return res.data;
      }),
      catchError((err, caught) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
        return throwError(() => new Error('err'));
      }),
    );
  }

  updateAlternative(alternative: IdeaAlternative): Observable<IdeaAlternative> {
    const url = this.API_URL + this.urlAlternative;
    let snackBarRef = this.snackBarService.loading()

    return this.http.put(url, alternative).pipe(
      map((res: any) => {
        this.snackBarService.show('SUCCESS', 'Alternativa actualizada con éxito', 1500)
        return res.alternative;
      }),
      catchError((err, caught) => {
        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
        return throwError(() => new Error('err'));
      }),
    );
  }
}
