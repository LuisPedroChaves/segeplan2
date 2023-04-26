import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {

    const SESSION = localStorage.getItem('segeplan-session')
    const ALLOWED_ROLES = route.data?.['allowedRoles']

    if (SESSION) {

      const ROLE = JSON.parse(SESSION).usuario.role;

      if (ALLOWED_ROLES.includes(ROLE)) {
        return true;
      }

    }

    this.router.navigate(['./']);
    return false;
  }

}
