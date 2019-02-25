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
      mail:credentials.email,
      password:credentials.password
    }
    this.authService.login(obj)
      .subscribe(response => {
        if (response['_body'] && response['status'] === 200){
          let headers = response['headers'].toJSON()
          localStorage.setItem(AppConsts.KEY_USER_TOKEN,headers['x-auth'][0]);
          console.log(localStorage.getItem(AppConsts.KEY_USER_TOKEN))
          this.router.navigate(['/people']);
        } 
        else{
          console.log('Invalid login')
          this.invalidLogin = true;
        }
          
      });
  }

  ngOnInit(){ 
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/people']);
    }
  }
}
