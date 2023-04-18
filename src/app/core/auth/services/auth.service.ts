import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { Observable, finalize, map } from 'rxjs';
import { ISession } from '../../models/adicionales';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private snackBarService: SnackBarService
  ) { }

  login(username: string, password: string): Observable<ISession> {

    const BODY = `username=${username}&password=${password}`;

    let snackBarRef = this.snackBarService.loading()

    return this.http.post(`${this.apiService.API_AUTH}`, BODY, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      .pipe(
        finalize(() => snackBarRef.dismiss()),
        map((resp: any) => resp),
      );
  }

  refreshToken(): Observable<any> {
    const url = this.apiService.API_AUTH + '/refresh-token';

    return this.http.get(url);
  }

  getSession(): ISession {
    return JSON.parse(localStorage.getItem('segeplan-session')!) ? JSON.parse(localStorage.getItem('segeplan-session')!) : null;
  }
}
