import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IFinancing } from 'src/app/core/models/configs/financing';
import { ApiService } from 'src/app/core/services/api.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class FinancingService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private snackBarService: SnackBarService
  ) { }

  read(): Observable<IFinancing[]> {

    return this.http.get<IFinancing[]>(`${this.apiService.API_FINANCING}`)
      .pipe(
        map((resp: any) => resp),
      )

  }

  create(denomination: IFinancing): Observable<IFinancing> {

    let snackBarRef = this.snackBarService.loading()

    return this.http.post(this.apiService.API_FINANCING, denomination)
      .pipe(
        map((resp: any) => {
          this.snackBarService.show('SUCCESS', 'Financiamiento creado con éxito', 3000)
          return resp.data
        }),
      )

  }

  update(denomination: IFinancing): Observable<IFinancing> {

    let snackBarRef = this.snackBarService.loading()

    return this.http.put(`${this.apiService.API_FINANCING}/${denomination.id}`, denomination)
      .pipe(
        map((resp: any) => {
          this.snackBarService.show('SUCCESS', 'Financiamiento actualizado con éxito', 3000)
          return resp.data
        }),
      )

  }

  delete(id: string): Observable<IFinancing> {

    let snackBarRef = this.snackBarService.loading()

    return this.http.delete(`${this.apiService.API_FINANCING}/${id}`)
      .pipe(
        map((resp: any) => {
            this.snackBarService.show('SUCCESS', 'Financiamiento eliminado con éxito', 3000)
          return resp.data
        }),
      )

  }
}
