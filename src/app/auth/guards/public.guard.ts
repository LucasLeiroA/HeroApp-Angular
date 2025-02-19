import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanMatch, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';




@Injectable({providedIn: 'root'})
export class PublicGuard implements CanActivate , CanMatch{


  constructor(
    private authService:AuthService,
    private router: Router
  ) { }



  checkAuthStatus():boolean | Observable<boolean> {

    return this.authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => console.log('Authenticated:', isAuthenticated ) ),
      tap( isAuthenticated => {
        if ( isAuthenticated ) {
          this.router.navigate(['./'])
        }
      }),
      map( isAuthenticated => !isAuthenticated )
    )

  }


  canMatch(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkAuthStatus()
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  | Observable<boolean> {
      return this.checkAuthStatus()
  };




}
