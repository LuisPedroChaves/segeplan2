import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable, map, tap } from 'rxjs';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { HttpClient } from '@angular/common/http';
import { IDenomination } from '../../../core/models/configs/Denomination';

@Injectable({
  providedIn: 'root'
})
export class DenominationService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private snackBarService: SnackBarService
  ) { }


  read(): Observable<IDenomination[]> {

    return this.http.get<IDenomination[]>(`${this.apiService.API_DENOMINATION}`)
      .pipe(
        tap(resp => console.log(resp)),
        map((resp: any) => resp),
      )

  }

  create(denomination: IDenomination): Observable<IDenomination> {

    let snackBarRef = this.snackBarService.loading()

    return this.http.post(this.apiService.API_DENOMINATION, denomination)
      .pipe(
        tap(resp => console.log(resp)),
        map((resp: any) => {
          this.snackBarService.show('SUCCESS', 'Denominación creada con éxito', 3000)
          return resp
        }),
      )

  }

  update(denomination: IDenomination): Observable<IDenomination> {

    let snackBarRef = this.snackBarService.loading()

    return this.http.put(`${this.apiService.API_DENOMINATION}/${denomination.codigo}`, denomination)
      .pipe(
        tap(resp => console.log(resp)),
        map((resp: any) => {
          this.snackBarService.show('SUCCESS', 'Denominación actualizada con éxito', 3000)
          return resp
        }),
      )

  }

  delete(codigo: string): Observable<IDenomination> {

    let snackBarRef = this.snackBarService.loading()

    return this.http.delete(`${this.apiService.API_DENOMINATION}/${codigo}`)
      .pipe(
        map((resp: any) => {
          tap(resp => console.log(resp)),
            this.snackBarService.show('SUCCESS', 'Denominación eliminada con éxito', 3000)
          return resp
        }),
      )

  }
}
