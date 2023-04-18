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

  constructor() { }

}
