import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app'; 
  constructor(private authService:AuthenticationService){
  }

  isLoggedIn(){
    return this.authService.isLoggedIn()
  }
}
