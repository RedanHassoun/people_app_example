import { AppConsts } from './../common/app-consts';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate{
  constructor(
      private router:Router,
      private authService:AuthenticationService) {
  }

  canActivate() 
  {
    if(this.authService.isLoggedIn())
      return true
    
    this.router.navigate([AppConsts.ROUTE_LOGIN])
    return false
  }
}
