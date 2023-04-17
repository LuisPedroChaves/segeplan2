import { Injectable } from '@angular/core';
import { environment } from 'src/env/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public API_URL = environment.root;

  public API_DENOMINATION = `${this.API_URL}api/alternative/denomination`;

  constructor() { }

}
