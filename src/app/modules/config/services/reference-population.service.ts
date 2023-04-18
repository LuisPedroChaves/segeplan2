import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IReferencePopulation } from 'src/app/core/models/adicionales';
import { ApiService } from 'src/app/core/services/api.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class ReferencePopulationService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private snackBarService: SnackBarService
  ) { }

  read(): Observable<IReferencePopulation[]> {

    return this.http.get<IReferencePopulation[]>(`${this.apiService.API_REFERENCE_POPULATION}`)
      .pipe(
        map((resp: any) => resp.data),
      )

  }

  create(denomination: IReferencePopulation): Observable<IReferencePopulation> {

    let snackBarRef = this.snackBarService.loading()

    return this.http.post(this.apiService.API_REFERENCE_POPULATION, denomination)
      .pipe(
        map((resp: any) => {
          this.snackBarService.show('SUCCESS', 'Población creada con éxito', 3000)
          return resp.data
        }),
      )

  }

  update(denomination: IReferencePopulation): Observable<IReferencePopulation> {

    let snackBarRef = this.snackBarService.loading()

    return this.http.put(`${this.apiService.API_REFERENCE_POPULATION}/${denomination.codigo}`, denomination)
      .pipe(
        map((resp: any) => {
          this.snackBarService.show('SUCCESS', 'Población actualizada con éxito', 3000)
          return resp.data
        }),
      )

  }

  delete(codigo: string): Observable<IReferencePopulation> {

    let snackBarRef = this.snackBarService.loading()

    return this.http.delete(`${this.apiService.API_REFERENCE_POPULATION}/${codigo}`)
      .pipe(
        map((resp: any) => {
            this.snackBarService.show('SUCCESS', 'Población eliminada con éxito', 3000)
          return resp.data
        }),
      )

  }
}
