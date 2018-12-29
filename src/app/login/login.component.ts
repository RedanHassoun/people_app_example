import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConsts } from '../common/app-consts';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean; 

  constructor(
    private router: Router, 
    private authService: AuthenticationService) { }

  signIn(credentials) {
    const obj = {
      email:credentials.email,
      password:credentials.password
    }
    this.authService.login(obj)
      .subscribe(response => { 
        const result = response.json()
        console.log('REDAN: result='+JSON.stringify(result))
        if (result && result.status === 200){
          localStorage.setItem(AppConsts.KEY_USER_TOKEN,result.token);
          console.log(localStorage.getItem(AppConsts.KEY_USER_TOKEN))
          this.router.navigate(['/people']);
        } 
        else  
          this.invalidLogin = true; 
      });
  }

  ngOnInit(){ 
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/people']);
    }
  }
}
