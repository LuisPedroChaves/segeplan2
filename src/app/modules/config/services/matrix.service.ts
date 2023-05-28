import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IAdmissionConfig } from 'src/app/core/models/sinafip/admissionConfig';
import { IRevelanceMatrix } from 'src/app/core/models/configs/RevelanceMatrix';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private snackBarService: SnackBarService,
  ) { }

  updateAdmition(admition: IAdmissionConfig): Observable<IAdmissionConfig> {
    let snackBarRef = this.snackBarService.loading()

    return this.http.put(`${this.apiService.API_MATRIX_ADMITION}`, admition)
      .pipe(
        map( (resp: any) => {
          this.snackBarService.show('SUCCES', 'Valores actualizados con exito', 3000)
          return resp.data
        })
      )
  }

  updateRevelance(ranges: IRevelanceMatrix): Observable<IRevelanceMatrix> {
    let snackBarRef = this.snackBarService.loading()

    return this.http.put(`${this.apiService.API_MATRIX_REVELANCE_INVESTMENT}`, ranges),
    this.http.put(`${this.apiService.API_MATRIX_REVELANCE_BENEFICIARIES}`, ranges),
    this.http.put(`${this.apiService.API_MATRIX_REVELANCE_COMPLEXY}`, ranges),
    this.http.put(`${this.apiService.API_MATRIX_REVELANCE_STAGE}`, ranges)
      .pipe(
        map( (resp: any) => {
          this.snackBarService.show('SUCCES', 'Valores actualizados con exito', 3000)
          return resp.data
        })
      )

  }
}
