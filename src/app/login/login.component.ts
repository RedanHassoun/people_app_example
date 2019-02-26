import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConsts } from '../common/app-consts';
import { AppUtil } from '../common/app-util';

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
          AppUtil.extractAndSaveToken(response)
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
