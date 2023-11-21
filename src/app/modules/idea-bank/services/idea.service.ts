import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, catchError, finalize, map, throwError } from 'rxjs';
import { FiltroIdeas } from 'src/app/core/models/adicionales';
import { IdeaAlternative, IdeaAlternativeOne, IdeaAlternativeTwo, Qualification } from 'src/app/core/models/alternative';
import { GeneralInformation } from 'src/app/core/models/informationGeneral';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { environment } from 'src/env/environment.prod';
import { IdeaStore } from '../store/reducers';
import { Store } from '@ngrx/store';
import { SET_IDEA_ALTERNATIVES } from '../store/actions';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  private API_URL = environment.root;
  private urlGeneralInformation = 'api/general/information';
  private urlGetResultsAlternatives = 'api/alternative/get-results';
  private urlIdeas = 'api/general/';
  private urlAlternative = 'api/alternative/';

  private ideaStoreSubscription = new Subscription();
  private currentIdea: GeneralInformation = null;


  constructor(
    private http: HttpClient,
    private snackBarService: SnackBarService,
    private ideaStore: Store<IdeaStore>,

  ) {
    
   }

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

  deleteAlternative(alternative: IdeaAlternative): Observable<IdeaAlternative> {
    const url = this.API_URL + this.urlAlternative;
    let snackBarRef = this.snackBarService.loading()

    return this.http.delete(`${url}/${alternative.codigo}`).pipe(
      map((res: any) => {
        this.snackBarService.show('SUCCESS', 'Alternativa eliminada con éxito', 1500)
        return alternative;
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

    return this.http.post(url+ 'first', alternative).pipe(
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

  sendSecondPartAlternative(alternative: IdeaAlternativeTwo, idAlternative: string): Observable<IdeaAlternative> {
    const url = this.API_URL + this.urlAlternative;
    let snackBarRef = this.snackBarService.loading()

    return this.http.post(url+ `second/${idAlternative}`, alternative).pipe(
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

  getAlternativeById(idAlternative: string): Observable<any> {

    this.ideaStoreSubscription = this.ideaStore.select('idea')
    .subscribe(state => {
      this.currentIdea = state.idea;
    })


    let alternatives: IdeaAlternative[] = this.currentIdea.alternatives ? [...this.currentIdea.alternatives] : [];

    const url = this.API_URL + this.urlAlternative + 'one/' +idAlternative;
    let snackBarRef = this.snackBarService.loading()

    return this.http.get(url).pipe(
      finalize(() => snackBarRef.dismiss()),
      map((res: any) => {
        console.log("🚀 ~ file: idea.service.ts:213 ~ IdeaService ~ map ~ res:", res)
        let alternativesFinalized: IdeaAlternative[] = []
        alternativesFinalized = [{...res.data}, ...alternatives]

        this.ideaStore.dispatch(SET_IDEA_ALTERNATIVES({ alternatives: alternativesFinalized }))

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
        console.log(err);

        this.snackBarService.show('DANGER', err.error.message ? err.error.message : err.message, 5000)
        return throwError(() => new Error('err'));
      }),
    );
  }
}
