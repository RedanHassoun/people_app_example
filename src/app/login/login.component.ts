import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KEY_USER_TOKEN } from '../common/app-consts';

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
    let obj = {
      email:credentials.email,
      password:credentials.password
    }
    this.authService.login(obj)
      .subscribe(response => { 
        let result = response.json()
        console.log('REDAN: result='+JSON.stringify(result))
        if (result && result.status === 200){
          localStorage.setItem(KEY_USER_TOKEN,result.body);
          console.log(localStorage.getItem(KEY_USER_TOKEN))
          this.router.navigate(['/people']);
        } 
        else  
          this.invalidLogin = true; 
      });
  }

  ngOnInit(){

  }
}
