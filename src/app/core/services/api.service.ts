import { UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from 'src/env/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public API_URL = environment.root;

  public API_AUTH = `${this.API_URL}api/login`;
  public API_DENOMINATION = `${this.API_URL}api/alternative/denomination`;
  public API_REFERENCE_POPULATION = `${this.API_URL}api/alternative/referencePopulation`;
  public API_FINANCING = `${this.API_URL}api/sinafip/modality-financing`;
  public API_MATRIX_ADMITION = `${this.API_URL}api/matrix/admission`;
  public API_MATRIX_REVELANCE_INVESTMENT = `${this.API_URL}api/matrix/relevance/investment`;
  public API_MATRIX_REVELANCE_BENEFICIARIES = `${this.API_URL}api/matrix/relevance/beneficiaries`;
  public API_MATRIX_REVELANCE_COMPLEXY = `${this.API_URL}api/matrix/relevance/complexy`;
  public API_MATRIX_REVELANCE_STAGE = `${this.API_URL}api/matrix/relevance/stage`;

  constructor() { }

}
