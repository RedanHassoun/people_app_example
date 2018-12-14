import { KEY_USER_TOKEN } from './../common/app-consts';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {JwtHelper} from 'angular2-jwt'

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
     localStorage.removeItem(KEY_USER_TOKEN)
   }
 
   isLoggedIn() { 
     let jwtHelper = new JwtHelper()
     let token = localStorage.getItem(KEY_USER_TOKEN)
     if(token){
       let expirationDate = jwtHelper.getTokenExpirationDate(token)
       let isExpired = jwtHelper.isTokenExpired(token)
       if(!isExpired)
        return true
     }
     return false;
   }

   get currentUser(){
    let token = localStorage.getItem(KEY_USER_TOKEN)
    if(!token) 
      return null;
    return new JwtHelper().decodeToken(token)
   }
}
