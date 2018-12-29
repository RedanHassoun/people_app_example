import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {JwtHelper} from 'angular2-jwt';
import { AppConsts } from '../common/app-consts';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: Http) {
  }

  login(credentials) { 
    console.log('REDN: Sending cred='+JSON.stringify(credentials))
    return this.http.post('/api/authenticate', credentials)
   }
 
   logout() {
     localStorage.removeItem(AppConsts.KEY_USER_TOKEN)
   }
 
   isLoggedIn() {
     let jwtHelper = new JwtHelper()
     let token = localStorage.getItem(AppConsts.KEY_USER_TOKEN)
     if(token && token !== 'undefined'){
      return true
      //  let expirationDate = jwtHelper.getTokenExpirationDate(token)
      //  let isExpired = jwtHelper.isTokenExpired(token)
      //  if(!isExpired)
      //   return true TODO handle expiration 
     }
     return false;
   }

   get currentUser(){
    let token = localStorage.getItem(AppConsts.KEY_USER_TOKEN)
    if(!token) 
      return null;
    return new JwtHelper().decodeToken(token)
   }
}
